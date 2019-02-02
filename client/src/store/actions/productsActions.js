import axios from "axios";
import {  GET_PRODUCTS_BY_ARRIVAL, 
          GET_PRODUCTS_BY_SELL, 
          GET_BRANDS, GET_STYLES,
          GET_PRODUCTS_TO_SHOP,
          ADD_PRODUCT,
          CLEAR_ADDED_PRODUCT
        } from './types';
import { PRODUCTS_ROUTES } from '../../components/utils/misc';

// /api/products/articles?sortBy=createdAt&order=desc&limit=4
export function getProductsByArrival() {
  const request = axios.get(`${PRODUCTS_ROUTES}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data)
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  }
}

// /api/products/articles?sortBy=sold&order=desc&limit=4
export function getProductsBySell() {
  const request = axios.get(`${PRODUCTS_ROUTES}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data)
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  }
}
// /api/products/brands
export function getBrands() {
  const request = axios.get(`${PRODUCTS_ROUTES}/brands`)
    .then(response => response.data)
  return {
    type: GET_BRANDS,
    payload: request
  }
}
// /api/products/styles
export function getStyles() {
  const request = axios.get(`${PRODUCTS_ROUTES}/styles`)
    .then(response => response.data)
  return {
    type: GET_STYLES,
    payload: request
  }
}
// POST   /api/products/shop
//sends JSOn data as a post request to server
export function getProductsToShop(skip, limit, filters=[], previousState=[]) {
  const dataToPost = { limit, skip, filters };

  const request = axios.post(`${PRODUCTS_ROUTES}/shop`, dataToPost)
    .then(response => {
      let newState = [
        ...previousState,
        ...response.data.articles
      ]
      return {
        size: response.data.size, //how many articles
        articles: newState
      }
    })
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  }
}

//Add new product to db
// POST   /api/products/article
export function addProduct(dataToSubmit) {

  const request = axios.post(`${PRODUCTS_ROUTES}/article`, dataToSubmit)
    .then(response => response.data)
  return {
    type: ADD_PRODUCT,
    payload: request
  }
}
//clears added product from redux state
export function clearAddedProduct(dataToSubmit) {
  return {
    type: CLEAR_ADDED_PRODUCT,
    payload: {}
  }
}