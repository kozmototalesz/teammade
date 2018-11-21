import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_TEAMMATES} from '../actions/types';

const initialState={
    profile:null,
    loading: false,
    profiles:null,
    chosen:null,
}

export default function(state=initialState,action){
    switch(action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading:true
            };
        case GET_PROFILE:
            return {
                ...state,
                loading:false,
                profile: action.payload
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile:null
            };
        case GET_TEAMMATES:
            return{
                ...state,
                profiles:action.payload
            }

        default:
            return state
    }
}