import { FilterSet } from "../types/ServiceTypes";

export function ponerFiltros(filtros: FilterSet){
    return {
        params:{
            ...filtros
        }
    }
}

export function getToday(){
    return new Date().toISOString().split('T')[0];
}
