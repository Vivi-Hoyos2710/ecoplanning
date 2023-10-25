import moment from 'moment';

import React,{ useState, useEffect } from 'react';
import { Card, Typography } from '@material-tailwind/react';


type DataPoint = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
type DataPointList = DataPoint[] | [];

const today = moment()

export const Dashboard = () => {

  return (
    <div className="flex flex-col justify-center items-center  p-5 md:p-0">
      <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
              <Typography  variant="h4"color="gray" className="mt-1 font-bold text-center">
              General Dashboard - All vehicles
              </Typography>
      </Card>
    </div>
  );
};
