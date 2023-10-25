import React, { useEffect } from 'react';
import { Button, Input, Typography ,Card} from '@material-tailwind/react';
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
  const handleActions: (action: string, id: number) => void = (action, id) => {

    if (action === 'DELETE') {
      console.log(id);
    }
  };
  return (
    <div className="bg-white p-5">
      <div className="flex flex-col justify-center items-center  p-5 md:p-0">
    <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
            <Typography color="gray" variant="h4" className="mt-1 font-bold text-center">
            Station management
            </Typography>
          </Card>



<div className="flex mt-10 justify-between ">
          <div className="flex flex-col justify-center items-center space-x-3">
  <Card shadow={true} className="text-gray-600 shadow-lg p-4 mx-auto mr-8">
    <form
      onSubmit={handleSubmit(addStation)}
      className="space-y-3"
    >
      <div className="flex flex-col space-y-2">
        <Input crossOrigin={undefined}
          label="Name"
          {...register('name', {
            required: 'Name is required'
          })}
          className="w-full"
        ></Input>
        {errors.name && (
          <Typography variant="small" color="red">
            {errors.name?.message}
          </Typography>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <Input crossOrigin={undefined}
          label="Address"
          {...register('address', {
            required: 'Address is required'
          })}
          className="w-full"
        ></Input>
        {errors.address && (
          <Typography variant="small" color="red">
            {errors.address?.message}
          </Typography>
        )}
      </div>
      <div className="flex justify-center">
      <Button type="submit"variant="gradient" color="cyan" className="rounded-full">
        Add Station
      </Button>
      </div>
    </form>
  </Card>
          </div>


      <div>
        <DefaultTable
          header={['Name', 'Coordinate','','']}
          tableRow={tableData}
          tableKeys={['name', 'coordinate']}
          actions={['EDIT', 'DELETE']}
          handleActions={handleActions}
        />
      </div>

</div>

      </div>
    </div>
  );
};
