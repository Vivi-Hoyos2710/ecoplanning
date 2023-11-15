import React from 'react';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input,List, ListItem } from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { ReportForm, SendReport } from '../../types/ReportType';
import { getStationList } from '../../services/StationService';
import { Station } from '../../types/StationTypes';
import { FaFaceSmileBeam } from "react-icons/fa6";
import { createReport } from '../../services/ReportService';
interface ReportStationInterface {
    handleOpen: () => void;
    open: boolean;
}
export const ReportStation = ({ handleOpen, open }: ReportStationInterface) => {
    const [stationInput, setStationInput] = useState<string | undefined>();
    const [suggestions, setSuggestions] = useState<Station[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<ReportForm>();
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
            setIsSubmitted(false);
            reset();
        }
    }, [open, stationInput]);
    const submitBrandForm: SubmitHandler<ReportForm> = (data: ReportForm) => {
        const foundStation = suggestions.find((station: Station) => station.name === data.station);
        if (foundStation && foundStation.id) {
            const reportPost: SendReport =
            {
                station: foundStation.id,
                description: data.description,
            };
            const createStationReport = async () => {
                try {
                    createReport(reportPost);
                    setIsSubmitted(true);
                } catch (error) {
                    console.error('Error sending report:', error);
                }

            }
            createStationReport();
        }

    };
    const handleChange = (inputValue: string) => {
        setStationInput(inputValue);
    };
    const validateStation = (fieldValue: string) => {
        const isFound = suggestions.some((station: Station) => station.name === fieldValue);
        return isFound;
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
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center">
                                <Typography variant="h4" color="gray">
                                    Success! Your message has been submitted.
                                </Typography>
                                <FaFaceSmileBeam className="h-10 w-10" color="yellow"/>
                            </div>
                        ) : (<form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
                            <Input crossOrigin={undefined}
                                type="text"
                                label="station"
                                size="lg"
                                {...register('station', {
                                    required: 'You must enter the station',
                                    validate: (fieldValue) => { return (validateStation(fieldValue) || "Station not found") },
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
                                                    setValue('station', suggestion.name);
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
                        </form>)}

                    </CardBody>
                </Card>
            </Dialog >
        </>
    );
};
