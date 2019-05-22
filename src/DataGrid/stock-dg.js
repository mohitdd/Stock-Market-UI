import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteRow from './DeleteRow'


const styles = theme => ({
  root: {
    margin: '5%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    fontFamily: 'sans-serif',
    fontWeight : '600',
    textAlign : 'center'
  },
  table: {
    minWidth: 700,
  },
  tablecell: {
    fontSize: '40pt'
}
});

function Example(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Select</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Company</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Description</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Price</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">High</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Low</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Change %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.somethingExtra === 0.0 ? console.log("None") : props.list.companies.map(row => (
            <TableRow>
              <TableCell  align ="center"><DeleteRow/></TableCell>
              <TableCell style = {{fontSize : '1rem'}} component="th" scope="row" align="center">
                {row.symbol}
              </TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row.description}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row.last}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row.high}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row.low}</TableCell>
              <TableCell style = {{color : row.change_percentage > 0 ? 'green' : 'red' ,fontSize : '1rem'}} align="center">{row.change_percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Example);