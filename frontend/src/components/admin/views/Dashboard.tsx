import axios from 'axios';
import moment from 'moment';

import React,{ useState, useEffect } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

type DataPoint = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
type DataPointList = DataPoint[] | [];

const getChartingData = async (query: any) => {
  const baseURL = 'http://127.0.0.1:8000/api/v1/ovms/';
  try {
      const response = await axios.get(baseURL, {
          params: query
      });

      return response.data;
  } catch (error) {
      console.error('ERROR in getChartingData ',error);
      throw error;
  }
}

const formattedTodayDate = moment().format('YYYY-MM-DD');

export const Dashboard = () => {
  const [elevationData, setElevationData] = useState<DataPointList>([]);
  const [batteryTempData, setBatteryTempData] = useState<DataPointList>([]);
  const [stateOfChargeData, setStateOfChargeData] = useState<DataPointList>([]);
  const [speedData, setSpeedData] = useState<DataPointList>([]);

  useEffect(() => {
    (async () => {
      const rawDataElevation = await getChartingData({
        'timestamp__gte' : formattedTodayDate,
      });

      const elevationData: DataPoint[] = [];
      const batteryData: DataPoint[] = [];
      const socData: DataPoint[] = [];
      const speedData: DataPoint[] = [];

      rawDataElevation.forEach((dataPoint: any) => {
        const formattedTime = moment(dataPoint.timestamp).format('HH:mm:ss');

        elevationData.push({
          name: formattedTime,
          uv: dataPoint.elevation,
          pv: 0,
          amt: 0,
        });

        batteryData.push({
          name: formattedTime,
          uv: parseFloat(dataPoint.batt_temp),
          pv: 0,
          amt: 0,
        });

        socData.push({
          name: formattedTime,
          uv: parseFloat(dataPoint.soc),
          pv: 0,
          amt: 0,
        });

        speedData.push({
          name: formattedTime,
          uv: parseFloat(dataPoint.speed),
          pv: 0,
          amt: 0,
        });
      });

      setElevationData(elevationData);
      setBatteryTempData(batteryData);
      setStateOfChargeData(socData);
      setSpeedData(speedData);

    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  p-5 md:p-0">
      <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
              <Typography  variant="h4"color="gray" className="mt-1 font-bold text-center">
              General Dashboard - All vehicles
              </Typography>
      </Card>
      <div className="flex mt-4">
        <div>
          <p className="text-xl ml-8 mb-4">Elevation vs. Time Today</p>
          <LineChart width={500} height={300} data={elevationData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
        <div>
          <p className="text-xl ml-8 mb-4">Battery Temperature vs. Time Today</p>
          <LineChart width={500} height={300} data={batteryTempData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
      </div>
      <div className="flex mt-4">
        <div>
          <p className="text-xl ml-8 mb-4">State of Charge vs. Time Today</p>
          <LineChart width={500} height={300} data={stateOfChargeData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
        <div>
          <p className="text-xl ml-8 mb-4">Spped vs. Time Today</p>
          <LineChart width={500} height={300} data={speedData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
      </div>
    </div>
  );
};
