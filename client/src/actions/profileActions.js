import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS, PROJECTS_LOADING, ADD_TEAMMATE, GET_TEAMMATES} from './types';

//GET CURRENT PROFILE

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload:res.data
            }))
        .catch(err=>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
    );
}

//PROFILE LOADING
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


//PROFILE CLEARING
export const clearProfile = () => {
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}

//GET TEAMMATES BY NAME
export const getTeamMates = (filterData) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/all?name=${filterData.name}`)
        .then(res =>
            dispatch({
                type: GET_TEAMMATES,
                payload:res.data
            }))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
    );
}

export const addMember = (userData) => dispatch => {
    dispatch({
        type: ADD_TEAMMATE,
        payload: 'lofasz'
    })
}


//ADD PROJECT
export const addProject = (prData,history) => dispatch =>
{
    axios
        .post('/api/project',prData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}))
}


//CREATE PROFILE
export const createnewProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile',profileData)
        .then(res=> history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
}

