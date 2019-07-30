import axios from "axios";
import {  GET_SITE_INFO, UPDATE_SITE_INFO } from './types';
import { SITE_INFO_ROUTES } from '../../components/utils/misc';

export function getSiteInfo(){
  const request = axios.get(`${SITE_INFO_ROUTES}/site_info`)
    .then(response => response.data);

  return {
    type: GET_SITE_INFO,
    payload: request
  }
  
}
// update site info
// POST /api/site/site_info
export function updateSiteInfo(dataToSubmit){
  const request = axios.post(`${SITE_INFO_ROUTES}/site_info`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_SITE_INFO,
    payload: request
  }
}