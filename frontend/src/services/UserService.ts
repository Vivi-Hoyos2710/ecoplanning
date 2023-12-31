import axios from 'axios';
import { Filter } from '../types/ServiceTypes';
import { User, UserInfo } from '../types/UserTypes';
import { ponerFiltros } from './GeneralService';

export async function getUserList(filters: Filter[]): Promise<UserInfo[]> {
  const response = await axios.get<UserInfo[]>(
    'http://${REACT_APP_DJANGO_HOST}:8000/api/v1/user/',
    ponerFiltros(filters)
  );
  return response.data;
}

export async function validateUser(user: UserInfo): Promise<UserInfo> {
  const response = await axios.post<UserInfo>('http://${REACT_APP_DJANGO_HOST}:8000/user/validation/', user);
  return response.data;
}
export async function createUser(user: UserInfo): Promise<User> {
  const response = await axios.post<User>('http://${REACT_APP_DJANGO_HOST}:8000/auth/users/', user);
  return response.data;
}
