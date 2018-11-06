import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/register';
import Login from './components/authentication/login';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="MyReactApp">
        <Navbar></Navbar>
        <Route exact path="/" component={Landing} />
        <div className="containter">
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>

        </div>
        <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
 