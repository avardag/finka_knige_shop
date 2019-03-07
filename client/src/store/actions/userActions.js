import axios from "axios";
import { LOGIN_USER,
         REGISTER_USER,
         AUTH_USER, 
         LOGOUT_USER,
         ADD_TO_CART_USER
         } from './types';
import { USER_ROUTES } from '../../components/utils/misc';


export function loginUser(userDataToSubmit){
  const request = axios.post(`${USER_ROUTES}/login`, userDataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}
export function registerUser(userDataToSubmit){
  const request = axios.post(`${USER_ROUTES}/register`, userDataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function auth(userDataToSubmit){
  const request = axios.get(`${USER_ROUTES}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  }
}
export function logoutUser(){
  const request = axios.get(`${USER_ROUTES}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

//Users Shopping Cart

/** Add item to users shopping cart
 *  POST * '/api/users/addtocart?productId=90832984980998
* @returns from server object {id: 098877, quantity: 1, addedDate: 9827444}
*/
export function addToCart(_id){
  const request = axios.post(`${USER_ROUTES}/addtocart?productId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request
  }
}