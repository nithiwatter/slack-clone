import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import requests from '../utils/requests';
import axios from 'axios';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      open: false,
      teamName: '',
      err: false,
      errText: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTeam = this.handleAddTeam.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/teams', {
      headers: requests.setTokenHeadersOptions(),
    });
    this.setState({ teams: data.teams });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleInputChange(e) {
    console.log(this.state);
    this.setState({ teamName: e.target.value });
  }

  async handleAddTeam(teamName) {
    try {
      const { data } = await axios.post(
        '/api/teams',
        { name: teamName },
        { headers: requests.setTokenHeadersOptions() }
      );
      console.log(data);
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

  render() {
    const { teams, open, teamName, err, errText } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={2} lg={1}>
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
        <Grid item xs={3} lg={2}>
          <Channels></Channels>
        </Grid>
      </React.Fragment>
    );
  }
}

export default SidebarContainer;
