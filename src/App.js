import React, { Component } from 'react';
import './App.css';
import DenseAppBar from './ApplicationBar/AppBar';
import Inputs from './ApplicationBar/SearchButton';
import Example from './DataGrid/stock-dg.js'
import axios from 'axios'
import swal from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress';
import NestedList from './SearchBox/searchOptions'


class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    companies : [],
    circle : false,
    pattren : [],
    lastSearched : '',
    aviod_Red : []
  }
  }
  addForMonitor = (companyInfo) => {
      this.setState(prevState => ({ circle : true}));
      console.log("Call is for: "+companyInfo);
      axios.get(`https://qoutescache-1.appspot.com/v2/quotes/${companyInfo}`)
      .then((rep) =>{
          if(this.state.aviod_Red.indexOf(rep.data.quotes.quote.symbol) === -1) {
            this.setState(prevState => ({
                  companies : this.state.companies.concat(rep.data),
                  aviod_Red : this.state.aviod_Red.concat(rep.data.quotes.quote.symbol)
            }))
            console.log("Total companies are :"+ this.state.aviod_Red.length);
          }
          else if(rep.data.quotes.quote.symbol === undefined){
            
              swal ( "Oops" , `${companyInfo} Stock Doesn't Exists` ,  "error" )

          }

          else {
            swal ( "Umm" , `${companyInfo} Stock Already Added` ,  "info" )
          }
          this.setState(prevState => ({ circle : false}));
      })}

  updateSearchPattren = (pattren) =>{
      console.log("I am called with "+pattren);
      this.setState(prevState => ({
            lastSearched : pattren
      }));
      axios.get(`https://qoutescache-1.appspot.com/v2/search/${pattren}`)
      .then((rep)=>{
        if(rep.data['search-key'] === this.state.lastSearched)
        {
        this.setState(prevState => (
          {
            pattren : rep.data
          }
        ))}
      })
  }   

  add = (text)=>{
      this.addForMonitor(text);
      this.state.pattren = [];
      document.body.style.backgroundColor = "";
      this.refs.mohit.state.coName = "";
     // console.log("DHINGRA: "+this.refs.mohit.props.updateFunction);
      }

  render() {
    return (
      <div>
      <DenseAppBar />
      <Inputs ref = "mohit" handleClick = {this.addForMonitor} updateFunction = {this.updateSearchPattren}/>
      { this.state.companies.length === 0 ? console.log("Not Applicable") : <Example list = {this.state.companies}/>}
      { this.state.circle === false ? console.log("SAAB") :  <CircularProgress disableShrink style = {{position : 'fixed' , top : '50%', left: '50%' }} color = 'primary'> </CircularProgress>}
      <NestedList things={this.state.pattren} finalResult = {this.add}/>
      </div>
    );
  }
}

export default App;
