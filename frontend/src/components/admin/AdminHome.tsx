import React from 'react';
import { useState } from 'react';
import { Dashboard } from './views/Dashboard';
import { Stations } from './views/Stations';
import { IndexCars } from './views/Cars/IndexCars';

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
      </div>
    </div>
  );
};

const DefaultSidebar = ({ changeView }: { changeView: (newView: string) => void }) => {
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => changeView('dashboard')}>
          <ListItemPrefix>
          Dashboard
          </ListItemPrefix>
        </ListItem>
        <ListItem onClick={() => changeView('stations')}>
          <ListItemPrefix>
          Stations
          </ListItemPrefix>
        </ListItem>
        <ListItem onClick={() => changeView('cars')}>
          <ListItemPrefix>
          Cars
          </ListItemPrefix>
        </ListItem>
      </List>
    </Card>
  );
};
