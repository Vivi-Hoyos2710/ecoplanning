import axios from 'axios';
import { Brand, BrandInfo, BrandModel } from '../types/BrandTypes';
import { Filter } from '../types/ServiceTypes';
import { getAuthConfig, ponerFiltros } from './GeneralService';

export async function getBrandListFilter(filter: any): Promise<Brand[]> {
  const response = await axios.get<Brand[]>(
    'http://127.0.0.1:8000/api/v1/brand/',ponerFiltros(filter)
  );
  return response.data;
}
export async function getBrandList(): Promise<Brand[]> {
  const response = await axios.get<Brand[]>('http://127.0.0.1:8000/api/v1/brand/');
  return response.data;
}
export async function getBrandModelList(filter: any): Promise<BrandModel[]> {
  const response = await axios.get<BrandModel[]>(
    'http://127.0.0.1:8000/api/v1/brand-model/',
    ponerFiltros(filter)
  );
  return response.data;
}

export async function createBrand(car: BrandInfo) {
  await axios.post<BrandInfo>('http://127.0.0.1:8000/api/v1/brand/', car, getAuthConfig());
}
