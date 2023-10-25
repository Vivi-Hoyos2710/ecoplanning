import React from 'react';
import LogoEco from '../driver/LogoEco';
import { AiFillHome, AiFillCar} from 'react-icons/ai';
import { FaChargingStation} from 'react-icons/fa';
import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export const DefaultSidebar = () => {
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-blue-500 shadow-xl rounded-tl-lg rounded-br-lg p-4">
      <div className="p-2">
        <LogoEco/>
        <Typography className="text-gray-500 mt-3 font-bold text-center">
          Admin Panel
        </Typography>
      </div>
      <List>
        <Link to="/">
          <ListItem>
            <div className=" flex space-x-2 text-gray-600 ">
            <AiFillHome/>
            <ListItemPrefix>
            Dashboard
            </ListItemPrefix>
            </div>
          </ListItem>
        </Link>
        <Link to="/stations">
          <ListItem>
          <div className="flex  space-x-2 text-gray-600">
          <FaChargingStation/>
            <ListItemPrefix >
            Stations
            </ListItemPrefix>
            </div>
          </ListItem>
        </Link>
        <Link to="/brand_models">
          <ListItem>
          <div className=" flex  space-x-2 text-gray-600">
          <AiFillCar/>
            <ListItemPrefix>
            Brands and models
            </ListItemPrefix>
            </div>
          </ListItem>
        </Link>
        <Link to="/admin_cars">
          <ListItem>
          <div className=" flex  space-x-2 text-gray-600">
          <AiFillCar/>
            <ListItemPrefix>
            My cars
            </ListItemPrefix>
            </div>
          </ListItem>
        </Link>
      </List>
    </Card>
  );
};
