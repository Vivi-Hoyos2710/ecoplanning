import React from 'react';
import { useState } from 'react';
import { Dashboard } from './views/Dashboard';
import { Stations } from './views/Stations';
import { IndexCars } from './views/BrandModel/IndexCars';
import { AdminCars } from './views/AdminCars/AdminCars';
import LogoEco from '../driver/LogoEco';
import { AiFillHome, AiFillCar} from 'react-icons/ai';
import { FaChargingStation} from 'react-icons/fa';
import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';

export const AdminHome = () => {
  const [view, setView] = useState('dashboard');
  const changeView = (newView: string) => {
    setView(newView);
  };
  return (
    <div className="flex h-screen">
      <DefaultSidebar changeView={changeView} />
      <div className="w-full">
        {view === 'dashboard' && <Dashboard />}
        {view === 'stations' && <Stations />}
        {view === 'cars' && <IndexCars />}
        {view === 'adminCars' && <AdminCars/>}
      </div>
    </div>
  );
};

const DefaultSidebar = ({ changeView }: { changeView: (newView: string) => void }) => {
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-blue-500 shadow-xl rounded-tl-lg rounded-br-lg p-4">
      <div className="p-2">
        <LogoEco/>
        <Typography className="text-gray-500 mt-3 font-bold text-center">
          Admin Panel
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => changeView('dashboard')}>
          <div className=" flex space-x-2 text-gray-600 ">
          <AiFillHome/>
          <ListItemPrefix>
          Dashboard
          </ListItemPrefix>
          </div>
        </ListItem>
        <ListItem onClick={() => changeView('stations')}>
        <div className="flex  space-x-2 text-gray-600">
        <FaChargingStation/>
          <ListItemPrefix >
          Stations
          </ListItemPrefix>
          </div>
        </ListItem>
        <ListItem onClick={() => changeView('cars')}>
        <div className=" flex  space-x-2 text-gray-600">
        <AiFillCar/>
          <ListItemPrefix>
          Brands and models
          </ListItemPrefix>
          </div>
        </ListItem>
        <ListItem onClick={() => changeView('adminCars')}>
        <div className=" flex  space-x-2 text-gray-600">
        <AiFillCar/>
          <ListItemPrefix>
          My cars
          </ListItemPrefix>
          </div>
        </ListItem>
      </List>
    </Card>
  );
};
