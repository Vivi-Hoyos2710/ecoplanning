type ReportForm = {
  station: string;
  station_id: number;
  description: string;
};
type SendReport = {
  station: number;
  description: string;
};
type ReportInfo ={
  id: number;
  station: number;
  station__name: string;
  description: string;
}
export type { ReportForm,SendReport,ReportInfo }
