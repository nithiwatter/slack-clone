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
      readTracker: {},
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
        console.log(teams);
        if (teams.length !== 0) {
          let dataToSent = [];
          for (let i = 0; i < teams.length; i++) {
            dataToSent.push(...teams[i].channels);
          }
          const channels = dataToSent;
          dataToSent = dataToSent.map((channel) => channel._id);

          // whenever the component mounts, marks the general channel of the first team as read
          const { data: dataCh } = await axios.post(
            '/api/teams/markAsRead',
            {
              channelId: teams[0].channels[0]._id,
              teamId: teams[0]._id,
            },
            { headers: requests.setTokenHeadersOptions() }
          );

          const { data: dataM } = await axios.post(
            '/api/teams/getAllMessages',
            { channels: dataToSent },
            { headers: requests.setTokenHeadersOptions() }
          );

          Object.assign(this.messagesData, dataM.data);

          // tracking read receipt
          const readTracker = {};
          const notiTracker = {};
          console.log('-----');
          console.log(channels);
          for (let i = 0; i < channels.length; i++) {
            // just invited to the team, so no read receipt yet
            const currentChannel = channels[i];
            readTracker[currentChannel._id] = 0;
            if (!currentChannel.readReceipt[this.props.user._id]) {
              readTracker[currentChannel._id] = this.messagesData[
                currentChannel._id
              ].length;
            } else {
              const currentMessages = this.messagesData[currentChannel._id];
              const lastRead = new Date(
                currentChannel.readReceipt[this.props.user._id]
              );

              for (let j = 0; j < currentMessages.length; j++) {
                const createdDate = new Date(currentMessages[j].createdAt);
                console.log(createdDate);
                console.log(lastRead);
                if (
                  createdDate > lastRead &&
                  currentMessages[j].userId !== this.props.user._id
                ) {
                  readTracker[currentChannel._id] += 1;
                }
              }
            }
          }
          readTracker[teams[0].channels[0]._id] = 0;

          console.log(readTracker);
          for (let i = 0; i < channels.length; i++) {
            const currentChannel = channels[i];
            if (!notiTracker[currentChannel.teamId]) {
              notiTracker[currentChannel.teamId] =
                readTracker[currentChannel._id];
            } else {
              notiTracker[currentChannel.teamId] +=
                readTracker[currentChannel._id];
            }
            console.log(notiTracker);
          }

          for (let i = 0; i < teams.length; i++) {
            this.socket.emit('subscribe', teams[i]._id);
          }

          this.setState({
            teams,
            channels: teams[0].channels,
            messages: [...this.messagesData[teams[0].channels[0]._id]],
            readTracker: readTracker,
            notiTracker: notiTracker,
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

    const readTracker = { ...this.state.readTracker };
    readTracker[newTeam.channels[0]._id] = 0;

    const notiTracker = { ...this.state.notiTracker };
    notiTracker[newTeam._id] = 0;

    this.setState({
      teams: [...this.state.teams, newTeam],
      currentTeamIdx: this.state.teams.length,
      channels: newTeam.channels,
      currentChannelIdx: 0,
      messages: [...this.messagesData[newTeam.channels[0]._id]],
      readTracker,
      notiTracker,
    });
  }

  handleCacheChannel(newChannel, currentTeamIdx) {
    this.socket.emit('createChannel', [
      newChannel,
      this.state.teams[currentTeamIdx]._id,
    ]);
    const teamWithNewChannel = { ...this.state.teams[currentTeamIdx] };
    teamWithNewChannel.channels = [...teamWithNewChannel.channels, newChannel];
    const newTeams = [...this.state.teams];
    newTeams[currentTeamIdx] = teamWithNewChannel;
    this.messagesData[newChannel._id] = [];

    const readTracker = { ...this.state.readTracker };
    readTracker[newChannel._id] = 0;

    this.setState({
      teams: newTeams,
      channels: newTeams[currentTeamIdx].channels,
      currentChannelIdx: newTeams[currentTeamIdx].channels.length - 1,
      messages: [...this.messagesData[newChannel._id]],
      readTracker,
    });
  }

  async handleSwitchTeam(selectedTeam) {
    // whenever I switch team, marks the general channel of that team as read
    axios.post(
      '/api/teams/markAsRead',
      {
        channelId: this.state.teams[selectedTeam].channels[0]._id,
        teamId: this.state.teams[selectedTeam]._id,
      },
      { headers: requests.setTokenHeadersOptions() }
    );

    const readTracker = { ...this.state.readTracker };
    const notiTracker = { ...this.state.notiTracker };
    notiTracker[this.state.teams[selectedTeam]._id] -=
      readTracker[this.state.teams[selectedTeam].channels[0]._id];
    readTracker[this.state.teams[selectedTeam].channels[0]._id] = 0;

    this.setState({
      currentTeamIdx: selectedTeam,
      channels: this.state.teams[selectedTeam].channels,
      currentChannelIdx: 0,
      messages: [
        ...this.messagesData[this.state.teams[selectedTeam].channels[0]._id],
      ],
      readTracker,
      notiTracker,
    });
  }

  async handleSwitchChannel(selectedChannel) {
    // whenever I switch channel, set the read receipt for that channel
    axios.post(
      '/api/teams/markAsRead',
      {
        channelId: this.state.channels[selectedChannel]._id,
        teamId: this.state.teams[this.state.currentTeamIdx]._id,
      },
      { headers: requests.setTokenHeadersOptions() }
    );

    const readTracker = { ...this.state.readTracker };
    const notiTracker = { ...this.state.notiTracker };
    notiTracker[this.state.channels[selectedChannel].teamId] -=
      readTracker[this.state.channels[selectedChannel]._id];
    readTracker[this.state.channels[selectedChannel]._id] = 0;

    this.setState({
      currentChannelIdx: selectedChannel,
      messages: [
        ...this.messagesData[this.state.channels[selectedChannel]._id],
      ],
      readTracker,
      notiTracker,
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
      readTracker,
      notiTracker,
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
            notiTracker={notiTracker}
          ></Teams>
        </Grid>
        <Grid item lg={3}>
          <Channels
            socket={this.socket}
            readTracker={readTracker}
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
