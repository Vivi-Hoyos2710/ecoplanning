import React from 'react';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Select, Option, List, ListItem } from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { ReportForm } from '../../types/ReportType';
import { getStationList } from '../../services/StationService';
import { Station } from '../../types/StationTypes';
interface ReportStationInterface {
    handleOpen: () => void;
    open: boolean;
}
export const ReportStation = ({ handleOpen, open }: ReportStationInterface) => {
    const [stationInput, setStationInput] = useState<string | undefined>();
    const [suggestions, setSuggestions] = useState<Station[]>([]);
    const [stationId,setSattionId]=useState<number | undefined>();
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors }
    } = useForm<ReportForm>();
    const [dataError, setDataError] = useState<string>('');
    const fetchSuggestions = async (inputValue: string) => {
        try {
            const response = await getStationList([{ name: 'search', value: inputValue }]);
            setSuggestions(response);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    useEffect(() => {
        if (stationInput) {
            fetchSuggestions(stationInput);
        } else {
            setSuggestions([]);
        }
        if (!open) {
            reset();
            setDataError('');
        } 
    }, [open, stationInput,stationId]);
    const submitBrandForm: SubmitHandler<ReportForm> = (data: ReportForm) => {
        console.log(data);
      
    };
    const handleChange = (inputValue: string) => {
        setStationInput(inputValue);
    };
    const validateStation = (fieldValue: string) => {
        const foundStation = suggestions.find((station:Station) => station.name === fieldValue);
        
        if (foundStation) {
            return true;
        }
        else{
            return false;
        }
    };
    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={() => {
                    handleOpen;
                }}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        className="mb-2 grid h-10 place-items-center bg-blue-gray-500"
                    >
                        <Typography variant="h4" color="white">
                            Report Station
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-6 items-end">
                        <button onClick={() => handleOpen()} className="w-auto">
                            <AiFillCloseCircle size={30} />
                        </button>
                        <form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
                            <Input crossOrigin={undefined}
                                type="text"
                                label="station"
                                size="lg"
                                {...register('station', {
                                    required: 'You must enter the station',
                                    validate: (fieldValue) => {return (validateStation(fieldValue)||"Station not found")},
                                  })}
                                onChange={(e) => handleChange(e.target.value)}
                                value={stationInput}
                                error={errors.station !== undefined}
                            />
                            <div className="autocomplete-dropdown-container">
                                <Card className="w-auto">
                                <List>
                                    {suggestions.map((suggestion, index) => (
                                        <ListItem
                                            key={index}
                                            onClick={() => {
                                                setStationInput(suggestion.name);
                                                setValue('station',suggestion.name);
                                                setSattionId(suggestion.id);
                                            }}
                                            style={{ padding: '5px' }}
                                        >
                                            {suggestion.name}
                                        </ListItem>
                                    ))}
                                    </List>
                                </Card>
                            </div>
                            {errors.station && (
                                <Typography variant="small" color="red">
                                    {errors.station?.message}
                                </Typography>
                            )}
                            {dataError !== '' && (
                                <Typography variant="small" color="red">
                                    {dataError}
                                </Typography>
                            )}

                            <Input crossOrigin={undefined}
                                type="text"
                                label="description"
                                size="lg"
                                {...register('description', {
                                    required: 'You must enter the description'
                                })}
                                error={errors.description !== undefined}
                            />
                            {errors.description && (
                                <Typography variant="small" color="red">
                                    {errors.description?.message}
                                </Typography>
                            )}

                            <CardFooter className="pt-0 flex justify-center mt-5">
                                <Button type="submit" variant="gradient">
                                    Report
                                </Button>
                            </CardFooter>
                        </form>
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
};
