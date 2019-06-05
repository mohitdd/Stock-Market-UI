import React, { Component } from "react";
import "./App.css";
import DenseAppBar from "./ApplicationBar/AppBar";
import Inputs from "./ApplicationBar/SearchButton";
import Example from "./DataGrid/stock-dg.js";
import axios from "axios";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import NestedList from "./SearchBox/searchOptions";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      circle: false,
      pattren: [],
      lastSearched: "",
      aviod_Red: [],
      extra_Data: Math.random(),
      session_connected: "",
      stompClient: null
    };
  }
  addForMonitor = companyInfo => {
    this.setState(prevState => ({ circle: true }));
    console.log("Call is for: " + companyInfo);
    axios
      .get(`https://cryptic-sands-63938.herokuapp.com/v2/quotes/${companyInfo}`)
      .then(rep => {
        if (this.state.aviod_Red.indexOf(rep.data.quotes.quote.symbol) === -1) {
          this.setState(prevState => ({
            companies: this.state.companies.concat(rep.data.quotes.quote),
            aviod_Red: this.state.aviod_Red.concat(rep.data.quotes.quote.symbol)
          }));
          console.log("Total companies are :" + this.state.companies.length);
          console.log(
            "Session id is already there:" + this.state.session_connected
          );
          this.dedicatedConnection(companyInfo);
        } else if (rep.data.quotes.quote.symbol === undefined) {
          swal("Oops", `${companyInfo} Stock Doesn't Exists`, "error");
        } else {
          swal("Umm", `${companyInfo} Stock Already Added`, "info");
        }
        this.setState(prevState => ({ circle: false }));
      });
  };

  updateSearchPattren = pattren => {
    console.log("I am called with " + pattren);
    this.setState(prevState => ({
      lastSearched: pattren
    }));
    axios
      .get(`https://cryptic-sands-63938.herokuapp.com/v2/search/${pattren}`)
      .then(rep => {
        if (rep.data["search-key"] === this.state.lastSearched) {
          this.setState(prevState => ({
            pattren: rep.data
          }));
        }
      });
  };

  add = text => {
    this.addForMonitor(text);
    this.setState(prevState => ({
      pattren: []
    }));
    document.body.style.backgroundColor = "";
    this.refs.mohit.state.coName = "";
  };

  dedicatedConnection = stocktoadd => {
    var self = this;
    //  console.log("DEBUG 0 :"+self.state.companies[0].quotes.quote.symbol);
    console.log("Session for:" + stocktoadd);
    axios
      .post("https://cryptic-sands-63938.herokuapp.com/v2/session/stream")
      .then(rep => {
        self.state.session_connected = rep.data;
        let final_url = `https://cryptic-sands-63938.herokuapp.com/v2/stream?sessionId=${
          rep.data
        }`;
        this.state.aviod_Red.map(
          element => (final_url = final_url + `&symbols=${element}`)
        );
        console.log("The value of final url is :" + final_url);
        if (self.state.stompClient !== null) {
          console.log("unsubscribing");
          self.state.stompClient.unsubscribe(
            `/topic/${self.state.session_connected}`
          );
          self.state.stompClient.disconnect({}, function() {
            console.log("session disconnected");
          });
          self.state.stompClient = null;
          axios.post(final_url).then(repeat => {
            console.log("Stream Created: " + repeat.data);
            var socket = new SockJS(
              "https://cryptic-sands-63938.herokuapp.com/quote-websocket"
            );
            self.state.stompClient = Stomp.over(socket);
            self.state.stompClient.connect({}, function(frame) {
              console.log("Connected: " + frame);
              self.state.stompClient.subscribe(`/topic/${rep.data}`, function(
                greeting
              ) {
                //console.log("HELLO : "+JSON.parse(greeting.body).quotes.quote.symbol);
                self.setState(prevState => ({
                  companies: prevState.companies.map(item => {
                    console.log(
                      "item.symbol is :" + self.state.companies.length
                    );
                    if (self.state.companies.length > 1)
                      return JSON.parse(greeting.body).quotes.quote[
                        self.state.aviod_Red.indexOf(item.symbol)
                      ];
                    else return JSON.parse(greeting.body).quotes.quote;
                  })
                }));
                console.log("Objects in array is :");
                console.log(self.state.companies);
              });
            });
          });
        } else {
          axios.post(final_url).then(repeat => {
            console.log("Stream Created: " + repeat.data);
            var socket = new SockJS(
              "https://cryptic-sands-63938.herokuapp.com/quote-websocket"
            );
            self.state.stompClient = Stomp.over(socket);
            self.state.stompClient.connect({}, function(frame) {
              console.log("Connected: " + frame);
              self.state.stompClient.subscribe(`/topic/${rep.data}`, function(
                greeting
              ) {
                //console.log("HELLO : "+JSON.parse(greeting.body).quotes.quote.symbol);
                self.setState(prevState => ({
                  companies: prevState.companies.map(item => {
                    console.log(
                      "item.symbol is :" + self.state.companies.length
                    );
                    if (self.state.companies.length > 1)
                      return JSON.parse(greeting.body).quotes.quote[
                        self.state.aviod_Red.indexOf(item.symbol)
                      ];
                    else return JSON.parse(greeting.body).quotes.quote;
                  })
                }));
                console.log("Objects in array is :");
                console.log(self.state.companies);
              });
            });
          });
        }
      });
  };

  render() {
    return (
      <div>
        <DenseAppBar />
        <Inputs
          ref="mohit"
          handleClick={this.addForMonitor}
          updateFunction={this.updateSearchPattren}
        />
        {this.state.companies.length === 0 ? (
          console.log("Not Applicable")
        ) : (
          <Example list={this.state} somethingExtra={this.state.extra_Data} />
        )}
        {this.state.circle === false ? (
          console.log("SAAB pattern is :" + this.state.pattren)
        ) : (
          <CircularProgress
            disableShrink
            style={{ position: "fixed", top: "50%", left: "50%" }}
            color="primary"
          >
            {" "}
          </CircularProgress>
        )}
        <NestedList things={this.state.pattren} finalResult={this.add} />
      </div>
    );
  }
}

export default App;
