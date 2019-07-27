import {combineReducers} from 'redux'
//Reducers import
import userReducer from "./userReducer";
import productsReducer from './productsReducer';
import siteReducer from './siteReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  site: siteReducer
})

export default rootReducer