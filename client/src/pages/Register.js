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
import { Redirect } from 'react-router-dom';

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      errorName: false,
      helperNameText: '',
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
        name,
        username,
        password,
        errorName,
        helperNameText,
        errorUsername,
        helperUsernameText,
        errorPassword,
        helperPasswordText,
      } = this.state;

      errorName = false;
      helperNameText = '';
      errorUsername = false;
      helperUsernameText = '';
      errorPassword = false;
      helperPasswordText = '';

      if (name === '' || username === '' || password === '') {
        if (name === '') {
          errorName = true;
          helperNameText = 'Name is blank';
        }
        if (username === '') {
          errorUsername = true;
          helperUsernameText = 'Username is blank';
        }
        if (password === '') {
          errorPassword = true;
          helperPasswordText = 'Password is blank';
        }
        this.setState({
          errorName,
          helperNameText,
          errorUsername,
          helperUsernameText,
          errorPassword,
          helperPasswordText,
        });
      } else {
        const { data } = await axios.post('/api/users/register', {
          name,
          username,
          password,
        });
        this.props.handleAuth(data.token);
      }
    } catch (err) {
      this.setState({
        errorName: false,
        helperNameText: '',
        errorUsername: true,
        helperUsernameText: 'This username is already used',
        errorPassword: false,
        helperPasswordText: '',
      });
    }
  }

  render() {
    const { classes, user } = this.props;
    const {
      name,
      username,
      password,
      errorName,
      helperNameText,
      errorUsername,
      helperUsernameText,
      errorPassword,
      helperPasswordText,
    } = this.state;

    if (user) return <Redirect to="/"></Redirect>;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorName}
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={this.handleInputChange}
                  helperText={helperNameText}
                />
              </Grid>
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Register);
