import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultTable } from '../utils/Table';
import { deleteReport, getReport } from '../../../../services/ReportService';
import { ReportInfo } from '../../../../types/ReportType';
import { Typography, Card, Alert } from '@material-tailwind/react';
import { ConfirmationMessage } from '../utils/ConfirmMessage';
export const ReportView = () => {
    const { id } = useParams();
    const [reports, setReports] = useState<ReportInfo[]>([]);
    const [stationName, setStationName] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [reportId, setReportId] = useState<number | null>(null);
    useEffect(() => {
        const getReportsBystation = async () => {
            try {
                const reports = await getReport([{ name: 'station', value: id?.toString() ?? '' }]);
                setStationName(reports[0].station__name ? reports[0].station__name : '');
                setReports(reports);
            } catch (error) {
                console.log(error);
            }
        }
        getReportsBystation();
    }, [open]);

    const handleOpen = (isConfirmed: boolean) => {
        console.log(isConfirmed);
        if (isConfirmed) {
            deleteStation();
        }
        setOpen(!open);
    };
    const deleteStation = async (): Promise<void> => {
        try {
            if (reportId) {
                await deleteReport(reportId);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleActions: (action: string, report: any) => void = (action, report) => {
        if (action == 'DELETE') {
            setOpen(true);
            setReportId(report.id);
        }
    }

    return (
        <div className="bg-white p-5">
            <div className="flex flex-col justify-center items-center  p-5 md:p-0">
                <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 mb-6">
                    <Typography color="gray" variant="h4" className="mt-1 font-bold text-center">
                       Station Reports: {stationName}
                    </Typography>
                </Card>
                <div>{reports.length > 0 ? (<DefaultTable
                    header={['id', 'description', '', '', '']}
                    tableRow={reports}
                    tableKeys={['id', 'description']}
                    actions={['DELETE']}
                    handleActions={handleActions}
                />) : (<Alert variant="ghost">
                    <span>No reports in this station</span>
                </Alert>)}

                    <ConfirmationMessage handleOpen={handleOpen} open={open} title={"Delete report"} info={"Are you sure do you want to delete this report forever?"} />
                </div>

            </div>
        </div>
    );
}
