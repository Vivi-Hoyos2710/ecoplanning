import React, { useState, useEffect, useContext, } from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Button, Typography, Select, Option } from '@material-tailwind/react';
import { FiBatteryCharging, FiMapPin } from 'react-icons/fi';
import { HiMapPin } from 'react-icons/hi2';
import { FaPercent } from 'react-icons/fa';
import LogoEco from './LogoEco';
import Places from './Places';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Car, CarInfo, DriverFormData } from '../../types/CarTypes';
import { getCarList } from '../../services/CarService';
import { UserContext } from '../../types/UserTypes';
import { UserMenu } from './utils/UserMenu';

type SearchProps = {
  setOrigin: (position: google.maps.LatLngLiteral) => void;
  setDestination: (position: google.maps.LatLngLiteral) => void;
  getRoute: () => void;
  setBatteryPercentage: (percentage: number) => void;
  carModel: string;
  setCarModel: (carModel: string) => void;
  routeErrror: string;
  routeSuccess: string;
};

export default function SearchForm({ setOrigin, setDestination, getRoute, setBatteryPercentage, carModel, setCarModel, routeErrror, routeSuccess }: SearchProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<DriverFormData>();
  const [contenidoMobil, setContenidoMobil] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [cars, setCars] = useState<CarInfo[]>([]);
  const user = useContext(UserContext);
  useEffect(() => {
    const getUserCars = async () => {
      try {
        const cars = await getCarList([{ name: 'user', value: user.id.toString() }]);
        setCars(cars);
      } catch (error) {
        console.log(error);
      }

    };
    getUserCars();
  }, []);
  const submit: SubmitHandler<any> = (data: any) => {
      console.log(data);
    setBatteryPercentage(parseInt(data.battery));
    getRoute();
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    console.log("width", width)
    if (width <= 800) {
      setIsVisible(false);
      setContenidoMobil(true);
    }
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }

  }, []);

  const handleGetRoute = () => {
    setIsVisible(false);
    getRoute();
  }

  return (
    <div className="w-full lg:w-1/4 lg:mr-4 space-y-4">
      <LogoEco isSearchForm={true} setIsVisible={setIsVisible} isVisible={isVisible} contenidoMobil={contenidoMobil} />

      {isVisible && (
        <Card className="shadow-lg w-full rounded-t-lg p-4 ">
          <div className="flex items-center space-x-2">
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
              <div className="flex items-center space-x-2">


                <Controller
                  name="carModel"
                  control={control}
                  rules={{ required: 'You must enter the car' }}
                  render={({ field, fieldState}) => {
                    if ((fieldState && !field.value && carModel !== "") || (fieldState && field.value !== carModel && carModel === "")) {
                        field.onChange(carModel);
                    }
                    return (
                    <Select label="Select a car" error={errors.carModel !== undefined} value={carModel}>
                      {cars.map((car: any) => (
                        <Option
                          value={`${car.model__name}`}
                          key={car.id}
                          onClick={() => {
                              setCarModel(car.model__name);
                              field.onChange(car.model__name);
                          }}
                        >
                          {`${car.brand__name} ${car.model__name}`}
                        </Option>
                      ))}
                    </Select>
                  )}}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FiMapPin />
                <div className="bg-white flex-grow">
                  <Places
                    setInputPlace={setOrigin}
                    label="Search Origin"
                    formName="origin"
                    register={register}
                    errors={errors} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HiMapPin />
                <div className="bg-white flex-grow">
                  <Places
                    setInputPlace={setDestination}
                    label="Search Destination"
                    formName="destination"
                    register={register}
                    errors={errors} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiBatteryCharging />
                <Input crossOrigin={undefined} type='number' label="Current battery" className="bg-white flex-grow"
                  {...register('battery', {
                    required: 'Required Field'
                  })} />
                {errors.battery && (
                  <Typography variant="small" color="red">
                    {errors.battery?.message}
                  </Typography>
                )}
                <FaPercent />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button type='submit' className="z-10  rounded-full" variant="gradient" color="cyan">
                  Calculate Route
                </Button>
              </div>
              <Typography variant="small" color="red">
                {routeErrror}
              </Typography>
              <Typography variant="small" color="green">
                {routeSuccess}
              </Typography>
            </form>
          </div>
        </Card>
      )}
    </div >
  )
}
