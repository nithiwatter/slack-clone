import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
});

class Header extends Component {
  state = {};
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Slack Clone
            </Typography>
            {!user && (
              <React.Fragment>
                <Button
                  className={classes.button}
                  color="inherit"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Log In
                </Button>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <Button
                  className={classes.button}
                  color="inherit"
                  component={Link}
                  to="/register"
                >
                  Log Out
                </Button>
                <Avatar className={classes.button}>
                  {user.name.toUpperCase()[0]}
                </Avatar>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
