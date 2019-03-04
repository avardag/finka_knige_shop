import { GET_PRODUCTS_BY_ARRIVAL, 
          GET_PRODUCTS_BY_SELL, 
          GET_BRANDS, GET_STYLES,
          ADD_BRAND, ADD_STYLE,
          GET_PRODUCTS_TO_SHOP,
          ADD_PRODUCT,
          CLEAR_ADDED_PRODUCT
        } from '../actions/types';

export default function(state={}, action){
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
    case GET_PRODUCTS_BY_SELL:
      return {...state, bySell: action.payload}
  
    case GET_BRANDS:
      return {...state, brands: action.payload}

    case ADD_BRAND:
      return { 
        ...state, 
        brandAdded: action.payload.success, 
        brands: action.payload.brands
      }
  
    case GET_STYLES:
      return {...state, styles: action.payload}
    
    case ADD_STYLE:
    return { 
      ...state, 
      styleAdded: action.payload.success, 
      styles: action.payload.styles
    }
  
    case GET_PRODUCTS_TO_SHOP:
      return {...state, toShop: action.payload.articles, toShopSize: action.payload.size}
  
    case ADD_PRODUCT:
      return {...state, addedProduct: action.payload}
  
    case CLEAR_ADDED_PRODUCT:
      return {...state, addedProduct: action.payload}
  
    default:
      return state;
  }
}