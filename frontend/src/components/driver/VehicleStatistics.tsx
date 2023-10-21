import React from 'react';
import {Tabs,TabsHeader,TabsBody,Tab,TabPanel,Card,Typography,Timeline,TimelineItem,TimelineConnector,TimelineIcon,TimelineBody,Button} from '@material-tailwind/react';
import { FiTruck, FiBatteryCharging } from 'react-icons/fi';
import { LiaTemperatureHighSolid } from 'react-icons/lia';
import { FaTrafficLight } from 'react-icons/fa';
import { AiOutlineCaretRight } from 'react-icons/ai';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import fondo2 from '../../img/fondoRecomendacionesBateria1.svg';
import test from '../../img/gifCarro.gif';
import { Link } from 'react-router-dom';
import LogoEco from './LogoEco';

const VehicleStatistics = () => {
  
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <div className="p-5 space-y-4 lg:space-y-0">
        <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left p-4 ">

          <Link to="/">
            <Button variant="gradient" color="gray" size="lg" className="rounded-full ml-4">
              Back
            </Button>
          </Link>
          <LogoEco />
        </div>

        <div className="flex flex-col justify-center pt-10 items-center ">
          <div className="flex flex-col items-center space-y-8 w-full max-w-screen-lg">
            <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-3 ">
              <Typography variant="h4" color="gray" className="mt-1 font-bold text-center">
              Analysis of energy consumption and routes taken by your vehicle
              </Typography>
            </Card>
            <div >
              <h1>aqui va gráficas</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehicleStatistics;