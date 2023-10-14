import axios from 'axios';
import { Model, ModelInfo } from '../types/ModelTypes';
import { OVMSData } from '../types/OVMSTypes';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';

export async function getOVMSDataFilter(filters: Filter[]): Promise<OVMSData[]> {
  const response = await axios.get<OVMSData[]>(
    'http://127.0.0.1:8000/api/v1/app-model/',
    ponerFiltros(filters)
  );
  return response.data;
}
