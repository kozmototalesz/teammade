import {GET_PROJECTS, PROJECTS_LOADING, CLEAR_CURRENT_PROFILE} from '../actions/types';

const initialState={
    project: null,
    loading: false
}

export default function(state=initialState,action){
    switch(action.type){
        case PROJECTS_LOADING:
            return {
                ...state,
                loading:true
            };
        case GET_PROJECTS:
            return {
                ...state,
                loading:false,
                project: action.payload
            };
        default:
            return state
    }
}