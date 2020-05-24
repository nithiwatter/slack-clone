import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InviteButton from './InviteButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import SimpleDialog from './SimpleDialog';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import requests from '../utils/requests';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey['800'],
    height: '100vh',
    paddingTop: theme.spacing(2),
  },
  marginTop: {
    ...theme.mixins.toolbar,
  },
  title: {
    color: 'white',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      ...theme.typography.subtitle2,
    },
  },
  tracker: {
    backgroundColor: theme.palette.info.main,
  },
  channels: {
    backgroundColor: theme.palette.grey['700'],
    color: 'white',
  },
  buttons: {},
  addButton: {
    margin: theme.spacing(0, 2),
    color: 'white',
    height: '2rem',
    backgroundColor: theme.palette.grey['900'],
  },
  icons: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, err: false, channelName: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
  }

  handleClose(value) {
    this.setState({ open: value, err: false });
  }

  handleInputChange(e) {
    this.setState({ channelName: e.target.value });
  }

  async handleAddChannel() {
    try {
      const { data } = await axios.post(
        '/api/teams/createChannel',
        { name: this.state.channelName, teamId: this.props.currentTeam._id },
        { headers: requests.setTokenHeadersOptions() }
      );
      this.setState({
        open: false,
        err: false,
        channelName: '',
      });

      this.props.handleCache(data.channel, this.props.currentTeamIdx);
    } catch (err) {
      this.setState({
        err: true,
      });
    }
  }

  render() {
    const {
      classes,
      channels,
      currentTeam,
      handleSwitchChannel,
      currentChannelIdx,
      ownerId,
      readTracker,
    } = this.props;

    const { open, err, channelName } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.marginTop}></div>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.title} align="left" variant="h5">
              {currentTeam ? currentTeam.name : ''}
            </Typography>
          </Grid>
          {currentTeam && currentTeam.ownerId === ownerId ? (
            <Grid
              container
              xs={6}
              item
              alignItems="center"
              justify="flex-end"
              className={classes.buttons}
            >
              <InviteButton currentTeam={currentTeam}></InviteButton>
              <IconButton
                className={classes.addButton}
                size="small"
                onClick={() => this.handleClose(true)}
              >
                <AddIcon></AddIcon>
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
        <Grid item lg={12} container spacing={0} justify="center">
          <Grid item xs={12}>
            <List style={{ marginTop: '0.5rem' }}>
              {channels.map((channel, idx) => (
                <ListItem
                  className={classes.channels}
                  key={channel._id}
                  button
                  onClick={() => handleSwitchChannel(idx)}
                  disabled={idx === currentChannelIdx ? true : false}
                >
                  <ListItemAvatar className={classes.icons}>
                    <Avatar>
                      <ChatIcon></ChatIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={channel.name} />
                  <Avatar className={classes.tracker}>
                    {readTracker[channel._id]}
                  </Avatar>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <SimpleDialog
          identifier="Channel"
          handleClose={this.handleClose}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleAddChannel}
          open={open}
          err={err}
          errText={!err ? '' : 'A channel with this name already exists.'}
          value={channelName}
        ></SimpleDialog>
      </div>
    );
  }
}

export default withStyles(styles)(Channels);
