import moment from 'moment';

import React,{ useState, useEffect } from 'react';
import { Card, Typography, Button} from '@material-tailwind/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getOVMSDataFilter,getOVMsDataCSVFilter } from '../../../services/OVMSService';
import { useParams } from 'react-router';
import { OVMSData } from '../../../types/OVMSTypes';
import { DefaultTable } from './utils/Table';

type DataPoint = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
type DataPointList = DataPoint[] | [];

const dataKeys = [
  "operative_state", "latitude", "longitude", "elevation", "slope",
  "speed", "odometer", "batt_temp", "ext_temp", "power_kw",
  "capacity", "vehicle_id", "soc", "soh", "voltage", "current",
  "throttle", "regen_brake", "consumption", "range_est",
  "range_ideal", "range_full", "drivetime", "charge_time", "footbrake",
  "engine_temp", "is_charging", "tpms", "coulomb", "energy",
  "rpm", "charger_type", "coulomb_rec", "drivemode", "energy_rec",
  "mass", "mec_power", "mean_acc", "friction_force", "net_force",
  "run", "mean_speed", "freeram", "net_signal", "tasks",
  "elevation2", "charge_current", "angle_x", "angle_y", "AcX",
  "AcY", "AcZ", "humidity", "kwh_km", "assist_level",
  "pressure", "user_name", "user_id", "acceleration"
];

const today = moment()

export const CarDashboard = () => {
  const {license_plate} = useParams();

  const [rawData, setRawData] = useState<OVMSData[]>([]);
  const [startDate, setStartDate] = useState<any>(today.startOf('day'));
  const [endDate, setEndDate] = useState<any>(today.endOf('day'));

  const filters = [
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
  ]

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setStartDate(moment(e.target.value).startOf('day'));
  }
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEndDate(moment(e.target.value).endOf('day'));
  }

  useEffect(() => {
    getRawData();
  }, [startDate]);

  const getRawData = async () => {
    const rawData = await getOVMSDataFilter(filters);
    setRawData(rawData);
  }

  const handleDownload = async () => {
    await getOVMsDataCSVFilter(filters);
  };

  return (
    <div className="flex flex-col justify-center items-center  p-5 md:p-0">
      <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
              <Typography  variant="h4"color="gray" className="mt-1 font-bold text-center">
              Car {license_plate} Dashboard
              </Typography>
      </Card>
      <div className='flex mt-2 justify-center'>
        <Button
          className="p-4"
          size="sm"
          variant="gradient"
          color="blue-gray"
          onClick={handleDownload}
          >
            Download
        </Button>
      </div>
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
                value={endDate.format('YYYY-MM-DD')}
                onChange={handleEndDateChange}
                className="mr-4"
            />
        </div>
      </div>
      <MainGraphs rawData={rawData} />
      <GraphBuilder rawData={rawData} />
      <Table rawData={rawData} />
    </div>
  )
};

const MainGraphs = ({rawData}:{
  rawData: OVMSData[]
}) => {
  const [elevationData, setElevationData] = useState<DataPointList>([]);
  const [batteryTempData, setBatteryTempData] = useState<DataPointList>([]);
  const [stateOfChargeData, setStateOfChargeData] = useState<DataPointList>([]);
  const [speedData, setSpeedData] = useState<DataPointList>([]);

  useEffect(()=>{
    computeData(rawData);
  },[rawData])

  const computeData = (rawData: OVMSData[]) => {
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
    <div>
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
  );
}

const GraphBuilder = ({rawData}:{
  rawData: OVMSData[]
}) => {
  const [selectedXKey, setSelectedXKey] = useState('speed');
  const [selectedYKey, setSelectedYKey] = useState('power_kw');

  const [graphData, setGraphData] = useState<DataPointList>([]);

  useEffect(()=>{
    computeData(rawData);
  },[rawData, selectedXKey, selectedYKey])

  const computeData = (rawData: OVMSData[]) => {
    const graphDataPoints: DataPoint[] = [];

    rawData.forEach((dataPoint: any) => {
      graphDataPoints.push({
        name: dataPoint[selectedXKey],
        uv: dataPoint[selectedYKey],
        pv: 0,
        amt: 0,
      });
    });

    setGraphData(graphDataPoints);
  }

  return (
  <div className="mt-4">
    <h2 className='text-2xl text-center'>Analyze Data</h2>
    <div className='flex justify-center my-4'>
      <div className='mr-2'>
        <label>X Axis Variable</label>
        <select
          className="block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedXKey}
          onChange={(e) => setSelectedXKey(e.target.value)}
        >
          {dataKeys.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Y Axis Variable</label>
        <select
          className="block w-48 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedYKey}
          onChange={(e) => setSelectedYKey(e.target.value)}
        >
          {dataKeys.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
    </div>
    <LineChart width={500} height={300} data={graphData}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
    </LineChart>
  </div>
  )
}

const Table = ({rawData}:{
  rawData: OVMSData[]
}) => {
  const [tableRowns,setTableRows] = useState<{
    elevation: number;
    batt_temp: number;
    voltage: number;
  }[]>([]);

  useEffect(()=>{
    if(!rawData) return;

    const rows : {
      elevation: number;
      batt_temp: number;
      voltage: number;
    }[] = []

    rawData.forEach((dataPoint: OVMSData,index : number) => {
      if(index > 10) return;
      rows.push({
        elevation: dataPoint.elevation,
        batt_temp: dataPoint.batt_temp,
        voltage: dataPoint.voltage
      })
    })

    setTableRows(rows);
  },[rawData])

  return (
    <div className='mt-8'>
      <h2 className='text-2xl text-cente'>Summary</h2>
      <DefaultTable
        header={['Elevation', 'Battery temp', 'Voltage']}
        tableRow={tableRowns}
        tableKeys={['elevation', 'batt_temp', 'voltage']}
        actions={[]}
        handleActions={(action: string, dataInfo: any) => {console.log('')}}
      />
    </div>
  )
}
