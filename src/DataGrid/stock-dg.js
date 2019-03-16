import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Company</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Price</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">High</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Low</TableCell>
            <TableCell style={{fontWeight : '600', fontSize : '1.2em', color :'black'}} align="center">Change %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map(row => (
            <TableRow>
              <TableCell style = {{fontSize : '1rem'}} component="th" scope="row" align="center">
                {row['01. symbol']}
              </TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row['05. price']}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row['03. high']}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row['04. low']}</TableCell>
              <TableCell style = {{fontSize : '1rem'}} align="center">{row['10. change percent']}</TableCell>
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