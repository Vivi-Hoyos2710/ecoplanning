import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { User, NoUser } from '../types/UserTypes';
import { LoginFormData, LoginRequest, LoginToken } from '../types/AuthTypes';
import { getAuthConfig } from './GeneralService';

const {DJANGO_HOST} = process.env;

export async function getLoggedUser(): Promise<User> {
  try {
    const config: AxiosRequestConfig = getAuthConfig();
    const { data, status } = await axios.get<User>(`http://${DJANGO_HOST}:8000/auth/users/me/`, config);
    return data;
  } catch (error) {
    return NoUser;
  }
}

export async function getLoginToken(loginForm: LoginFormData): Promise<any> {
  const loginRequest: LoginRequest = {
    password: loginForm.password,
    email: loginForm.email
  };
  try {
    const response = await axios.post<LoginToken>(
      `http://${DJANGO_HOST}:8000/auth/token/login`,
      loginRequest
    );
    localStorage.setItem('tokenKey', response.data.auth_token);
  } catch (error) {
    return error;
  }
}
export async function logOut(): Promise<any> {
  try {
    console.log("here?");
    const config = getAuthConfig();
    const token = localStorage.getItem('tokenKey');
    const response = await axios.post<any>(`http://${DJANGO_HOST}:8000/auth/token/logout/`, token, config);
    localStorage.removeItem('tokenKey');
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
}
