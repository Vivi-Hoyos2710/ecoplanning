import React, { useEffect } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import { DefaultTable } from '../utils/Table';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Station, StationForm } from '../../../../types/StationTypes';
import { fromAddress } from '../../../../services/GeoCodingService';
import { createStation, getStationList, deleteStation } from '../../../../services/StationService';
import { ConfirmationMessage } from '../utils/ConfirmMessage';

interface StationTable {
    reloadTable: boolean;
    setReloadTable: (reloadTable: boolean) => void;
    handleActions: (type: string, data: any) => void;
}
export const StationTable = ({ reloadTable, setReloadTable, handleActions }: StationTable) => {
    const [tableData, setTableData] = useState<Station[]>([]);
    useEffect(() => {
        const getStations = async () => {
            const stations = await getStationList([{ name: 'ordering', value: 'id' }]);
            setTableData(stations);
            setReloadTable(false);
        };
        if (reloadTable) getStations();
    }, [reloadTable]);
    return (
        <div>
            <DefaultTable
                header={['Name', 'Address', "Information", 'Edit', 'Delete']}
                tableRow={tableData}
                tableKeys={['name', 'address']}
                actions={['LINK', 'EDIT', 'DELETE']}
                handleActions={handleActions}
            />
        </div>
    )
}
