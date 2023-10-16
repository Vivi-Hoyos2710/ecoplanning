import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Button, Typography, Select, Option } from '@material-tailwind/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FiBatteryCharging, FiMapPin } from 'react-icons/fi';
import { HiMapPin } from 'react-icons/hi2';
import { FaPercent } from 'react-icons/fa';
import { GiBatteryPack } from 'react-icons/gi';
import Places from './Places';
import {
  BsExclamationCircleFill,
  BsFillBarChartLineFill,
  BsGearWideConnected
} from 'react-icons/bs';
import LogoEco from './LogoEco';
import { useState } from 'react';

import Map from './Map';

import {
  DirectionsRenderer,
  DirectionsService,
  useGoogleMap
} from '@react-google-maps/api';

type LatlngLiteral = google.maps.LatLngLiteral;
type DirectionResult = google.maps.DirectionsResult;

const MapView = () => {
  const [origin, setOrigin] = useState<LatlngLiteral>({   lat: 6.1870354, lng:-75.56875661587414});
  const [destination, setDestination] = useState<LatlngLiteral>({ lat: 6.203440, lng: -75.556541 });
  const [directions, setDirections] = useState<DirectionResult|null>();

  useEffect(() => {
    if (directions) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      // directionsRenderer.setMap(map); // Replace 'yourMap' with your map object
      directionsRenderer.setDirections(directions);
    }
  }, [directions]);

  const getRoute = ()=>
  {
    if(!origin) return;

    console.log(origin), console.log(destination)
    console.log("running");
    const service  = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode : google.maps.TravelMode.DRIVING,
      },
      (result,status) => {
        console.log(result)
        console.log(status)
        if(status == google.maps.DirectionsStatus.OK && result){
          console.log(result)
          setDirections(result);
        }
      }
    )
  }
  return (
    <div className="">
      <Map>
          {directions && (
          <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions:{
              zIndex:50,
              strokeColor : "#1976D2",
              strokeWeight : 5
            },

          }}/>)
          }

        <div className="flex flex-col lg:flex-row p-5 justify-between">
          <div className="w-full lg:w-1/4 lg:mr-4 space-y-4">
            <div>
              <LogoEco />
            </div>

            <Card className="shadow-lg w-full rounded-t-lg p-5 ">
              <form className="space-y-4">
                <div className="flex items-center space-x-2">

                  <Select  label="Select a car">
                    {myCars.map((car: any) => (
                      <Option
                        value={`${car.brand__name} ${car.model__name}`}
                        key={car.id}
                      >
                        {`${car.brand__name} ${car.model__name}`}
                      </Option>
                    ))}
                  </Select>

                </div>

                    </Select>

              </div>

              <div className="flex items-center space-x-2">
                <FiMapPin />
                <Places
                setPlace={(position) => {
                  setOrigin(position);
                }}
                 placeholder="Starting Address"
                 />
                {/* <Input label="Starting address" className="bg-white flex-grow" /> */}
              </div>
              <div className="flex items-center space-x-2">
                <HiMapPin />
                <Places
                setPlace={(position) => {
                  setDestination(position);
                }}
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
          <div className="w-full lg:w-1/12 lg:ml-4 mt-4 lg:mt-0">
            <Card className=" shadow-lg w-full rounded-t-lg p-5 ">
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-center items-center pb-3">
                    <UserMenu userEmail={user.email} />

                  </div>
                  <Link to="/statistics">
                  <Button className="rounded-full" variant="gradient" color="blue">
                    <BsFillBarChartLineFill style={{ fontSize: '30px' }} />
                  </Button>
                  </Link>
                  <Typography color="gray" className="font-bold text-center text-xs">
                    Vehicle Statistics
                  </Typography>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link to="/bct">
                    <Button className="rounded-full text-lg" variant="gradient" color="green">
                      <GiBatteryPack style={{ fontSize: '30px' }} />
                    </Button>
                  </Link>
                  <Typography color="gray" className="font-bold text-center text-xs">
                    Battery care tips
                  </Typography>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button className="rounded-full text-lg" variant="gradient" color="red">
                    <BsExclamationCircleFill style={{ fontSize: '30px' }} />
                  </Button>
                  <Typography color="gray" className="font-bold text-center text-xs">
                    Report station
                  </Typography>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link to="/settings">
                    <Button className="rounded-full text-lg" variant="gradient">
                      <BsGearWideConnected style={{ fontSize: '30px' }} />
                    </Button>
                  </Link>
                  <Typography color="gray" className="font-bold text-center text-xs">
                  Vehicle Settings
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Map>
    </div>
  );
};
export default MapView;
