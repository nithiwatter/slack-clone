import React, { Component } from 'react';
import Header from './components/Header';
import MainContainer from './containers/MainContainer';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.get('/api/users/verify', {
          headers: { Authorization: 'Bearer ' + token },
        });
        this.setState({ user: data.user, loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  handleAuth(jwtToken) {
    const { user } = jwtDecode(jwtToken);
    console.log(user);
    localStorage.setItem('token', jwtToken);
    this.setState({ user });
  }

  handleLogOut() {
    localStorage.removeItem('token');
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <CssBaseline></CssBaseline>
        <div
          style={{
            height: '100vh',
            overflowY: 'hidden',
          }}
        >
          <Header user={user} handleLogOut={this.handleLogOut}></Header>
          <MainContainer
            user={user}
            handleAuth={this.handleAuth}
          ></MainContainer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
