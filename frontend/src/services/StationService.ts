import axios from 'axios';
import { Car } from '../types/CarTypes';
import { FilterSet } from '../types/ServiceTypes';
import { Station, StationInfo } from '../types/StationTypes';
import { ponerFiltros } from './GeneralService';


export async function getStationList(filtros: FilterSet): Promise<Station[]> {
    const response = await axios.get<Station[]>(
        'http://127.0.0.1:8000/api/v1/station/', ponerFiltros(filtros)
    );
    return response.data;
}


export async function createStation(car: StationInfo) {
    await axios.post<Station>(
        'http://127.0.0.1:8000/api/v1/station/',
        car
    );
}
