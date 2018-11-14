import axios from 'axios';
import {GET_PROJECTS, GET_ERRORS, PROJECTS_LOADING, GET_PROFILE} from './types';


//PROJECT LOADING

export const setProjectLoading = () => {
    return {
        type: PROJECTS_LOADING
    }
}



//DELETE PROJECT
export const deleteProject = (id) => dispatch =>
{
    axios
        .delete(`/api/project${id}`)
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
