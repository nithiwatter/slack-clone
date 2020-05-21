import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';

const channels = ['general', 'A', 'C', 'D'];

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
  },
  channels: {
    backgroundColor: theme.palette.grey['700'],
    color: 'white',
  },
});

class Channel extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} align="center" variant="h5">
          Channels
        </Typography>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12}>
            <List className={classes.root}>
              {channels.map((channel, index) => (
                <ListItem className={classes.channels} key={index} button>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={channel} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Channel);
