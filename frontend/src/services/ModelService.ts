import axios from 'axios';
import { Model, ModelInfo } from '../types/ModelTypes';
import { Filter } from '../types/ServiceTypes';
import { getAuthConfig, ponerFiltros } from './GeneralService';
import { BrandInfo } from '../types/BrandTypes';

export async function getModelListFilter(filters: Filter[]): Promise<Model[]> {
  const response = await axios.get<Model[]>(
    'http://127.0.0.1:8000/api/v1/app-model/',
    ponerFiltros(filters)
  );
  return response.data;
}
export async function getModelList(): Promise<Model[]> {
  const response = await axios.get<Model[]>('http://127.0.0.1:8000/api/v1/app-model/');
  return response.data;
}

export async function getModelByID(id: string): Promise<Model[]> {
  const response = await axios.get<Model[]>(`http://127.0.0.1:8000/api/v1/app-model/${id}`);
  return response.data;
}

export async function getModelByName(name: string): Promise<Model[]> {
  const response = await axios.get<Model[]>(`http://127.0.0.1:8000/api/v1/app-model/?name=${name}`,getAuthConfig());
  return response.data;
}

export async function createModel(model: ModelInfo) {
  await axios.post<ModelInfo>('http://127.0.0.1:8000/api/v1/app-model/', model, getAuthConfig());
}

export async function editModel(id: number, model: ModelInfo) {
  await axios.put<ModelInfo>(`http://127.0.0.1:8000/api/v1/app-model/${id}/`, model, getAuthConfig());
}

export async function deleteModelById(id: number) {
  const response = await axios.delete(`http://127.0.0.1:8000/api/v1/app-model/${id}/`, getAuthConfig());
  return response.data;
}
