import {GET_PROJECTS, PROJECTS_LOADING, CLEAR_CURRENT_PROFILE,ADD_TEAMMATE,ADD_TEMPORARYMEMBERS,ADDED_PROJECT, REMOVE_TEAMMATE} from '../actions/types';

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
                projects: action.payload,
                temporaryMembers: []

        };
        case ADD_TEAMMATE:
            return {
                loading:false,
                temporaryMembers: [...state.temporaryMembers,action.payload]
        };
        case REMOVE_TEAMMATE:
            return {
                ...state,
                temporaryMembers: state.temporaryMembers.filter(item => item.id !== action.payload)
        };
        case ADD_TEMPORARYMEMBERS:
              
            return {
                ...state,
                temporaryMembers: action.payload
        };
        

        default:
            return state
    }
}