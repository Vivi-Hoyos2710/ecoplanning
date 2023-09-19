import { Filter } from '../types/ServiceTypes';

export function ponerFiltros(filters: Filter[]) {
  const params: { [key: string]: string } = {};
  filters.forEach((filter: Filter) => {
    params[filter.name] = filter.value;
  });
  return {
    params
  };
}
