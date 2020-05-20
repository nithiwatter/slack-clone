import React from 'react';
import Register from './pages/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline></CssBaseline>
      <Switch>
        <Route path="/" exact component={() => <div>Main</div>}></Route>
        <Route path="/register" exact component={Register}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
