import React, { Component } from 'react';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import axios from 'axios';
import requests from '../utils/requests';
import Grid from '@material-ui/core/Grid';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      currentTeamIdx: 0,
      channels: [],
      currentChannelIdx: 0,
      messages: [],
    };
    this.handleCacheTeam = this.handleCacheTeam.bind(this);
    this.handleCacheChannel = this.handleCacheChannel.bind(this);
    this.handleSwitchTeam = this.handleSwitchTeam.bind(this);
    this.handleSwitchChannel = this.handleSwitchChannel.bind(this);
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
          const { data: dataM } = await axios.get('/api/teams/getMessages', {
            headers: {
              ...requests.setTokenHeadersOptions(),
              Channel:
                'Channel ' + teams[this.state.currentTeamIdx].channels[0]._id,
            },
          });
          console.log(dataM);
          this.setState({
            teams,
            channels: teams[this.state.currentTeamIdx].channels,
            messages: dataM.messages,
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
      currentChannelIdx: 0,
    });
  }

  handleSwitchChannel(selectedChannel) {
    this.setState({
      currentChannelIdx: selectedChannel,
    });
  }

  render() {
    const { user } = this.props;
    const {
      teams,
      currentTeamIdx,
      channels,
      currentChannelIdx,
      messages,
    } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item lg={1}>
          <Teams
            teams={teams}
            ownerId={user._id}
            currentTeamIdx={currentTeamIdx}
            handleCache={this.handleCacheTeam}
            handleSwitchTeam={this.handleSwitchTeam}
          ></Teams>
        </Grid>
        <Grid item lg={3}>
          <Channels
            channels={channels}
            currentTeam={teams[currentTeamIdx]}
            ownerId={user._id}
            currentTeamIdx={currentTeamIdx}
            currentChannelIdx={currentChannelIdx}
            handleCache={this.handleCacheChannel}
            handleSwitchChannel={this.handleSwitchChannel}
          ></Channels>
        </Grid>
        <Grid item lg={8}>
          <Messages
            channelId={
              channels.length !== 0 ? channels[currentChannelIdx]._id : null
            }
            channelName={
              channels.length !== 0 ? channels[currentChannelIdx].name : null
            }
            messages={messages}
          ></Messages>
        </Grid>
      </Grid>
    );
  }
}

export default MainContainer;
