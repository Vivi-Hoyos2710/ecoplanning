import React, { useState, useEffect, useContext, } from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Button, Typography, Select, Option } from '@material-tailwind/react';
import { FiBatteryCharging, FiMapPin } from 'react-icons/fi';
import { HiMapPin } from 'react-icons/hi2';
import { FaPercent } from 'react-icons/fa';
import LogoEco from './LogoEco';
import Places from './Places';
import { UserMenu } from './utils/UserMenu';
import { UserContext } from '../../types/UserTypes';

type SearchProps = {
  setOrigin: (position: google.maps.LatLngLiteral) => void;
  setDestination: (position: google.maps.LatLngLiteral) => void;
  getRoute: () => void;
};
export default function SearchForm({ setOrigin, setDestination, getRoute }: SearchProps) {
  const [contenidoMobil, setContenidoMobil] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);

  const [width, setWidth] = useState<number>(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      console.log("width", width )
      if (width <= 800) {
        setIsVisible(false);
        setContenidoMobil(true);
      }
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }

}, []);

  const handleGetRoute = ()=>{
    setIsVisible(false);
    getRoute();
  }

  return (
    <div className="w-full lg:w-1/4 lg:mr-4 space-y-4">
      <LogoEco isSearchForm={true} setIsVisible={setIsVisible} isVisible={isVisible} contenidoMobil={contenidoMobil}/>

      {isVisible && (
        <Card className="shadow-lg w-full rounded-t-lg p-4 ">
          <form className="space-y-4">
            <div className="flex items-center space-x-2">

              <Select label="My cars">
                <Option
                  value="hola" color='black'>
                </Option>
              </Select>

            </div>

            <div className="flex items-center space-x-2">
              <FiMapPin />
              <div className="bg-white flex-grow">
                <Places setInputPlace={setOrigin} label="Search Origin" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <HiMapPin />
              <div className="bg-white flex-grow">
                <Places setInputPlace={setDestination} label="Search Destination" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FiBatteryCharging />
              <Input crossOrigin={undefined} label="Current battery" className="bg-white flex-grow" />
              <FaPercent />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button onClick={handleGetRoute} className="z-6 text-sm rounded-full"  size="sm" variant="gradient" color="cyan">
                Calculate Route
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}
