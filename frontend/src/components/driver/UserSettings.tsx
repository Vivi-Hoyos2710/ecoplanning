import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Avatar, Typography, Select, Option } from '@material-tailwind/react';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import fondo2 from '../../img/fondoRecomendacionesBateria1.svg';
import messageSuccess from '../../img/updateSuccess.svg'
import { Link } from 'react-router-dom';
import { Filter } from '../../types/ServiceTypes';
import { createCar, getCarList } from '../../services/CarService';
import { UserContext } from '../../types/UserTypes';
import { CarInfo } from '../../types/CarTypes';
import { CarForm } from './utils/InfoCarForm';


const UserSettings = () => {
  const user = useContext(UserContext);
  const [cars, setCars] = useState<CarInfo[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarInfo | null>(null);
  const [carId, setCarId] = useState<number>(0);
  const [modeForm, setModeForm] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  useEffect(() => {
    const getUserCars = async () => {
      try {
        const cars = await getCarList([{ name: 'user', value: user.id.toString() }]);
        setCars(cars);

      } catch (error) {
        console.log(error);
      }
      if (isUpdating) {
        setModeForm("");
        setMessage(true);
      }
    };
    getUserCars();
  }, [modeForm, carId, isUpdating]);
  const iconStyle = {
    width: '300px',
    height: '300px',
    backgroundImage: `url(${messageSuccess})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo2})`, margin: '0', padding: '0' }}
    >
      <div className="p-5 space-y-4 lg:space-y-0">
        <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left p-4 ">
          <Link to="/">
            <Button variant="gradient" color="gray" size="lg" className="rounded-full ml-4">
              Back
            </Button>
          </Link>
          <div>

            <Card className="flex items-center justify-center shadow-lg w-full rounded-t-lg p-3">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Avatar withBorder={true} color="cyan" />
                  <div>
                    <Typography variant="h5">User</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {user.email}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Button variant="gradient" color="green" onClick={() => {
              setMessage(false);
              setModeForm("create")
              setSelectedCar(null);
            }}>
              Add Car
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center pt-10 items-center ">

          <div className="flex flex-col items-center space-y-8 w-full max-w-screen-lg">

            <Select label="Select a car">
              {cars.map((car: any) => (
                <Option
                  value={`${car.brand__name} ${car.model__name}`}
                  key={car.id}
                  onClick={() => {
                    setMessage(false);
                    setCarId(car.id);
                    setModeForm("edit");
                    setSelectedCar(car);
                  }}
                >
                  {`${car.brand__name} ${car.model__name}`}
                </Option>
              ))}
            </Select>
            <Card
              shadow={true}
              className="shadow-lg w-full rounded-t-lg p-8 "
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
            >
              <Typography color="gray" className="mt-1 font-normal text-center">
                {modeForm == "edit" && <span>Edit your selected car</span>}
                {modeForm == "create" && <span>Register a new Car</span>}
              </Typography>
              {modeForm == "edit" && <CarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} />}
              {modeForm == "create" && <CarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} />}
              {message && (
                <div>
                  <Typography variant="h1" color="teal" textGradient>
                    {modeForm == "edit" ? "Updated Car" : "Car Created"}
                  </Typography>
                  <div className="w-1/2">
                    <div className="w-full h-full" style={iconStyle}></div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div >
    </div >
  );
};

export default UserSettings;
