import axios from 'axios';
import { Brand, BrandInfo, BrandModel } from '../types/BrandTypes';
import { Filter } from '../types/ServiceTypes';
import { getAuthConfig, ponerFiltros } from './GeneralService';

const {REACT_APP_DJANGO_HOST} = process.env;

export async function getBrandListFilter(filter: any): Promise<Brand[]> {
  const response = await axios.get<Brand[]>(
    `http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand/`,ponerFiltros(filter)
  );
  return response.data;
}
export async function getBrandList(): Promise<Brand[]> {
  const response = await axios.get<Brand[]>(`http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand/`);
  return response.data;
}
export async function getBrandModelList(filter: any): Promise<BrandModel[]> {
  const response = await axios.get<BrandModel[]>(
    `http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand-model/`,
    ponerFiltros(filter)
  );
  return response.data;
}

export async function createBrand(brand: BrandInfo) {
  await axios.post<BrandInfo>(`http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand/`, brand, getAuthConfig());
}

export async function editBrand(id: number, brand: BrandInfo) {
  await axios.put<BrandInfo>(`http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand/${id}/`, brand, getAuthConfig());
}

export async function deleteBrand(id: number) {
  await axios.delete<BrandInfo>(`http://${REACT_APP_DJANGO_HOST}:8000/api/v1/brand/${id}`, getAuthConfig());
}
