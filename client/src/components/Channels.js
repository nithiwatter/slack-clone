import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
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
  teamIcons: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    color: 'white',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      ...theme.typography.subtitle2,
    },
  },
  channels: {
    backgroundColor: theme.palette.grey['700'],
    color: 'white',
  },
  addButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    color: 'white',
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
    const { classes, channels, currentTeam } = this.props;

    const { open, err, channelName } = this.state;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Typography className={classes.title} align="center" variant="h5">
            {currentTeam ? currentTeam.name : ''}
          </Typography>
          <IconButton
            size="small"
            className={classes.addButton}
            onClick={() => this.handleClose(true)}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>

        <Grid container spacing={0} justify="center">
          <Grid item xs={12}>
            <List className={classes.root}>
              {channels.map((channel) => (
                <ListItem className={classes.channels} key={channel._id} button>
                  <ListItemAvatar className={classes.icons}>
                    <Avatar>
                      <ChatIcon></ChatIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={channel.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <SimpleDialog
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
