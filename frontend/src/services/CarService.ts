import axios from 'axios';
import { Car, CarInfo } from '../types/CarTypes';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';

export async function getCarList(filters: Filter[]): Promise<CarInfo[]> {
  const response = await axios.get<CarInfo[]>(
    'http://127.0.0.1:8000/api/v1/car/',
    ponerFiltros(filters)
  );
  return response.data;
}

export async function createCar(car: Car) {
  await axios.post<Car>('http://127.0.0.1:8000/api/v1/car/', car);
}
export async function updateCar(car: Car, id: number) {
  await axios.put<Car>(`http://127.0.0.1:8000/api/v1/car/${id}/`, car);
}
export async function deleteCarById(id: number) {
  const response = await axios.delete(`http://127.0.0.1:8000/api/v1/car/${id}/`);
  return response.data;
}