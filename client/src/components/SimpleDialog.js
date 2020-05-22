import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SimpleDialog extends Component {
  state = {};
  render() {
    const {
      handleInputChange,
      handleClose,
      handleSubmit,
      open,
      value,
      err,
      errText,
    } = this.props;
    return (
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Type Your Team Name</DialogTitle>
        <TextField
          style={{ margin: '1rem 1rem' }}
          id="standard-basic"
          label="Team Name"
          onChange={handleInputChange}
          value={value}
          error={err}
          helperText={errText}
          autoComplete="off"
        ></TextField>
        <Button onClick={handleSubmit}>Add Me</Button>
      </Dialog>
    );
  }
}

export default SimpleDialog;
