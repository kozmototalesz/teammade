import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {currentUser} from './actions/authActions';

import store from './store'; 

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/register';
import Login from './components/authentication/login';


import './App.css';

//Check the token
if(localStorage.jwtToken){
  //set auth token
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user that isAuthencitcated
  store.dispatch(currentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store}>
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
      </Provider>
    );
  }
}

export default App;
 