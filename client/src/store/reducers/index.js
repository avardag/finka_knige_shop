import {combineReducers} from 'redux'
//Reducers import
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer