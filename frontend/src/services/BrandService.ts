import axios from 'axios';
import { Brand, BrandInfo,BrandModel } from '../types/BrandTypes';
import { FilterNameValue,FilterOrder } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';


export async function getBrandListFilter(filtros: FilterNameValue|FilterOrder): Promise<Brand[]> {
    const response = await axios.get<Brand[]>(
        'http://127.0.0.1:8000/api/v1/brand/', ponerFiltros(filtros)
    );
    return response.data;
}
export async function getBrandList(): Promise<Brand[]> {
    const response = await axios.get<Brand[]>(
        'http://127.0.0.1:8000/api/v1/brand/'
    );
    return response.data;
}
export async function getBrandModelList(filter:any): Promise<BrandModel[]> {
    const response = await axios.get<BrandModel[]>(
        'http://127.0.0.1:8000/api/v1/brand-model/',ponerFiltros(filter)
    );
    return response.data;
}

export async function createBrand(car: BrandInfo) {
    await axios.post<BrandInfo>(
        'http://127.0.0.1:8000/api/v1/brand/',
        car
    );
}
