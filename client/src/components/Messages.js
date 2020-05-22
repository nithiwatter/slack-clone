import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import requests from '../utils/requests';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    height: '100vh',
    paddingTop: theme.spacing(2),
    backgroundColor: 'white',
    position: 'relative',
  },
  marginTop: {
    ...theme.mixins.toolbar,
  },
  input: {
    position: 'absolute',
    bottom: '3%',
    left: '2%',
    width: '96%',
  },
  inputField: {
    backgroundColor: 'white',
  },
});

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  async handleSubmit(e) {
    try {
      if (e.key === 'Enter') {
        const { data } = await axios.post(
          '/api/teams/createMessage',
          { text: this.state.input, channelId: this.props.channelId },
          { headers: requests.setTokenHeadersOptions() }
        );
        console.log(data.message);
        this.setState({ input: '' });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { classes, channelName } = this.props;
    const { input } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.marginTop}></div>
        <Typography variant="h3" align="center">
          #{channelName}
        </Typography>
        <TextField
          className={classes.input}
          InputProps={{
            className: classes.inputField,
          }}
          id="filled-textarea"
          variant="filled"
          label="Input"
          placeholder="Type Your Message"
          onChange={this.handleInputChange}
          value={input}
          onKeyPress={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Messages);
