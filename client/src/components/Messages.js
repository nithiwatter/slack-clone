import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { Comment } from 'semantic-ui-react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import requests from '../utils/requests';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    position: 'relative',
  },
  marginTop: {
    ...theme.mixins.toolbar,
  },
  grid: {
    display: 'grid',
    height: '100vh',
    gridTemplateColums: '1',
    gridTemplateRows: 'auto 1fr auto',
  },
  header: {
    marginTop: theme.spacing(1),
    gridRow: '1',
    gridColumn: '1',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    verticalAlign: 'top',
    height: '100%',
    overflowY: 'auto',
    gridColumn: '1',
    gridRow: '2',
  },
  input: {
    gridRow: '3',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: '2%',
    width: '96%',
  },
  inputField: {},
  icon: { backgroundColor: theme.palette.primary.main },
  commentContainer: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
  },
  author: {
    fontWeight: 200,
    fontSize: '0.8rem',
  },
  bubble: {
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '1rem',
    padding: '10px',
    backgroundColor: theme.palette.info.dark,
    color: 'white',
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
        this.props.socket.emit('message', [data.message, this.props.serverId]);
        this.setState({ input: '' });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { classes, channelName, messages } = this.props;
    const { input } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.grid}>
          <div className={classes.header}>
            <div className={classes.marginTop}></div>
            <Typography variant="h5" align="center">
              #{channelName}
            </Typography>
          </div>

          <TextField
            className={classes.input}
            InputProps={{
              className: classes.inputField,
            }}
            onChange={this.handleInputChange}
            value={input}
            onKeyPress={this.handleSubmit}
          />
          <div className={classes.messageContainer}>
            <div>
              {messages.map((message, idx) => (
                <div key={message._id}>
                  <div className={classes.commentContainer}>
                    <div className={classes.comment}>
                      <Avatar
                        style={{ marginRight: '1rem' }}
                        className={classes.icon}
                      >
                        {message.users[0].username[0]}
                      </Avatar>

                      <div className={classes.bubble}>
                        <div className={classes.author}>
                          {message.users[0].username}
                        </div>
                        {message.text}
                      </div>
                    </div>
                    <p style={{ margin: 0 }}>{message.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);
