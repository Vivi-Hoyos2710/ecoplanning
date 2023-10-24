import axios from 'axios';

import { OVMSData } from '../types/OVMSTypes';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltros } from './GeneralService';

export async function getOVMSDataFilter(filters: Filter[]): Promise<OVMSData[]> {
  const baseURL = 'http://127.0.0.1:8000/api/v1/ovms/';
  try {
      const response = await axios.get<OVMSData[]>(
        baseURL,
        ponerFiltros(filters)
      );

      return response.data;
  } catch (error) {
      console.error('ERROR in getChartingData ',error);
      throw error;
  }
}
