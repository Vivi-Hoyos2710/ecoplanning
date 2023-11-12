import React, { useContext, useState, useEffect } from 'react';
import { Card , Button, Typography} from '@material-tailwind/react';
import logo from '../../img/logo.svg';
import {
  FaMapLocationDot,
} from 'react-icons/fa6';
import { UserMenu } from './utils/UserMenu';
import { UserContext } from '../../types/UserTypes';
type SearchProps = {
  isSearchForm?: boolean;
  setIsVisible?: any;
  isVisible?: boolean;
  contenidoMobil?:boolean;
};

const LogoEco = ({isSearchForm = false, setIsVisible = undefined, isVisible = false, contenidoMobil= true} : SearchProps) => {
  const user = useContext(UserContext);
    const [open, setOpen] = useState<boolean>(false);


  return (
    <div>
      <Card className="flex flex-row items-center justify-center shadow-lg w-full rounded-t-lg gap-2 p-2">
        <div className="flex justify-center  items-center space-x-4">
      { contenidoMobil && (
          <div className="flex justify-center  items-center  ">
          <UserMenu userEmail={user.email} />
      </div>
        )}
        <img width="150" height="90" src={logo} alt="logo" />
        {isSearchForm && (
          <div className="flex flex-col items-center space-y-2">
          <Button className="rounded-full w-15 text-sm shadow-md p-2 bg-gray-500" size="sm" onClick={() => setIsVisible(!isVisible)}>
            <div className="flex items-center justify-center">
              <FaMapLocationDot style={{ fontSize: '24px'}} />
              <div className="ml-1">
                <Typography className="font-bold text-center text-[0.6rem]">
                  <div className="mb-[-0.5rem]">Search</div>
                  Route
                </Typography>
              </div>
            </div>
          </Button>
        </div>
        )}
       </div>
      </Card>
    </div>
  );
};

export default LogoEco;
