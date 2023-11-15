import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Avatar, Typography, Select, Option } from '@material-tailwind/react';
import messageSuccess from '../../../../img/successfully.gif'
import { Link } from 'react-router-dom';
import { getCarList } from '../../../../services/CarService';
import { UserContext } from '../../../../types/UserTypes';
import { CarInfo } from '../../../../types/CarTypes';
import { AdminCarForm } from './AdminCarForm';
import { DefaultTable } from '../utils/Table';
import { deleteCarById } from '../../../../services/CarService';
import { ConfirmationMessage } from '../utils/ConfirmMessage';
export const AdminCars = () => {
    const user = useContext(UserContext);
    const [cars, setCars] = useState<CarInfo[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarInfo | null>(null);
    const [carId, setCarId] = useState<number>(0);
    const [modeForm, setModeForm] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        const getUserCars = async () => {
            try {
                const cars = await getCarList([{ name: 'user__is_superuser', value: 'true' }]);
                console.log(cars);
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
    const handleActions: (action: string, dataInfo: any) => void = (action, dataInfo) => {

        if (action === 'EDIT') {
            console.log(dataInfo);
            setIsUpdating(false);
            setIsCreating(false);
            setIsDeleting(false);
            setModeForm("edit");
            setSelectedCar(dataInfo);
        }
        else if (action === 'DELETE') {
            console.log(dataInfo.id);
            setCarId(dataInfo.id);
            handleOpenDeleteMessage(false);
        }

        else if (action === 'LINK'){
            window.location.assign(`/admin_cars/${dataInfo.license_plate}`);
        }

    };
    const handleDelete: (id: number) => void = async (id) => {
        try {
            console.log("in the actual delete");
            await deleteCarById(id);
            setIsDeleting(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOpenDeleteMessage = (isConfirmed: boolean): void => {
        if (isConfirmed && carId) {
            console.log("confirmed and id");
            handleDelete(carId);
        }
        setOpen(!open);
    };
    return (
        <div
        >
            <div className="p-5 space-y-4 lg:space-y-0">
                <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left p-4 ">
                    <div className="flex flex-col space-y-3">
                        <div className="max-w-2xl mx-auto">
                            <Card className="flex items-center justify-center shadow-lg w-full rounded-t-lg p-4">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-2">
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
                        <div className="w-1/4 self-start pb-5">

                        </div>
                        <Card
                            shadow={true}
                            className="shadow-lg w-full rounded-t-lg p-5 space-y-4 w-full max-w-xl"
                            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                        >
                            {(!isUpdating && !isCreating && !isDeleting) && selectedCar === null && modeForm !== "edit" && modeForm !== "create" && (
                                <DefaultTable
                                    header={['Brand', 'Model', 'License Plate', 'Info', 'Edit', 'Delete']}
                                    tableRow={cars}
                                    tableKeys={['brand__name', 'model__name', 'license_plate']}
                                    actions={['LINK', 'EDIT', 'DELETE']}
                                    handleActions={handleActions}
                                />
                            )}

                            <Typography color="gray" variant="h5" className="mt-1 font-normal text-center">
                                {modeForm == "edit" && <span>Edit your selected car</span>}
                                {modeForm == "create" && <span>Register a new Car</span>}
                            </Typography>
                            <ConfirmationMessage handleOpen={handleOpenDeleteMessage} open={open} info={"Are you sure do you want to delete this car?"} title={"Warning"} />

                            {modeForm == "edit" && <AdminCarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} setIsCreating={setIsCreating} />}
                            {modeForm == "create" && <AdminCarForm mode={modeForm} carInfo={selectedCar} userId={user.id} setIsUpdating={setIsUpdating} setIsCreating={setIsCreating} />}
                            {(isUpdating || isCreating || isDeleting) && (
                                <div>
                                    <div className="text-center">
                                        <Typography variant="h5" color="green" textGradient>
                                            {isUpdating ? "Car successfully upgraded" : (isDeleting ? "Car successfully removed" : "Successfully created car")}
                                        </Typography>
                                        <img width="240" height="240" src={messageSuccess} alt="ImgCar" />
                                        <Button
                                            variant="gradient"
                                            color="green"
                                            onClick={() => {
                                                setIsUpdating(false);
                                                setIsCreating(false);
                                                setIsDeleting(false);
                                                setModeForm("");
                                                setSelectedCar(null);
                                            }}

                                        >
                                            Back
                                        </Button>
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
