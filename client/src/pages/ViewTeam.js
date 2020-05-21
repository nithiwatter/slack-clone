import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Team from '../components/Teams';
import Channel from '../components/Channels';

class ViewTeam extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <Team></Team>
          </Grid>
          <Grid item xs={2}>
            <Channel></Channel>
          </Grid>
          <Grid item xs={4}>
            Messaging Area
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewTeam;
