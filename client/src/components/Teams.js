import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import SimpleDialog from './SimpleDialog';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import requests from '../utils/requests';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey['900'],
    height: '100vh',
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  marginTop: {
    ...theme.mixins.toolbar,
  },
  chosenTeam: {
    backgroundColor: theme.palette.secondary.dark,
  },
  teamIcons: {
    backgroundColor: theme.palette.secondary.main,
  },
  inviteeIcons: {
    backgroundColor: theme.palette.secondary.light,
  },
  title: {
    color: 'white',
    [theme.breakpoints.down('md')]: {
      ...theme.typography.subtitle2,
    },
  },
  addButton: {
    color: 'white',
    backgroundColor: theme.palette.grey['800'],
  },
});

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, err: false, teamName: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTeam = this.handleAddTeam.bind(this);
  }

  handleClose(value) {
    this.setState({ open: value, err: false });
  }

  handleInputChange(e) {
    this.setState({ teamName: e.target.value });
  }

  async handleAddTeam() {
    try {
      const { data } = await axios.post(
        '/api/teams',
        { name: this.state.teamName },
        { headers: requests.setTokenHeadersOptions() }
      );
      this.setState({
        open: false,
        err: false,
        teamName: '',
      });
      console.log('Created new team');
      this.props.handleCache(data.team);
    } catch (err) {
      this.setState({
        err: true,
      });
    }
  }

  render() {
    const {
      teams,
      currentTeamIdx,
      classes,
      handleSwitchTeam,
      ownerId,
      notiTracker,
    } = this.props;
    const { open, err, teamName } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.marginTop}></div>
        <Typography
          className={classes.title}
          align="center"
          variant="subtitle1"
        >
          Teams
        </Typography>
        <Grid container justify="center" style={{ margin: '1rem 0' }}>
          <IconButton
            size="small"
            className={classes.addButton}
            onClick={() => this.handleClose(true)}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>

        <Grid container spacing={0}>
          {teams.map((team, idx) => (
            <Grid key={team._id} item xs={12} container justify="center">
              <IconButton onClick={() => handleSwitchTeam(idx)}>
                <Badge
                  color="secondary"
                  overlap="circle"
                  badgeContent={notiTracker[team._id]}
                >
                  <Avatar
                    className={
                      idx === currentTeamIdx
                        ? classes.chosenTeam
                        : team.ownerId === ownerId
                        ? classes.teamIcons
                        : classes.inviteeIcons
                    }
                  >
                    {team.name[0]}
                  </Avatar>
                </Badge>
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <SimpleDialog
          identifier="Team"
          handleClose={this.handleClose}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleAddTeam}
          open={open}
          err={err}
          errText={!err ? '' : 'A team with this name already exists.'}
          value={teamName}
        ></SimpleDialog>
      </div>
    );
  }
}

export default withStyles(styles)(Teams);
