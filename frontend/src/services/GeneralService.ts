import { FilterNameValue,FilterOrder } from "../types/ServiceTypes";

export function ponerFiltros(filtros: FilterNameValue|FilterOrder){
    return {
        params:{
            ...filtros
        }
    }
}

export function getToday(){
    return new Date().toISOString().split('T')[0];
}
