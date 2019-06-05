import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";

class SortColumn extends React.Component {
  state = {
    active: true,
    direction: "desc",
    name: ""
  };

  constructor(props) {
    super();
    this.state.name = props.hello;
  }

  handleClick = () => {
    //this.state.direction = "asc";
    this.setState(prevstate => ({
      direction: "asc"
    }));
    console.log("guru");
  };

  render() {
    return (
      <TableSortLabel
        active={this.state.active}
        direction={this.state.direction}
        onClick={this.handleClick}
        hello=""
      >
        {this.state.name}
      </TableSortLabel>
    );
  }
}

export default SortColumn;
