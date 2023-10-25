import moment from 'moment';

import React,{ useState, useEffect } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getOVMSDataFilter } from '../../../services/OVMSService';
import { useParams } from 'react-router';

type DataPoint = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
type DataPointList = DataPoint[] | [];

const today = moment()

export const CarDashboard = () => {

  const {license_plate} = useParams();
  const [startDate, setStartDate] = useState<any>(today.startOf('day'));
  const [endDate, setEndDate] = useState<any>(today.endOf('day'));

  const [elevationData, setElevationData] = useState<DataPointList>([]);
  const [batteryTempData, setBatteryTempData] = useState<DataPointList>([]);
  const [stateOfChargeData, setStateOfChargeData] = useState<DataPointList>([]);
  const [speedData, setSpeedData] = useState<DataPointList>([]);

  useEffect(() => {
    computeChartData();
  }, [startDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setStartDate(moment(e.target.value).startOf('day'));
  }
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEndDate(moment(e.target.value).endOf('day'));
  }


  const computeChartData = async () => {
    console.log(license_plate);
    const rawData = await getOVMSDataFilter([
      {
        name : 'timestamp__gte',
        value : startDate.format('YYYY-MM-DD')
      },
      {
        name : 'timestamp__lte',
        value : endDate.format('YYYY-MM-DDTHH:mm:ss')
      },
      {
        name : 'vehicle_id',
        value : license_plate
      }
    ]);

    const elevationData: DataPoint[] = [];
    const batteryData: DataPoint[] = [];
    const socData: DataPoint[] = [];
    const speedData: DataPoint[] = [];

    rawData.forEach((dataPoint: any) => {
      const formattedTime = moment(dataPoint.timestamp).format('HH:mm');

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
  }

  return (
    <div className="flex flex-col justify-center items-center  p-5 md:p-0">
      <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
              <Typography  variant="h4"color="gray" className="mt-1 font-bold text-center">
              Car {license_plate} Dashboard
              </Typography>
      </Card>
      <div className="mt-8">
        <p className="text-xl text-center">Filters</p>
        <div className="mt-2 mb-8">
            <label htmlFor="startDate" className="mr-2">Starting Date:</label>
            <input
                type="date"
                id="startDate"
                value={startDate.format('YYYY-MM-DD')}
                onChange={handleStartDateChange}
                className="mr-4"
            />
            <label htmlFor="endDate" className="mr-2">End Date:</label>
            <input
                type="date"
                id="endDate"
                value={startDate.format('YYYY-MM-DD')}
                onChange={handleEndDateChange}
                className="mr-4"
            />

            {/* <label htmlFor="endDate" className="mr-2">Ending Date:</label>
            <input type="date" id="endDate" /> */}
        </div>
      </div>
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
          <p className="text-xl ml-8 mb-4">Speed vs. Time Today</p>
          <LineChart width={500} height={300} data={speedData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </div>
      </div>
    </div>
  )
};
