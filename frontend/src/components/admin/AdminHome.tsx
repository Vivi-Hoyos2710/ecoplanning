import React from 'react';
import { useState } from 'react';
import { Dashboard } from "./views/Dashboard";
import { Stations } from "./views/Stations";
import { Cars } from "./views/Cars";


import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";


export const AdminHome = () => {
  const [view, setView] = useState('dashboard');
  const changeView = (newView: string) => {
    setView(newView);
  }
  return (
    <div className="flex ">
      <DefaultSidebar
        changeView={changeView}
      />
      <div className="bg-blue-900 w-full">
        {
          view === 'dashboard' &&
          <Dashboard />
        }
         {
          view === 'stations' &&
          <Stations />
        }
        {
          view === 'cars' &&
          <Cars/>
        }
      </div>
    </div>
  );
};




const DefaultSidebar = ({ changeView }: {
  changeView: (newView: string) => void
}) => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => changeView('dashboard')}>
          <ListItemPrefix>
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => changeView('stations')}>
          <ListItemPrefix>
          </ListItemPrefix>
          Stations
        </ListItem>
        <ListItem onClick={() => changeView('cars')}>
          <ListItemPrefix>
          </ListItemPrefix>
          Cars
        </ListItem>
      </List>
    </Card>
  );
}