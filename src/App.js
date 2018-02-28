import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch} from 'react-router-dom';

import NotFoundPage from './components/404'
import Login from './components/Login'
import SignUp from './components/signUp'
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div >   
          <Switch>
            <Route exact path="/" component={Login}  />
            <Route path="/signUp" component={SignUp}/>
            <Route path="/DashBoard" component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
