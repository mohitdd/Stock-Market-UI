import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export class Inputs extends Component{
    constructor(props){
        super(props);
    
    this.state = {
        coName : ""
    };
    this.handle = this.handle.bind(this);
    this.textInput = React.createRef();
}
    handle(e){
        this.props.handleClick(this.state.coName);
        document.getElementById('textArea').value = "";
    }

    render(){
        return(
            <div style={{textAlign : "center", marginTop : "6px", fontWeight:"bold" }}>
                <Input ref='btalks' placeholder="Enter the Company Name"
                 type="search"
                 style={{width : "20%"}}
                 id = {"textArea"}
                 onChange = {(event) => {
                     console.log("searching...."+event.target.value);
                     this.props.updateFunction(event.target.value);
                     this.setState({coName : event.target.value})}}
                 clearBuffer = {() => {this.setState(()=>({
                       coName : ""
                 }))}}/>

                <Button size="small"
                 variant="outlined"
                 color="primary"
                 style={{margin:"4px"}}
                 onClick = {this.handle}>Monitor</Button>
          </div>
        );
    }

}

export default Inputs;