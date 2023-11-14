import React, { useEffect } from 'react';
import { Button, Input, Typography, Card, Dialog } from '@material-tailwind/react';
import { DefaultTable } from '../utils/Table';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GeocodingCoords, Station, StationForm } from '../../../../types/StationTypes';
import { fromAddress } from '../../../../services/GeoCodingService';
import { createStation, getStationList, deleteStation, editStation } from '../../../../services/StationService';
import { ConfirmationMessage } from '../utils/ConfirmMessage';

interface AddStation {
    station: Station | null;
    addOpen: boolean;
    handleAddOpen: () => void;
    setReloadTable: (reloadTable: boolean) => void;
}

export const AddStations = ({ station, addOpen, handleAddOpen, setReloadTable }: AddStation) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
        setValue
    } = useForm<StationForm>();
    useEffect(() => {
        if (station) {
            setValue("name", station.name);
            setValue("address", station.address);
        }else{
            setValue("name", "");
            setValue("address", "");
        }
    }, [station]);
    const addStation = async (data: StationForm, response: GeocodingCoords) => {
        try {
            const name = data.name;
            const latitude = response.lat;
            const longitude = response.lng;
            const address = data.address;
            if (station === null) {
                await createStation({
                    name,
                    latitude,
                    longitude,
                    address
                });
            } else {
                await editStation(
                    station.id,
                    {
                        name,
                        latitude,
                        longitude,
                        address,
                    }
                );
            }
            reset();
            setReloadTable(true);
            handleAddOpen();
        } catch (error: any) {
            const data = error.response.data as StationForm;
            setError('name', {
                type: 'api',
                message: data.name
            });
        }
    }
    const submitStation: SubmitHandler<StationForm> = async (data: StationForm) => {
        try {
            const response = await fromAddress(data.address);
            addStation(data, response);
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <Dialog
            size="xs"
            open={addOpen}
            handler={() => {
                handleAddOpen;
            }}
            className="bg-transparent shadow-none"
        >
            <div className="flex flex-col justify-center items-center space-x-3">
                <Card shadow={true} className="text-gray-600 shadow-lg p-4 mx-auto mr-8">
                    <form
                        onSubmit={handleSubmit(submitStation)}
                        className="space-y-3"
                    >
                        <div className="flex flex-col space-y-2">
                            <Input crossOrigin={undefined}
                                label="Name"
                                {...register('name', {
                                    required: 'Name is required'
                                })}
                                className="w-full"
                                defaultValue={station?.name}
                            ></Input>
                            {errors.name && (
                                <Typography variant="small" color="red">
                                    {errors.name?.message}
                                </Typography>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Input crossOrigin={undefined}
                                label="Address"
                                {...register('address', {
                                    required: 'Address is required'
                                })}
                                className="w-full"
                                defaultValue={station?.address}
                            ></Input>
                            {errors.address && (
                                <Typography variant="small" color="red">
                                    {errors.address?.message}
                                </Typography>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={handleAddOpen}
                            >
                                Back
                            </Button>
                            <Button type="submit" variant="gradient" color="cyan">
                                Add Station
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Dialog>
    )
}
