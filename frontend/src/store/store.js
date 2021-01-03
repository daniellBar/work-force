import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { employeeReducer } from './reducer/employeeReducer';
import { userReducer } from './reducer/userReducer';
import { filterReducer } from './reducer/filterReducer';

const rootReducer = combineReducers({
    employeeReducer,
    filterReducer,
    userReducer
   
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))