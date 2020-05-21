import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import axios from 'axios';

class SidebarContainer extends Component {
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <Teams></Teams>
        </Grid>
        <Grid item xs={2}>
          <Channels></Channels>
        </Grid>
      </React.Fragment>
    );
  }
}

export default SidebarContainer;
