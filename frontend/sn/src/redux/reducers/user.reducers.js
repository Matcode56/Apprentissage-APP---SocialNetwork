import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_USER, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState= {};


export default function userReducer(state= initialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload;

        case UPLOAD_PICTURE:
            return{
                ...state,
                picture: action.payload
            }
        
            case UNFOLLOW_USER:
                return{
                    ...state, 
                    following: state.following.filter(
                        (id)=> id !== action.payload.idToUnfollow
                    )
                }
            case FOLLOW_USER:
                return{
                    ...state,
                    following: [action.payload.idToFollow, ...state.following]
                }
            case UPDATE_USER:
                if(action.payload.pseudo){
                    return{
                        ...state, 
                        pseudo: action.payload.pseudo
                    }
                }
                
                if(action.payload.email)
                    return{
                        ...state,
                        email: action.payload.email
                    }
        default:
             return state
    }
}