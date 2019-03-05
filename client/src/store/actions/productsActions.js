import axios from "axios";
import {  GET_PRODUCTS_BY_ARRIVAL, 
          GET_PRODUCTS_BY_SELL, 
          GET_BRANDS, GET_STYLES,
          ADD_BRAND, ADD_STYLE,
          GET_PRODUCTS_TO_SHOP,
          ADD_PRODUCT,
          CLEAR_ADDED_PRODUCT,
          GET_PRODUCT_DETAIL,
          CLEAR_PRODUCT_DETAIL,
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

//Get product detail form sigle product
// GET /api/products/articles/id?id=kfhhihf39080923jd9082,skffn989489msn&type=array
//  * @return array of product objects
export function getProductDetail(productId) {

  const request = axios.get(`${PRODUCTS_ROUTES}/articles/id?id=${productId}&type=single`)
    .then(response => response.data[0])
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  }
}
//clears product detail from redux state
export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    // payload: {} // gives error on "this.props.products.productDetail ?" ternary op
    payload: ''
  }
}