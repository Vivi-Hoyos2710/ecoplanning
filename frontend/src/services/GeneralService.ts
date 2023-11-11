import { AxiosRequestConfig } from 'axios';
import { Filter } from '../types/ServiceTypes';

export function getAuthConfig(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Token ${localStorage.getItem('tokenKey')}`
    }
  };
}

export function ponerFiltros(filters: Filter[]) : AxiosRequestConfig {
  const params: { [key: string]: string } = {};
  filters.forEach((filter: Filter) => {
    params[filter.name] = filter.value;
  });
  return {
    ...getAuthConfig(),
    params
  };
}
