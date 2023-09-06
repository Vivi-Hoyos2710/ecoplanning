import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { User, GetUserRequest, NoUser } from '../types/UserTypes';

function conseguirConfiguracionDeAutenticacion(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Token ${localStorage.getItem('tokenKey')}`
    }
  };
}

export async function conseguirUsurioLogeado(): Promise<User> {
  try {
    const config: AxiosRequestConfig = conseguirConfiguracionDeAutenticacion();
    const { data, status } = await axios.get<GetUserRequest>(
      'http://127.0.0.1:8000/auth/users/me/',
      config
    );
    return data.data;
  } catch (error) {
    return NoUser;
  }
}
