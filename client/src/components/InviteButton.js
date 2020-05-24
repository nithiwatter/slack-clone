import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SimpleDialog from './SimpleDialog';
import axios from 'axios';
import requests from '../utils/requests';

const styles = (theme) => {};

class InviteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, err: false, inviteeName: '', errText: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleClose(value) {
    this.setState({ open: value, err: false, errText: '' });
  }

  handleInputChange(e) {
    this.setState({ inviteeName: e.target.value });
  }

  async handleInvite() {
    try {
      const { data } = await axios.post(
        '/api/teams/inviteUser',
        {
          username: this.state.inviteeName,
          teamId: this.props.currentTeam._id,
        },
        { headers: requests.setTokenHeadersOptions() }
      );
      this.props.socket.emit('invite', [
        this.props.currentTeam,
        this.state.inviteeName,
      ]);
      this.setState({
        open: false,
        err: false,
        inviteeName: '',
        errText: '',
      });

      console.log(data.member);
    } catch (err) {
      console.log(err.response.data.error);
      this.setState({
        err: true,
        errText: err.response.data.error,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { open, err, errText, inviteeName } = this.state;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<PersonAddIcon></PersonAddIcon>}
          onClick={() => this.handleClose(true)}
        >
          Invite
        </Button>
        <SimpleDialog
          identifier="Invitee"
          handleClose={this.handleClose}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleInvite}
          open={open}
          err={err}
          errText={errText}
          value={inviteeName}
        ></SimpleDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InviteButton);
