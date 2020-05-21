import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const teams = ['A', 'B', 'C', 'D'];

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey['900'],
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
  addButton: {
    color: 'white',
    backgroundColor: theme.palette.grey['800'],
    marginTop: theme.spacing(2),
  },
});

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, teamName: '' };
    this.handleAddTeam = this.handleAddTeam.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAddTeam() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleInputChange(e) {
    this.setState({ teamName: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { open, teamName } = this.state;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} align="center" variant="h5">
          Teams
        </Typography>
        <Grid container justify="center">
          <IconButton
            size="small"
            className={classes.addButton}
            onClick={this.handleAddTeam}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>

        <Grid container spacing={0} justify="center">
          {teams.map((team, index) => (
            <Grid container justify="center" item xs={12} key={index}>
              <Avatar className={classes.teamIcons}>{team}</Avatar>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Type Your Team Name</DialogTitle>
          <TextField
            style={{ margin: '1rem 1rem' }}
            id="standard-basic"
            label="Team Name"
            onChange={this.handleInputChange}
            value={teamName}
          ></TextField>
          <Button>Add Me</Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Team);
