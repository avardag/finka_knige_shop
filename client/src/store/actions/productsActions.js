import axios from "axios";
import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL } from './types';
import { PRODUCTS_ROUTES } from '../../components/utils/misc';

// /api/products/articles?sortBy=createdAt&order=desc&limit=4
export function getProductsByArrival() {
  const request = axios.get(`${PRODUCTS_ROUTES}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response=>response.data)
  return{
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  }
}

// /api/products/articles?sortBy=sold&order=desc&limit=4
export function getProductsBySell() {
  const request = axios.get(`${PRODUCTS_ROUTES}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response=>response.data)
  return{
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  }
}