import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Avatar, Typography, Select, Option } from '@material-tailwind/react';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import messageSuccess from '../../img/successfully.gif'
import { UserMenu } from './utils/UserMenu';
import { Link } from 'react-router-dom';
import { getCarList } from '../../services/CarService';
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
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  useEffect(() => {
    const getUserCars = async () => {
      try {
        const cars = await getCarList([{ name: 'user', value: user.id.toString() }]);
        setCars(cars);

      } catch (error) {
        console.log(error);
      }

    };
    if (isUpdating || isCreating || isDeleting) {
      setModeForm("");
    }
    getUserCars();
  }, [modeForm, carId, isUpdating, isCreating, isDeleting]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <div className="p-5 space-y-4 lg:space-y-0">
        <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left p-4 ">


<Link to="/">
  <Button variant="gradient" color="gray" size="lg" className="rounded-full ml-4">
    Back
  </Button>
</Link>


          <div className="flex flex-col space-y-3">
  <div className="max-w-2xl mx-auto">
    <Card className="flex items-center justify-center shadow-lg w-full rounded-t-lg p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div>
            <UserMenu userEmail={user.email} />
          </div>
          <div>
            <Typography variant="h5">User</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {user.email}
            </Typography>
          </div>
        </div>
      </div>
      </Card>
      <div className="flex  w-full rounded-t-lg pt-4 text-center">
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            setIsUpdating(false);
            setIsCreating(false);
            setIsDeleting(false);
            setModeForm("create");
            setSelectedCar(null);
          }}

        >
          Add Car
        </Button>
      </div>

  </div>
</div>

        </div>

        <div className="flex flex-col justify-center  items-center ">

          <div className="flex flex-col items-center w-full max-w-screen-lg">
          <div className="w-1/4 self-start pb-5 w-full sm:w-auto">
          <Card className="flex items-center justify-center shadow-lg rounded-t-lg p-4 ">
  <div className="w-full sm:w-auto">
    <Select label="Select a car">
      {cars.map((car: any) => (
        <Option
          value={`${car.brand__name} ${car.model__name}`}
          key={car.id}
          onClick={() => {
            setIsUpdating(false);
            setIsCreating(false);
            setIsDeleting(false);
            setCarId(car.id);
            setModeForm("edit");
            setSelectedCar(car);
          }}
        >
          {`${car.brand__name} ${car.model__name}`}
        </Option>
      ))}
    </Select>
  </div>
</Card>


          </div>

            <Card
              shadow={true}
              className="shadow-lg w-full rounded-t-lg p-5 space-y-4 w-full max-w-xl"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
            >
              {(!isUpdating && !isCreating && !isDeleting) && selectedCar === null && modeForm !== "edit" && modeForm !== "create" && (
    <Typography color="gray" variant="h5" className="mt-1 font-normal text-center">
      Please select a car or create a new one.
    </Typography>
  )}

              <Typography color="gray" variant="h5" className="mt-1 font-normal text-center">
                {modeForm == "edit" && <span>Edit your selected car</span>}
                {modeForm == "create" && <span>Register a new Car</span>}
              </Typography>
              {modeForm == "edit" && <CarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} setIsCreating={setIsCreating} setIsDeleting={setIsDeleting} />}
              {modeForm == "create" && <CarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} setIsCreating={setIsCreating} setIsDeleting={setIsDeleting} />}
              {(isUpdating || isCreating || isDeleting) && (
                <div>
                  <div className="text-center">
                  <Typography variant="h5" color="green" textGradient>
                    {isUpdating ? "Car successfully upgraded" : (isDeleting ? "Car successfully removed" : "Successfully created car")}
                  </Typography>
                  </div>
          <div className="flex  flex-col space-y-2 justify-center items-center">
          <Typography color="gray" variant="h6" className="mt-1 font-normal text-center">
            Please select a car or create a new one.
          </Typography>
          <img width="240" height="240" src={messageSuccess} alt="ImgCar" />
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
