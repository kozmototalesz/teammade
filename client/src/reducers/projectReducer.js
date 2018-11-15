import {GET_PROJECTS, PROJECTS_LOADING, CLEAR_CURRENT_PROFILE,ADD_TEAMMATE} from '../actions/types';

const initialState={
    projects: null,
    loading: false,
    temporaryMembers: []

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
                projects: action.payload
        };
        case ADD_TEAMMATE:
            return {
                loading:false,
                temporaryMembers: [...state.temporaryMembers,action.payload]
            };

        default:
            return state
    }
}