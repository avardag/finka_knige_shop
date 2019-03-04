import axios from "axios";
import {  GET_PRODUCTS_BY_ARRIVAL, 
          GET_PRODUCTS_BY_SELL, 
          GET_BRANDS, GET_STYLES,
          ADD_BRAND, ADD_STYLE,
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

//CATEGORIES
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
// POST /api/products/brand
export function addBrand(dataToSubmit, existingBrands) {
  const request = axios.post(`${PRODUCTS_ROUTES}/brand`, dataToSubmit)
    .then(response => {
      // merge new brand (returned from server) with existing brands
      let brands = [
        ...existingBrands,
        response.data.brand
      ]
      return {
        success: response.data.success,
        brands
      }
    })
  return {
    type: ADD_BRAND,
    payload: request
  }
}
// POST /api/products/style
export function addStyle(dataToSubmit, existingStyles) {
  const request = axios.post(`${PRODUCTS_ROUTES}/style`, dataToSubmit)
    .then(response => {
      // merge new brand (returned from server) with existing brands
      let styles = [
        ...existingStyles,
        response.data.style
      ]
      return {
        success: response.data.success,
        styles
      }
    })
  return {
    type: ADD_STYLE,
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