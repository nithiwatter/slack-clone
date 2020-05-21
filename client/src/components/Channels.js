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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

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
});

class Channels extends Component {
  state = {};
  render() {
    const {
      classes,
      channels,
      currentTeam,
      open,
      channelName,
      err,
      errText,
      handleOpen,
      handleClose,
      handleInputChange,
      currentTeamId,
      handleSubmit,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Typography className={classes.title} align="center" variant="h5">
            {currentTeam}
          </Typography>
          <IconButton
            size="small"
            className={classes.addButton}
            onClick={handleOpen}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>

        <Grid container spacing={0} justify="center">
          <Grid item xs={12}>
            <List className={classes.root}>
              {channels.map((channel) => (
                <ListItem className={classes.channels} key={channel._id} button>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={channel.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Type Your Channel Name</DialogTitle>
            <TextField
              style={{ margin: '1rem 1rem' }}
              id="standard-basic"
              label="Channel Name"
              autoComplete="off"
              onChange={handleInputChange}
              value={channelName}
              error={err}
              helperText={errText}
              autoComplete="off"
            ></TextField>
            <Button onClick={() => handleSubmit(currentTeamId, channelName)}>
              Add Me
            </Button>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Channels);
