import React, { useEffect } from 'react';
import { Button, Input, Typography, Card } from '@material-tailwind/react';
import { DefaultTable } from '../utils/Table';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Station, StationForm } from '../../../../types/StationTypes';
import { fromAddress } from '../../../../services/GeoCodingService';
import { createStation, getStationList, deleteStation } from '../../../../services/StationService';
import { ConfirmationMessage } from '../utils/ConfirmMessage';
import { StationTable } from './StationTable';
import { AddStations } from './AddStations';

export const StationsController = () => {
  const [reloadTable, setReloadTable] = useState<boolean>(true);
  const [stationId, setStationId] = useState<number>(0);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [station, setStation] = useState<Station | null>(null);

  const handleActions = (action: string, dataInfo: Station): void => {
    if (action === 'EDIT') {
      setStation(dataInfo);
      handleAddOpen();
    }
    if (action === 'DELETE') {
      setStationId(dataInfo.id);
      handleOpenDeleteMessage(false);
    }
    if (action === 'LINK') {
      window.location.assign(`/stations/${dataInfo.id}`);
    }
  };
  const openAddMenu = () => {
    setStation(null);
    handleAddOpen();
  }
  const handleAddOpen = () => {
    setAddOpen(!addOpen);
  };

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await deleteStation(id);
      setReloadTable(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenDeleteMessage = (isConfirmed: boolean): void => {
    if (isConfirmed && stationId) {
      handleDelete(stationId);
    }
    setOpenDelete(!openDelete);
  };
  return (
    <div className="bg-white p-5">
      <div className="flex flex-col justify-center items-center  p-5 md:p-0">
        <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
          <Typography color="gray" variant="h4" className="mt-1 font-bold text-center">
            Station management
          </Typography>
        </Card>
        <Button
          variant="gradient"
          color="green"
          onClick={openAddMenu}
        >
          Add Station
        </Button>
        <div className="flex mt-10 justify-between ">
          <AddStations station={station} addOpen={addOpen} handleAddOpen={handleAddOpen} setReloadTable={setReloadTable} />
          <div className="flex  w-full rounded-t-lg pt-4 text-center">
            <StationTable reloadTable={reloadTable} setReloadTable={setReloadTable} handleActions={handleActions} />
          </div>
          <ConfirmationMessage handleOpen={handleOpenDeleteMessage} open={openDelete} info={"Are you sure do you want to delete this car?"} title={"Warning"} />
        </div>

      </div>
    </div>
  );
};
