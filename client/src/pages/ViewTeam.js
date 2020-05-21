import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SidebarContainer from '../containers/SidebarContainer';

class ViewTeam extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <SidebarContainer></SidebarContainer>
          <Grid item xs={4}>
            Messaging Area
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewTeam;
