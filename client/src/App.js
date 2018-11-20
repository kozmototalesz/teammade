import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {currentUser, logoutUser} from './actions/authActions';

import store from './store'; 
import PrivateRoute from  './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import Dashboard from './components/dashboard/Dashboard';

import createProfile from './components/create-profile/CreateProfile';
import editProfile from './components/edit-profile/EditProfile';
import addProjects from './components/add-projects/AddProjects';
import editProject from './components/edit-project/EditProject';


//ACTIONS
import { clearProfile } from './actions/profileActions';

import './App.css';

//Check the token
if(localStorage.jwtToken){
  //set auth token
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user that isAuthencitcated
  store.dispatch(currentUser(decoded));

  //Check expired token
  const currenTime=Date.now()/1000;
  if(decoded.exp < currenTime) {
    //logout
    store.dispatch(logoutUser());
    // clreear,redirect
    store.dispatch(clearProfile());
    window.location.href='/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="MyReactApp">
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <div className="containter">
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Switch>>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
            </Switch>
            <Switch>>
              <PrivateRoute exact path="/create-profile" component={createProfile}></PrivateRoute>
            </Switch>
            <Switch>>
              <PrivateRoute exact path="/edit-profile" component={editProfile}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-project" component={addProjects}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-project" component={editProject}></PrivateRoute>
            </Switch>
          </div>
          <Footer></Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
 