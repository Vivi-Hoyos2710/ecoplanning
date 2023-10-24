import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Button, Typography,Select, Option } from '@material-tailwind/react';
import { FiBatteryCharging, FiMapPin } from 'react-icons/fi';
import { HiMapPin } from 'react-icons/hi2';
import { FaPercent } from 'react-icons/fa';
import LogoEco from './LogoEco';

type SearchProps = {
    setOrigin: (position: google.maps.LatLngLiteral) => void;
    setDestination: (position: google.maps.LatLngLiteral) => void;
    getRoute: () => void;
  };
export default function SearchForm({ setOrigin ,setDestination, getRoute}: SearchProps){
    return (
        <div className="w-full lg:w-1/4 lg:mr-4 space-y-4">
            <LogoEco />

            <Card className="shadow-lg w-full rounded-t-lg p-5 ">
            <form className="space-y-4">
            <div className="flex items-center space-x-2">

                    <Select label="My cars">
                        <Option
                          value="hola">

                        </Option>

                    </Select>

              </div>

              <div className="flex items-center space-x-2">
                <FiMapPin />
                {/* <Input label="Starting address" className="bg-white flex-grow" /> */}
              </div>
              <div className="flex items-center space-x-2">
                <HiMapPin />
                 placeholder="Destination Address"
                 />
              </div>
              <div className="flex items-center space-x-2">
                <FiBatteryCharging />
                <Input label="Current battery" className="bg-white flex-grow" />
                <FaPercent />
              </div>
              <div className="flex flex-col items-center justify-center">
              <Button onClick={getRoute}  className="z-10  rounded-full" variant="gradient" color="cyan">
                Calculate Route
              </Button>
              </div>
              </form>
            </Card>
          </div>
    )
}
