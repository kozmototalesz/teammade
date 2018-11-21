import axios from 'axios';
import {GET_PROJECTS, GET_ERRORS, PROJECTS_LOADING,ADD_TEMPORARYMEMBERS,ADD_TEAMMATE,REMOVE_TEAMMATE,ADDED_PROJECT} from './types';


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
        .then(res => {  
            dispatch({
                type:ADDED_PROJECT,
                payload: {}
            })
            history.push('/dashboard')
        })
        .catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}))
}

//EDIT PROJECT
export const editProject = (id,prData,history) => dispatch =>
{
    axios
        .post(`/api/project/${id}`,prData)
        .then(res => { 
            history.push('/dashboard')
        })
        .catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}))
}

// ADD MEMBER
export const addMember = (userData) => dispatch => {
    
    dispatch({
        type: ADD_TEAMMATE,
        payload: userData
    })
}

export const removeMember = (id) => dispatch => {
    
    dispatch({
        type: REMOVE_TEAMMATE,
        payload: id
    })
    
}

//DELETE PROJECT
export const deleteProject = (id,history) => dispatch =>
{
    axios
        .delete(`/api/project/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })

            console.log(res.data);
            history.push('/dashboard');
        }
        )
        .catch(err => {dispatch({type:GET_ERRORS,payload: err.response.data})})
}

// ADD MEMBER
export const temporaryMembersList = (members) => dispatch => {
    dispatch({
        type: ADD_TEMPORARYMEMBERS,
        payload: members
    })
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
