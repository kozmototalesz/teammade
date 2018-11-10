import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING,CLEAR_CURRENT_PROFILE} from './types';

//GET CURRENT PROFIL

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