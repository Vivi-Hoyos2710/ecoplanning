import React from 'react';
import {Button, Input } from "@material-tailwind/react";
import { DefaultTable } from './utils/Table';
import { useState } from 'react';

interface TableData{
    name:string,
    coordinate:string
}
const szs = ()=>{console.log("ho")}
export const Stations = () => {
  type TableRow = {
    stationName: string;
    coordinate: string;
  }; 
const TABLE_ROWS:TableRow[] = [
  {
    stationName: "Aguacatala",
    coordinate: "Cra 1236257",
  },
  {
    stationName: "Ayura",
    coordinate: "Cra 1236257",
  }
];
const [tableData,setTableData]= useState<TableData|null>(null);
  return (
    <div className="bg-white p-5">
        <div className="flex flex-row justify-between border-b-4 border-black pb-5">
            <h1> Stations</h1>
            <div className="flex flex-row m-2 w-1/2 justify-center justify-items-center	items-center">
              <Input label='Name'></Input>
              <Input label='Address' type='number'></Input>
              <Button color='blue' onClick={szs}  >AddStation</Button>
            </div>
        </div>
        <div>
            <DefaultTable header={["Name", "Coordinate"]} tableRow={TABLE_ROWS} tableKeys={ ["stationName", "coordinate"]} actions={["EDIT","DELETE"]}/>
        </div>
    </div>
  );
};

 

 
