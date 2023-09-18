import React from 'react';
import {Button, Input } from "@material-tailwind/react";
import { DefaultTable } from './utils/Table';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StationForm ,StationInfo} from '../../../types/StationTypes';
import { LoginFormData } from '../../../types/AuthTypes';
import { fromAddress } from '../../../services/GeoCodingService';
import { createStation } from '../../../services/StationService';
interface TableData{
    name:string,
    coordinate:string
}



export const Stations = () => {
  const [tableData,setTableData]= useState<TableData|null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StationForm>();
  const [tableData,setTableData]= useState<TableData|null>(null);
  const [addressError, setAddressError] = useState<boolean>(false)
  const addStation: SubmitHandler<StationForm> = async(data: StationForm) => {
    console.log(data);
    try{
      console.log("corriendo")
      const response = await fromAddress(data.address);
        console.log(response);
        const name = data.name, latitude = response.lat, longitude = response.lng, address = data.address;
        createStation({
          name,
          latitude,
          longitude,
          address,
        })
    }
    catch(e){
      setAddressError(true);
      console.log("Error");
    }
  };

  return (
    <div className="bg-white p-5">
        <div className="flex flex-row justify-between border-b-4 border-black pb-5">
            <h1> Stations</h1>

            <form onSubmit={handleSubmit(addStation)} className="flex flex-row m-2 w-1/2 justify-center justify-items-center	items-center">
              <Input label='name' {
                  ...register('name', {
                    required: 'Debes ingresar un nombre',
                    pattern: {
                      value: /^\S+.\S+$/i,
                      message: 'El nombre ingresado no es válido',
                    },
                })}></Input>
              <Input label='address'
              {
                ...register('address', {
                  required: 'Debes ingresar una dirección',
                  pattern: {
                    value: /^.*$/,
                    message: 'Dirección ingresada no es válida',
                  },
              })}
              ></Input>
              <Button  type='submit' color='blue'   >AddStation</Button>
              {addressError && <Alert variant="gradient">
                  <AiFillInfoCircle /><Typography variant="small">Dirección No Válida</Typography>
                </Alert>}
            </form>
        </div>
        <div>
            <DefaultTable header={["Name", "Coordinate"]} tableRow={TABLE_ROWS} tableKeys={ ["stationName", "coordinate"]} actions={["EDIT","DELETE"]}/>
        </div>
    </div>
  );
};

 

 
