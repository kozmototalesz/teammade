import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS, PROJECTS_LOADING} from './types';

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

//ADD PROJECT
export const addProject = (prData,history) => dispatch =>
{
    axios
        .post('/api/project',prData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({type:GET_ERRORS,payload:err.response.data}))

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

