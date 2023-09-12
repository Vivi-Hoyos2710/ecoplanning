import axios from 'axios';
import { FilterSet } from "../types/ServiceTypes";

export function ponerFiltros(filtros: FilterSet){
    return {
        params:{
            ...filtros
        }
    }
}

export function conseguirHoy(){
    return new Date().toISOString().split('T')[0];
};
