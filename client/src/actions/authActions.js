import {GET_ERRORS} from './types';
import {SET_CURRENT_USER} from './types';

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import axios from 'axios';


 //Register User
 export const registerUser = (userData,history) => dispatch => {
    axios
        .post('/api/users/register',userData)
        .then( res => history.push('/login'))
        .catch(err =>

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
 };

 //Login User

 export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login',userData)
        .then(res => {
            //Save to localStorage
            const {token} = res.data;  
            //Set token to localStorage
            localStorage.setItem('jwtToken', token);
            //Set token to Auth header
            setAuthToken(token);
            //Decode token
            const decoded=jwt_decode(token);
            //Curren User
            dispatch(currentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
 };

// Logged in user

export const currentUser = (decoded)=>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out

export const logoutUser = () => dispatch => {

  //Remove token from localStorage
    localStorage.removeItem('jwtToken');
  //Remove auth header
    setAuthToken(false);
  //set current to {} object
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}