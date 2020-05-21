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
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey['900'],
    height: '100vh',
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  teamIcons: {
    backgroundColor: theme.palette.secondary.main,
    border: '1px solid red',
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

class Team extends Component {
  render() {
    const {
      classes,
      teams,
      open,
      teamName,
      err,
      errText,
      handleOpen,
      handleClose,
      handleInputChange,
      handleAddTeam,
    } = this.props;
    //const {} = this.state;
    return (
      <div className={classes.root}>
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
            onClick={handleOpen}
          >
            <AddIcon></AddIcon>
          </IconButton>
        </Grid>

        <div
          style={{
            height: '70vh',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              minHeight: '100%',
              width: '100%',
            }}
          >
            {teams.map((team, index) => (
              <Grid
                key={team._id}
                container
                style={{ marginBottom: '1rem' }}
                justify="center"
              >
                <Link style={{ textDecoration: 'none' }} to={`/${team.name}`}>
                  <Avatar className={classes.teamIcons}>{team.name[0]}</Avatar>
                </Link>
              </Grid>
            ))}
          </div>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Type Your Team Name</DialogTitle>
          <TextField
            style={{ margin: '1rem 1rem' }}
            id="standard-basic"
            label="Team Name"
            onChange={handleInputChange}
            value={teamName}
            error={err}
            helperText={errText}
            autoComplete="off"
          ></TextField>
          <Button
            onClick={() => {
              handleAddTeam(teamName);
            }}
          >
            Add Me
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Team);
