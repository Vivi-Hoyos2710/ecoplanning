import axios from 'axios';
import { Filter } from '../types/ServiceTypes';
import { ponerFiltros, getAuthConfig } from './GeneralService';
import { ReportForm } from '../types/ReportType';
export async function createReport(report: ReportForm) {
    await axios.post<ReportForm>('http://127.0.0.1:8000/api/v1/report-stations/', report);
  }