import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react'


const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default class CustomizedSwitches extends Component() {
    constructor(props) {
    super(props);
    this.state ={
    checkedA: true,
    checkedB: true,
    checkedC: true,
  }
};

render() {
    return (
        <div>
        <FormGroup>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Off</Grid>
              <Grid item>
                <AntSwitch
                  checked={this.state.checkedC}
                  
                  value="checkedC"
                />
              </Grid>
              <Grid item>On</Grid>
            </Grid>
          </Typography>
        </FormGroup>
        </div>        
    );
}
}