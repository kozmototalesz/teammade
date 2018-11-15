import axios from 'axios';
import {GET_PROJECTS, GET_ERRORS, PROJECTS_LOADING, GET_PROFILE,ADD_TEAMMATE} from './types';


//PROJECT LOADING

export const setProjectLoading = () => {
    return {
        type: PROJECTS_LOADING
    }
}

//ADD PROJECT
export const addProject = (prData,history) => dispatch =>
{
    axios
        .post('/api/project',prData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}))
}


export const addMember = (userData) => dispatch => {
    dispatch({
        type: ADD_TEAMMATE,
        payload: userData
    })
}



//DELETE PROJECT
export const deleteProject = (id) => dispatch =>
{
    axios
        .delete(`/api/project/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })    
            
        )
        .catch(err => dispatch({type:GET_ERRORS,payload:err.response.data}))

}


//GET ALL PROJECT
export const getMyProjects = () => dispatch => {
    dispatch(setProjectLoading());
    axios.get('/api/project/all')
        .then(res =>
            dispatch({
                type: GET_PROJECTS,
                payload:res.data
            }))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
    );
}
