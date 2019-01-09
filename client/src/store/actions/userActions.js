import axios from "axios";
import { LOGIN_USER } from './types';
import { USER_ROUTES } from '../../components/utils/misc';


export function loginUser(userDataToSubmit){
  const request = axios.post(`${USER_ROUTES}/login`, userDataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}