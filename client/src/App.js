import React, { Component } from 'react';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(jwtToken) {
    const { user } = jwtDecode(jwtToken);
    console.log(user);
    this.setState({ user });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <BrowserRouter>
        <CssBaseline></CssBaseline>
        <Header user={user}></Header>
        <Switch>
          <Route path="/" exact component={() => <div>Main</div>}></Route>
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
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
