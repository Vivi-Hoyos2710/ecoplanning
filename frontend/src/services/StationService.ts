import axios from 'axios';
import { Car } from '../types/CarTypes';
import { Filter } from '../types/ServiceTypes';
import { Station, StationInfo } from '../types/StationTypes';
import { getAuthConfig, ponerFiltros } from './GeneralService';

export async function getStationList(filters: Filter[]): Promise<Station[]> {
  const response = await axios.get<Station[]>(
    'http://127.0.0.1:8000/api/v1/station/',
    ponerFiltros(filters)
  );
  return response.data;
}


export async function createStation(station: StationInfo) {
  await axios.post<Station>('http://127.0.0.1:8000/api/v1/station/', station, getAuthConfig());
}

export async function editStation(id: number, station: StationInfo){
  await axios.put<Station>(`http://127.0.0.1:8000/api/v1/station/${id}/`, station);
}

export async function deleteStation(id: number){
  const response = await axios.delete(`http://127.0.0.1:8000/api/v1/station/${id}/`);
  return response.data;
}
