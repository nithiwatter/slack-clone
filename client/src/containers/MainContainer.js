import React, { Component } from 'react';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import axios from 'axios';
import io from 'socket.io-client';
import requests from '../utils/requests';
import Grid from '@material-ui/core/Grid';
import attachListeners from '../utils/socketMiddleware';

let messagesData = {};

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
    console.log('Created');
    this.socket = io('http://localhost:8000');
    this.messagesData = {};
    attachListeners(this.socket, this.messagesData, this);
    this.handleCacheTeam = this.handleCacheTeam.bind(this);
    this.handleCacheChannel = this.handleCacheChannel.bind(this);
    this.handleSwitchTeam = this.handleSwitchTeam.bind(this);
    this.handleSwitchChannel = this.handleSwitchChannel.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.user) {
        // attachListeners(socket, messagesData, this);
        const { data } = await axios.get('/api/teams', {
          headers: requests.setTokenHeadersOptions(),
        });
        const teams = data.teams;
        console.log('Fetching initial data for this user.');

        if (teams.length !== 0) {
          let dataToSent = [];
          for (let i = 0; i < teams.length; i++) {
            dataToSent.push(...teams[i].channels);
          }
          dataToSent = dataToSent.map((channel) => channel._id);

          const { data: dataM } = await axios.post(
            '/api/teams/getAllMessages',
            { channels: dataToSent },
            { headers: requests.setTokenHeadersOptions() }
          );

          Object.assign(this.messagesData, dataM.data);

          for (let i = 0; i < teams.length; i++) {
            this.socket.emit('subscribe', teams[i]._id);
          }

          this.socket.on('newMessage', (newMessage) => {
            console.log('new message received');
          });

          this.setState({
            teams,
            channels: teams[0].channels,
            messages: [...this.messagesData[teams[0].channels[0]._id]],
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleCacheTeam(newTeam) {
    this.messagesData[newTeam.channels[0]._id] = [];
    this.socket.emit('subscribe', newTeam._id);

    this.setState({
      teams: [...this.state.teams, newTeam],
      currentTeamIdx: this.state.teams.length,
      channels: newTeam.channels,
      currentChannelIdx: 0,
      messages: [...this.messagesData[newTeam.channels[0]._id]],
    });
  }

  handleCacheChannel(newChannel, currentTeamIdx) {
    const teamWithNewChannel = { ...this.state.teams[currentTeamIdx] };
    teamWithNewChannel.channels = [...teamWithNewChannel.channels, newChannel];
    const newTeams = [...this.state.teams];
    newTeams[currentTeamIdx] = teamWithNewChannel;
    this.messagesData[newChannel._id] = [];

    this.setState({
      teams: newTeams,
      channels: newTeams[currentTeamIdx].channels,
      currentChannelIdx: newTeams[currentTeamIdx].channels.length - 1,
      messages: [...this.messagesData[newChannel._id]],
    });
  }

  handleSwitchTeam(selectedTeam) {
    this.setState({
      currentTeamIdx: selectedTeam,
      channels: this.state.teams[selectedTeam].channels,
      currentChannelIdx: 0,
      messages: [
        ...this.messagesData[this.state.teams[selectedTeam].channels[0]._id],
      ],
    });
  }

  async handleSwitchChannel(selectedChannel) {
    console.log(messagesData);
    this.setState({
      currentChannelIdx: selectedChannel,
      messages: [
        ...this.messagesData[this.state.channels[selectedChannel]._id],
      ],
    });
  }

  componentWillUnmount() {
    this.socket.close();
    this.messagesData = null;
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
            serverId={teams.length !== 0 ? teams[currentTeamIdx]._id : null}
            socket={this.socket}
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
