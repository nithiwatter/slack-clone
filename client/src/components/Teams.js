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

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey['900'],
    height: '100vh',
    paddingTop: theme.spacing(2),
  },
  teamIcons: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    color: 'white',
  },
  addButton: {
    color: 'white',
    backgroundColor: theme.palette.grey['800'],
  },
});

class Team extends Component {
  constructor(props) {
    super(props);
  }

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
        <Grid
          container
          alignItems="center"
          justify="space-evenly"
          style={{ marginBottom: '2rem' }}
        >
          <Typography
            className={classes.title}
            align="center"
            variant="subtitle1"
          >
            Teams
          </Typography>
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
                <Avatar className={classes.teamIcons}>{team.name[0]}</Avatar>
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
