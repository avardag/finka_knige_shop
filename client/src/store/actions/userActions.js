import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
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