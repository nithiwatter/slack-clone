import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUsername: false,
      helperUsernameText: '',
      errorPassword: false,
      helperPasswordText: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    try {
      e.preventDefault();
      let {
        username,
        password,
        errorUsername,
        helperUsernameText,
        errorPassword,
        helperPasswordText,
      } = this.state;

      errorUsername = false;
      helperUsernameText = '';
      errorPassword = false;
      helperPasswordText = '';

      if (username === '' || password === '') {
        if (username === '') {
          errorUsername = true;
          helperUsernameText = 'Username is blank';
        }
        if (password === '') {
          errorPassword = true;
          helperPasswordText = 'Password is blank';
        }
        this.setState({
          errorUsername,
          helperUsernameText,
          errorPassword,
          helperPasswordText,
        });
      } else {
        console.log(this.state);
        // await axios.post('/api/users/register', { ...this.state });
        // this.props.history.push('/');
      }
    } catch (err) {
      this.setState({
        errorUsername: true,
        helperUsernameText: 'Wrong username or password.',
        errorPassword: true,
        helperPasswordText: 'Wrong username or password.',
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      username,
      password,
      errorUsername,
      helperUsernameText,
      errorPassword,
      helperPasswordText,
    } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorUsername}
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                  helperText={helperUsernameText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  onChange={this.handleInputChange}
                  helperText={helperPasswordText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Log in
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
