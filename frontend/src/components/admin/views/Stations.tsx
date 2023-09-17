import React from 'react';
import { Card, Typography,Button, Input } from "@material-tailwind/react";
import { useState } from 'react';

interface TableData{
    name:string,
    coordinate:string
}
const szs = ()=>{console.log("ho")}
export const Stations = () => {
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
            <DefaultTable/>
        </div>
    </div>
  );
};


const TABLE_HEAD = ["Name", "Coordinate","Edit"];

const TABLE_ROWS = [
  {
    name: "Aguacatala",
    coordinate: "Cra 1236257",
  },
  {
    name: "Ayura",
    coordinate: "Cra 1236257",
  }
];

const DefaultTable=() =>{
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name,coordinate }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {coordinate}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
