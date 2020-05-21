import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import requests from '../utils/requests';
import axios from 'axios';
import findIndex from 'lodash/findIndex';
import Hidden from '@material-ui/core/Hidden';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      channels: [],
      open: false,
      teamName: '',
      err: false,
      errText: '',
      loading: true,
      channelName: '',
      openCh: false,
      errCh: false,
      errTextCh: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTeam = this.handleAddTeam.bind(this);

    this.handleOpenCh = this.handleOpenCh.bind(this);
    this.handleCloseCh = this.handleCloseCh.bind(this);
    this.handleInputChangeCh = this.handleInputChangeCh.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/teams', {
      headers: requests.setTokenHeadersOptions(),
    });
    const teams = data.teams;

    this.setState({ teams, loading: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleInputChange(e) {
    this.setState({ teamName: e.target.value });
  }

  handleOpenCh() {
    this.setState({ openCh: true });
  }

  handleCloseCh() {
    this.setState({ openCh: false });
  }

  handleInputChangeCh(e) {
    this.setState({ channelName: e.target.value });
  }

  async handleAddTeam(teamName) {
    try {
      const { data } = await axios.post(
        '/api/teams',
        { name: teamName },
        { headers: requests.setTokenHeadersOptions() }
      );
      this.setState({
        teams: [...this.state.teams, data.team],
        open: false,
        teamName: '',
        err: false,
        errText: '',
      });
    } catch (err) {
      this.setState({
        err: true,
        errText: 'You already have a team with this name.',
      });
    }
  }

  async handleAddChannel(teamId, currentTeamIdx, channelName) {
    try {
      const { data } = await axios.post(
        '/api/teams/createChannel',
        { name: channelName, teamId },
        { headers: requests.setTokenHeadersOptions() }
      );

      const teamWithNewChannel = { ...this.state.teams[currentTeamIdx] };
      teamWithNewChannel.channels = [
        ...teamWithNewChannel.channels,
        data.channel,
      ];

      const newTeams = [...this.state.teams];
      newTeams[currentTeamIdx] = teamWithNewChannel;

      console.log(this.state.teams);
      console.log(newTeams);

      this.setState({
        openCh: false,
        errCh: false,
        errTextCh: '',
        channelName: '',
        teams: newTeams,
      });
      // this.setState({
      //   teams: [...this.state.teams, data.team],
      //   open: false,
      //   teamName: '',
      //   err: false,
      //   errText: '',
      // });
    } catch (err) {
      this.setState({
        errCh: true,
        errTextCh: 'You already have a channel with this name.',
      });
    }
  }

  render() {
    const { currentTeamName } = this.props;
    const {
      teams,
      open,
      teamName,
      err,
      errText,
      loading,
      openCh,
      errCh,
      errTextCh,
      channelName,
    } = this.state;

    const currentTeamIdx = currentTeamName
      ? findIndex(teams, ['name', currentTeamName])
      : 0;

    let channels = [];
    let currentTeam = '';
    let currentTeamId = '';
    if (!loading) {
      currentTeam = teams[currentTeamIdx].name;
      channels = teams[currentTeamIdx].channels;
      currentTeamId = teams[currentTeamIdx]._id;
    }

    return (
      <React.Fragment>
        <Hidden xsDown>
          <Grid item md={2} lg={1}>
            <Teams
              teams={teams}
              open={open}
              teamName={teamName}
              err={err}
              errText={errText}
              handleOpen={this.handleOpen}
              handleClose={this.handleClose}
              handleInputChange={this.handleInputChange}
              handleAddTeam={this.handleAddTeam}
            ></Teams>
          </Grid>
        </Hidden>
        <Hidden xsDown>
          <Grid item md={3} lg={2}>
            <Channels
              channels={channels}
              currentTeam={currentTeam}
              currentTeamId={currentTeamId}
              currentTeamIdx={currentTeamIdx}
              open={openCh}
              channelName={channelName}
              err={errCh}
              errText={errTextCh}
              handleOpen={this.handleOpenCh}
              handleClose={this.handleCloseCh}
              handleInputChange={this.handleInputChangeCh}
              handleSubmit={this.handleAddChannel}
            ></Channels>
          </Grid>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default SidebarContainer;
