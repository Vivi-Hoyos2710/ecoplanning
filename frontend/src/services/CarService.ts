import axios from 'axios';
import { Car } from '../types/CarTypes';
import { FilterSet } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';


export async function getCarList(filtros: FilterSet): Promise<Car[]> {
    const response = await axios.get<Car[]>(
        'http://127.0.0.1:8000/api/v1/car/', ponerFiltros(filtros)
    );
    return response.data;
}


export async function createCar(car: Car) {
    await axios.post<Car>(
        'http://127.0.0.1:8000/api/v1/car/',
        car
    );
}
