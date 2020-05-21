import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import SidebarContainer from '../containers/SidebarContainer';

class ViewTeam extends Component {
  constructor(props) {
    super(props);
    console.log('render view');
  }

  render() {
    const { teamName } = this.props.match.params;
    const { user } = this.props;

    if (!user) return null;

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
