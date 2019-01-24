import axios from "axios";
import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL, GET_BRANDS, GET_STYLES } from './types';
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