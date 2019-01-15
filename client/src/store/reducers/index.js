import {combineReducers} from 'redux'
//Reducers import
import userReducer from "./userReducer";
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer
})

export default rootReducer