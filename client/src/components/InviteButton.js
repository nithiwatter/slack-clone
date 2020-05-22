import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SimpleDialog from './SimpleDialog';

const styles = (theme) => {};

class InviteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, err: false, inviteName: '', errText: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleClose(value) {
    this.setState({ open: value, err: false });
  }

  handleInputChange(e) {
    this.setState({ channelName: e.target.value });
  }

  handleInvite() {}

  render() {
    const { classes } = this.props;
    const { open, err, errText, inviteName } = this.state;
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
          handleSubmit={this.handleAddChannel}
          open={open}
          err={err}
          errText={errText}
          value={inviteName}
        ></SimpleDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InviteButton);
