import React, { Component } from 'react';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import axios from 'axios';
import requests from '../utils/requests';
import Grid from '@material-ui/core/Grid';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], currentTeamIdx: 0, channels: [] };
    this.handleCacheTeam = this.handleCacheTeam.bind(this);
    this.handleCacheChannel = this.handleCacheChannel.bind(this);
    this.handleSwitchTeam = this.handleSwitchTeam.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.user) {
        const { data } = await axios.get('/api/teams', {
          headers: requests.setTokenHeadersOptions(),
        });
        const teams = data.teams;
        console.log('Fetching initial data for this user.');
        if (teams.length !== 0) {
          this.setState({
            teams,
            channels: teams[this.state.currentTeamIdx].channels,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleCacheTeam(newTeam) {
    this.setState({
      teams: [...this.state.teams, newTeam],
      currentTeamIdx: this.state.teams.length,
      channels: newTeam.channels,
    });
  }

  handleCacheChannel(newChannel, currentTeamIdx) {
    const teamWithNewChannel = { ...this.state.teams[currentTeamIdx] };
    teamWithNewChannel.channels = [...teamWithNewChannel.channels, newChannel];
    const newTeams = [...this.state.teams];
    newTeams[currentTeamIdx] = teamWithNewChannel;

    this.setState({
      teams: newTeams,
      channels: newTeams[currentTeamIdx].channels,
    });
  }

  handleSwitchTeam(selectedTeam) {
    this.setState({
      currentTeamIdx: selectedTeam,
      channels: this.state.teams[selectedTeam].channels,
    });
  }

  render() {
    const { teams, currentTeamIdx, channels } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item lg={1}>
          <Teams
            teams={teams}
            currentTeamIdx={currentTeamIdx}
            handleCache={this.handleCacheTeam}
            handleSwitchTeam={this.handleSwitchTeam}
          ></Teams>
        </Grid>
        <Grid item lg={3}>
          <Channels
            channels={channels}
            currentTeam={teams[currentTeamIdx]}
            currentTeamIdx={currentTeamIdx}
            handleCache={this.handleCacheChannel}
          ></Channels>
        </Grid>
        <Grid item lg={8}>
          <div>Messages</div>
        </Grid>
      </Grid>
    );
  }
}

export default MainContainer;
