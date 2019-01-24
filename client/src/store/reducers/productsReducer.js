import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_BRANDS, GET_STYLES } from '../actions/types';

export default function(state={}, action){
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
    case GET_PRODUCTS_BY_SELL:
      return {...state, bySell: action.payload}
  
    case GET_BRANDS:
      return {...state, brands: action.payload}
  
    case GET_STYLES:
      return {...state, styles: action.payload}
  
    default:
      return state;
  }
}