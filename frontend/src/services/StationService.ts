import axios from 'axios';
import { Car } from '../types/CarTypes';
import { FilterNameValue } from '../types/ServiceTypes';
import { Station, StationInfo } from '../types/StationTypes';
import { ponerFiltros } from './GeneralService';


export async function getStationList(filtros: FilterNameValue): Promise<Station[]> {
    const response = await axios.get<Station[]>(
        'http://127.0.0.1:8000/api/v1/station/', ponerFiltros(filtros)
    );
    return response.data;
}


export async function createStation(station: StationInfo) {
    console.log("creando gonorreas")
    console.log(station)
    await axios.post<Station>(
        'http://127.0.0.1:8000/api/v1/station/',
        station
    );
}
