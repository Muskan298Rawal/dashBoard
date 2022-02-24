import { LOGOUT, REDIRECT, SET_ERROR, SET_LOADING, SET_USER } from "../Actions/ActionTypes"

const initialState = {
    loading: false,
    userData: null,
    error: "",
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOADING: 
        return{
            ...state,
            loading: true
        };
        case SET_USER: 
        return{
            ...state,
            loading: false,
            userData: action.payload
        };
        case SET_ERROR: 
        return{
            ...state,
            loading: false,
            error: action.payload
        };
        case LOGOUT: {
            localStorage.clear();
            sessionStorage.clear();
            return initialState;
        };
        default :
        return state;
    }
}

export default userReducer