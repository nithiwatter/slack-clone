import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  username: {
    fontWeight: '700',
    fontSize: '14px',
    margin: '0',
    marginLeft: '1.5rem',
  },
  text: {
    fontSize: '16px',
    margin: 0,
    marginBottom: '0.6rem',
    marginLeft: '1.5rem',
  },
});

class Message extends Component {
  state = {};
  render() {
    const { message, classes } = this.props;
    return (
      <React.Fragment>
        <div>
          <p className={classes.username}>{message.users[0].username}</p>
          <p className={classes.text}> {message.text}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Message);
