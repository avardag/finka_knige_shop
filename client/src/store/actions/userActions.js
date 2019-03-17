import axios from "axios";
import { LOGIN_USER,
         REGISTER_USER,
         AUTH_USER, 
         LOGOUT_USER,
         ADD_TO_CART_USER,
         GET_CART_ITEMS_USER,
         REMOVE_CART_ITEM_USER,
         ON_SUCCESS_BUY_USER,
         } from './types';
import { USER_ROUTES, PRODUCTS_ROUTES } from '../../components/utils/misc';


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
/** 
 * @route /api/products/articles/id?id=kfhhihf39080923jd9082,skffn989489msn&type=array
 * GET
 * @param cartItems -> array, of cart items IDS
 * @param userCart -> array, of objects in cart: { id: 20303, quantity: 3, addedDate: 92839 }
 * @return array of product objs with quantity key injected from userCart
 */
export function getCartItems(cartItems, userCart) {
  const request = axios.get(`${PRODUCTS_ROUTES}/articles/id?id=${cartItems}&type=array`)
    .then(response=>{
      //inject quantity in userCart into product objects returned in response.data
      //will return array of products objs with quantity key included
      //because product model from server doensnt have quantity field
      userCart.forEach(item=>{
        response.data.forEach((k, i)=>{
          if(item.id === k._id){
            response.data[i].quantity = item.quantity;
          }
        })
      })
      return response.data;
    })
  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  }
}

/** 
 *  remove item item user cart
 * GET
 * @route /api/users/removefromcart?productId=90832984980998
 * @param cartItems -> array, of cart items IDS
 * @param userCart -> array, of objects in cart: { id: 20303, quantity: 3, addedDate: 92839 }
 * @return array of product objs with quantity key injected from userCart
 */
export function removeCartItem(productId) {
  const request = axios.get(`${USER_ROUTES}/removefromcart?productId=${productId}`)
    .then(response=>{
      //inject quantity in userCart into product objects returned in response.data
      //will return array of products objs with quantity key included
      //because product model from server doensnt have quantity field
      response.data.cart.forEach(item=>{
        response.data.cartDetail.forEach((k, i)=>{
          if(item.id === k._id){
            response.data.cartDetail[i].quantity = item.quantity;
          }
        })
      })
      return response.data;
    })
  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  }
}
/** 
 *  
 * POST
 * @route /api/users/successbuy
 * @param data -> 
 * @return obj {success: true,
                cart: user.cart, //will be empty
                cartDetail: []
                }
 */
export function onSuccessBuy(data) {
  const request = axios.post(`${USER_ROUTES}/successbuy`, data)
    .then(response => response.data)
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request
  }
}
