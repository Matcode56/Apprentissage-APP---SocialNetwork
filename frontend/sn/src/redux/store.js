import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import { combineReducers } from "redux";
import userReducer from './reducers/user.reducers';
import postReducer from './reducers/post.reducers';
import usersReducer from './reducers/users.reducer';

const rootReducer= combineReducers({
    userReducer,
    usersReducer,
    postReducer
    
})


const store= createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
  
  )

export default store