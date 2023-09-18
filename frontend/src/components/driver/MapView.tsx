import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Input ,Card,Button} from "@material-tailwind/react";
import Map from './Map'
const MapView = () => {
  return (
    <div className="">
      <Map >
        <div className="w-1/4 flex flex-col p-3 gap-2 pt-24 z-10 ">
          <Input placeholder ="Ingresa Origen" className='bg-white w-1/4'></Input>
          <Input placeholder ="Ingresa Destino" className='bg-white w-1/4'></Input>
          <Input placeholder ="Batería" className='bg-white w-1/4'></Input>
          <Button className="z-10 bg-teal-400	"> Calcular Ruta</Button>
        </div>
      </Map>
    </div>
  );
};
export default MapView;
