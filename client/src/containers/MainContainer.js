import React, { Component } from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ViewTeam from '../pages/ViewTeam';
import { Route, Switch } from 'react-router-dom';

class MainContainer extends Component {
  state = {};
  render() {
    const { user, handleAuth } = this.props;
    return (
      <Switch>
        <Route
          path="/register"
          exact
          render={(props) => (
            <Register
              {...props}
              handleAuth={this.handleAuth}
              user={user}
            ></Register>
          )}
        ></Route>
        <Route
          path="/login"
          exact
          render={(props) => (
            <Login {...props} handleAuth={this.handleAuth} user={user}></Login>
          )}
        ></Route>
        <Route
          path="/:teamName?/:channelName?"
          exact
          render={(props) => <ViewTeam {...props} user={user}></ViewTeam>}
        ></Route>
      </Switch>
    );
  }
}

export default MainContainer;
