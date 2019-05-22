import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class DeleteRow extends React.Component {
    state = {
        checkedBox : false
    }

handleChange = (para) => {
    console.log("Dhingra");
}

render() {
    return(
    <div>
     <Checkbox
          checked={this.state.checkedB}
          onChange={this.handleChange('checkedB')}
          value="checkedB"
          color="primary"
        />
    </div> )
};
}

export default DeleteRow;