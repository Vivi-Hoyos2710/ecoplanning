import React, { useState, useEffect } from 'react';
import { Car, CarInfo } from '../../../types/CarTypes';
import { Model } from '../../../types/ModelTypes';
import { Brand } from '../../../types/BrandTypes';
import { Select, Option, Input, Button, Typography } from '@material-tailwind/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { getModelListFilter } from '../../../services/ModelService';
import { getBrandListFilter, getBrandModelList } from '../../../services/BrandService';
import { CarFormInfo } from '../../../types/AuthTypes';
import { createCar, deleteCarById, updateCar } from '../../../services/CarService';
import { ConfirmationModal } from './ConfirmationModal';

interface CarForm {
    mode: string;
    carInfo: CarInfo | null;
    userId: number;
    setIsUpdating: (parameter: boolean) => void;
    setIsCreating: (parameter: boolean) => void;
    setIsDeleting: (parameter: boolean) => void;
}

export const CarForm = ({ mode, carInfo, userId, setIsUpdating,setIsCreating,setIsDeleting }: CarForm) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [brandId, setBrandId] = useState<number>(mode == "edit" && carInfo ? carInfo?.brand : 0);
    const [modelId, setModelId] = useState<number>(mode === "edit" && carInfo ? carInfo?.model : 0);
    const [selectedBrand, setSelectedBrand] = useState(mode == "edit" ? carInfo?.brand__name : "");
    const [selectedModel, setSelectedModel] = useState(mode == "edit" ? carInfo?.model__name : "");
    const [carId, setCarId] = useState(mode == "edit" ? carInfo?.id : null);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        const getBrands = async () => {
            const brands = await getBrandListFilter([{
                name: 'ordering',
                value: 'name'
            }]);
            setBrands(brands);
        };
        getBrands();
        const getModels = async () => {
            try {
                const models = await getModelListFilter([{ name: 'brand', value: brandId.toString() }]);
                setModels(models);
            } catch (error) {
                console.log(error);
            }
        };

        if (carInfo && mode == "edit" && carInfo?.id != carId) {
            reset();
            setValue('brand__name', undefined);
            setSelectedBrand(carInfo?.brand__name);
            setSelectedModel(carInfo?.model__name);
            setBrandId(carInfo?.brand);
            setModelId(carInfo?.model);
            setCarId(carInfo?.id);
        }
        if (mode == "create") {
            console.log(selectedBrand);
        }
        if (brandId !== 0) {
            getModels();
        }
    }, [brandId, carInfo, mode]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        control
    } = useForm<any>();
    const carSubmit: SubmitHandler<any> = (data: any) => {

        const submitCarForm = async () => {
            try {
                const carUser: Car = {
                    user: userId,
                    brand: brandId,
                    brand__name: data.brand__name,
                    license_plate: data.license_plate,
                    model: modelId,
                };
                if (carId != null && mode == "edit") {
                    setIsUpdating(true);
                    await updateCar(carUser, carId);

                }
                if (mode == "create") {
                    setIsCreating(true);
                    await createCar(carUser);
                }
            } catch (error: any) {
                console.log(error);
            }
        };
        submitCarForm();
    };
    const handleDelete: (id: number) => void = async (id) => {
        try {
            await deleteCarById(id);
            setIsDeleting(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOpen = (isConfirmed: boolean): void => {
        if (isConfirmed && carId) {
            handleDelete(carId);
        }
        setOpen(!open);
      };
    return (
        <div>
            <form onSubmit={handleSubmit(carSubmit)} className="mt-4 space-y-4">
                <Input crossOrigin={undefined}
                    type="text"
                    label="Vehicle plate"
                    {...register('license_plate', {
                        required: 'You must enter a vehicle plate',
                        pattern: {
                            value: /^[A-Z]{3}\d{3}/,
                            message: 'Enter a valid vehicle plate "ABC123" '
                        }
                    })}
                    error={errors.license_plate !== undefined}
                    defaultValue={carInfo?.license_plate || ""}
                />
                {errors.license_plate && (
                    <Typography variant="small" color="red">
                        {errors?.license_plate?.message?.toString()}
                    </Typography>
                )}


                <Controller
                    name="brand__name"
                    control={control}
                    rules={{ required: 'You must enter the brand' }}
                    render={({ field, fieldState }) => {
                        if (fieldState && !field.value && selectedBrand != "" || fieldState && field.value !== selectedBrand && selectedBrand != "") {
                            console.log("Cambia");
                            field.onChange(selectedBrand);
                        }
                        return (
                            <Select label="Select a brand" error={errors.brand__name !== undefined} value={selectedBrand}  >
                                {brands.map((brand) => (

                                    <Option
                                        value={brand.name}
                                        key={brand.id}
                                        onClick={() => {
                                            setBrandId(brand.id);
                                            setSelectedBrand(brand.name);
                                            field.onChange(brand.name);
                                            setSelectedModel("");
                                        }}
                                    >
                                        {brand.name}
                                    </Option>
                                ))}
                            </Select>
                        )
                    }}

                />
                <Controller
                    name="model__name"
                    control={control}
                    rules={{ required: 'You must enter the model' }}
                    render={({ field, fieldState }) => {
                        if (fieldState && !field.value && selectedModel != "" || fieldState && field.value !== selectedModel && selectedModel == "") {
                            field.onChange(selectedModel);
                        }
                        return (
                            <Select label="Select a model" error={errors.model__name !== undefined} value={selectedModel}  >
                                {models.map((model) => (

                                    <Option
                                        value={model.name}
                                        key={model.id}
                                        onClick={() => {
                                            setModelId(model.id);
                                            setSelectedModel(model.name);
                                            field.onChange(model.name);
                                        }}
                                    >
                                        {model.name}
                                    </Option>
                                ))}
                            </Select>
                        )
                    }}

                />
                <div className="flex space-x-2">
                {mode == "edit" && <Button variant="outlined" onClick={() => carId && handleOpen(false)}>
                    Delete
                </Button>}

                <Button variant="gradient" color="blue" type="submit">
                    {mode == "edit" ? "Update Car" : "Add New Car"}
                </Button>
                </div>
                <ConfirmationModal handleOpen={handleOpen} open={open} info={"Are you sure do you want to delete this car?"} title={"Warning"}/>

            </form>
        </div>
    );
}
