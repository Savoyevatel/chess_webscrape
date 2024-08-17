import { combineReducers, applyMiddleware } from "redux"
import { legacy_createStore as createStore } from 'redux'

import { thunk } from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import { openingSaveReducer } from "./reducers/openingReducers";
import { openingListReducer } from './reducers/savedReducers';
import { openingDeleteReducer } from "./reducers/savedReducers";

// Import other reducers as needed




const reducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    openingSave: openingSaveReducer,
    openingList: openingListReducer,
    openingDelete: openingDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null



const initialState = {
    
    userLogin: {userInfo:userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
