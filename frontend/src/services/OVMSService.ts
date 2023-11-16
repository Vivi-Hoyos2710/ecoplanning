import axios from 'axios';

import { OVMSData } from '../types/OVMSTypes';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltrosYAuthenticacion } from './GeneralService';

const {DJANGO_HOST} = process.env;

export async function getOVMSDataFilter(filters: Filter[]): Promise<OVMSData[]> {
  const baseURL = `http://${DJANGO_HOST}:8000/api/v1/ovms/`;
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
async function axiosDownloadFile(url: string, filters: Filter[]) {
  try {
    const response = await axios.get<any>(url, ponerFiltrosYAuthenticacion(filters));
    const contentDisposition = response.headers['content-disposition'];
    let fileName = "";
    const match = contentDisposition.match(/filename="([^"]+)"/);
    if (match) {
      fileName = match[1];
    }

    const blobData = Array.isArray(response.data) ? response.data : [response.data];
    const href = window.URL.createObjectURL(new Blob(blobData));

    const anchorElement = document.createElement('a');

    anchorElement.href = href;
    anchorElement.download = fileName;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    console.log(error);
  }
}

export function getOVMSDataCSVFilter(filters: Filter[]): void {
  const baseURL = `http://${DJANGO_HOST}:8000/api/v1/ovms/export_ovms_data_list/`;
  axiosDownloadFile(baseURL, filters);
}
