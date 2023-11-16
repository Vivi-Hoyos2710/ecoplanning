import axios from 'axios';
import { Filter } from '../types/ServiceTypes';
import { getAuthConfig, ponerFiltrosYAuthenticacion } from './GeneralService';
import { SendReport, ReportInfo } from '../types/ReportType';

const {DJANGO_HOST} = process.env;

export async function createReport(report: SendReport) {
  await axios.post<SendReport>(`http://${DJANGO_HOST}:8000/api/v1/report-stations/`, report, getAuthConfig());
}
export async function getReport(filters: Filter[]): Promise<ReportInfo[]> {
  const response = await axios.get<ReportInfo[]>(
    `http://${DJANGO_HOST}:8000/api/v1/report-stations/`, ponerFiltrosYAuthenticacion(filters)
  );
  return response.data;
}
export async function deleteReport(id: number) {
  const response = await axios.delete(
    `http://${DJANGO_HOST}:8000/api/v1/report-stations/${id}/`, getAuthConfig()
  );
  return response.data;
}
