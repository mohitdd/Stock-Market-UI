import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Hidden } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class NestedList extends React.Component {

    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            member : this.props.things
        }
        this.componentMount = this.componentMount.bind(this);
    
    }

    componentMount(e) {
      if(e.target.childNodes[0].nodeType !== 3){
        //HardCoding for Now , Will improve in future commits
      this.props.finalResult(e.target.childNodes[0].childNodes[0].innerText);
      }
      else {
              this.props.finalResult(e.target.innerText);
           }
    }

  render() {
      return(
     <div onClick = {this.componentMount}>     
     {this.props.things.length === 0 ? console.log("hiding") :  
    <List component="nav" style = {{background :"white", width : '20%', position : 'fixed' , left : "37.3%", top:"12%", border: "1px", boxShadow: "1px 1px 1px 1px #888888", borderRadius:"4px", maxHeight:"30%", overflow:"scroll", overflowX : "hidden"}}>
    {this.props.things.security.type === undefined ? this.props.things.security.map(row => (<ListItem style = {{textAlign : "left"}} button>
      <ListItemText
       primary = { <React.Fragment>
        <Typography component="span" color="textPrimary" style = {{fontWeight : 'bold'}}>
          {`${row['symbol']}`}
        </Typography>
      </React.Fragment>}
      
      secondary={
        <React.Fragment>
          <Typography component="span" color="textPrimary" onClick = {(e) => { e.target.innerText = row['symbol']}}>
            {`${row['description']}`}
          </Typography>
        </React.Fragment>
      }
      
      />
    </ListItem>)) :  (<ListItem style = {{textAlign : "left"}} button>
      <ListItemText ref={this.myRef}
        primary ={ <React.Fragment>
        <Typography component="span" color="textPrimary" style = {{fontWeight : 'bold'}}>
          {`${this.props.things.security['symbol']}`}
        </Typography>
      </React.Fragment>
    }
        secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary" onClick = {(e) => { e.target.innerText = this.props.things.security['symbol']}}>
                {`${this.props.things.security['description']}`}
              </Typography>
            </React.Fragment>
          }
      />
    </ListItem>) }
  </List>}
  </div>)
}
}

export default NestedList;