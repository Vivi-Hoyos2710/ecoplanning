import React, { useEffect } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import { DefaultTable } from './utils/Table';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Station, StationForm } from '../../../types/StationTypes';
import { fromAddress } from '../../../services/GeoCodingService';
import { createStation, getStationList } from '../../../services/StationService';

export const Stations = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<StationForm>();
  const [tableData, setTableData] = useState<Station[]>([]);
  const [reloadTable, setReloadTable] = useState<boolean>(false);
  const addStation: SubmitHandler<StationForm> = async (data: StationForm) => {
    try {
      const response = await fromAddress(data.address);
      const name = data.name;
      const latitude = response.lat;
      const longitude = response.lng;
      const address = data.address;
      try {
        await createStation({
          name,
          latitude,
          longitude,
          address
        });
        reset();
        setReloadTable(!reloadTable);
      } catch (error: any) {
        const data = error.response.data as StationForm;
        setError('name', {
          type: 'api',
          message: data.name
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getStations = async () => {
      const stations = await getStationList([{ name: 'ordering', value: 'id' }]);
      setTableData(stations);
    };

    getStations();
  }, [reloadTable]);

  return (
    <div className="bg-white p-5">
      <div className="flex flex-row justify-between border-b-4 border-black pb-5">
        <h1>Stations</h1>

        <form
          onSubmit={handleSubmit(addStation)}
          className="flex flex-row m-2 w-1/2 justify-center justify-items-center	items-center"
        >
          <Input
            label="Name"
            {...register('name', {
              required: 'Name is required'
            })}
          ></Input>
          {errors.name && (
            <Typography variant="small" color="red">
              {errors.name?.message}
            </Typography>
          )}
          <Input
            label="Address"
            {...register('address', {
              required: 'Address is required'
            })}
          ></Input>
          {errors.address && (
            <Typography variant="small" color="red">
              {errors.address?.message}
            </Typography>
          )}
          <Button type="submit" color="blue">
            Add Station
          </Button>
        </form>
      </div>
      <div>
        <DefaultTable
          header={['Name', 'Coordinate']}
          tableRow={tableData}
          tableKeys={['name', 'coordinate']}
          actions={['EDIT', 'DELETE']}
        />
      </div>
    </div>
  );
};
