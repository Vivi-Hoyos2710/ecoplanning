import axios from 'axios';

import { OVMSData } from '../types/OVMSTypes';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltrosYAuthenticacion } from './GeneralService';

export async function getOVMSDataFilter(filters: Filter[]): Promise<OVMSData[]> {
  const baseURL = 'http://127.0.0.1:8000/api/v1/ovms/';
  try {
      const response = await axios.get<OVMSData[]>(
        baseURL,
        ponerFiltrosYAuthenticacion(filters)
      );

      return response.data;
  } catch (error) {
      console.error('ERROR in getChartingData ',error);
      throw error;
  }
}

export function constructOVMsDataCSVFilterURL(filters: Filter[]): string {
  const baseURL = 'http://127.0.0.1:8000/api/v1/ovms/export_ovms_data_list/';

  function createQueryString(filters: Filter[]) {
    return filters.map(filter => `${encodeURIComponent(filter.name)}=${encodeURIComponent(filter.value)}`).join('&');
  }

  const queryString = createQueryString(filters);
  const fullURL = `${baseURL}?${queryString}`;

  return fullURL;
}
