import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SidebarContainer from '../containers/SidebarContainer';

class ViewTeam extends Component {
  render() {
    const { teamName } = this.props.match.params;

    return (
      <div>
        <Grid container spacing={0}>
          <SidebarContainer currentTeamName={teamName}></SidebarContainer>
          <Grid item xs={4}>
            Messaging Area
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewTeam;
