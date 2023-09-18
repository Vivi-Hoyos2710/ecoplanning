import axios from 'axios';
import { Model, ModelInfo } from '../types/ModelTypes';
import { FilterNameValue,FilterOrder } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';


export async function getModelListFilter(filtros: FilterOrder|FilterNameValue): Promise<Model[]> {
    const response = await axios.get<Model[]>(
        'http://127.0.0.1:8000/api/v1/app-model/', ponerFiltros(filtros)
    );
    return response.data;
}
export async function getModelList(): Promise<Model[]> {
    const response = await axios.get<Model[]>(
        'http://127.0.0.1:8000/api/v1/app-model/'
    );
    return response.data;
}

export async function createBrand(model: ModelInfo) {
    await axios.post<ModelInfo>(
        'http://127.0.0.1:8000/api/v1/app-model/',
        model
    );
}