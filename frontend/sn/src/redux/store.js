import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import { combineReducers } from "redux";
import userReducer from './reducers/user.reducers';

const rootReducer= combineReducers({
    userReducer
})


const store= createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
  
  )

export default store