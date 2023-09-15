import React from 'react';
import { useState, useEffect } from 'react';
import { createUser, validateUser } from '../../services/UserService';
import { createCar } from '../../services/CarService';
import { UserInfo } from '../../types/UserTypes';
import { Brand } from '../../types/BrandTypes';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Card, Input, Typography, Select, Option, Spinner } from '@material-tailwind/react';
import { SignInFormData } from '../../types/AuthTypes';
import { Car } from '../../types/CarTypes';
import { Model } from '../../types/ModelTypes';
import { getBrandList } from '../../services/BrandService';
import { Link } from "react-router-dom";
import { getLoginToken } from '../../services/AuthService';

interface StepperProps {
    stepIndex: number,
    checkValid: any //buscar type de una function

}
//Fill model options untils there is a service related to it
const modelsFiller = [
    {
        id: 1,
        name: "model1"
    },
    {
        id: 2,
        name: "model2"
    },
    {
        id: 3,
        name: "model3"
    }
];
//---------
const StepperForm = ({ stepIndex, checkValid }: StepperProps) => {
    const [errorUser, setErrorUser] = useState<string>('');
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [brandId, setBrandId] = useState<number>(0);
    const [modelId, setModelId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {

        const getBrands = async () => {
            const brands = await getBrandList();
            setBrands(brands);
            setModels(modelsFiller);
        }
        getBrands();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control, reset,
    } = useForm<SignInFormData>();

    const submitFun: SubmitHandler<SignInFormData> = (data: SignInFormData) => {

        if (stepIndex === 0) {
            const validate = async () => {
                try {
                    const user = await validateUser(data);
                    checkValid(true);
                } catch (error: any) {

                    console.log(error);
                    setErrorUser(error.response.data.email);
                }
            };
            validate();
        }
        if (stepIndex === 1) {
            console.log();
            const userInfo: UserInfo = {
                email: data.email,
                password: data.password,
                name: data.name,
            };
            const signIn = async () => {
                try {
                    setLoading(true);
                    const user = await createUser(userInfo);
                    const userCar: Car = {
                        user: user.id,
                        brand: brandId,
                        brand__name: data.brand,
                        license_plate: data.regisPlate,
                        model: modelId,
                    };
                    console.log(userCar);
                    const car = await createCar(userCar);
                    await getLoginToken(data);
                    setLoading(false);
                    checkValid(true);
                } catch (error: any) {
                    console.log(error.response.data);

                }
            };
            signIn();
        }
        
    }
    return (
        <div className="w-full ">
            {(stepIndex === 0) && (
                <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 " style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} >
                    <Typography color="gray" className="mt-1 font-normal text-center" >
                        Registra tus datos personales
                    </Typography>
                    <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                        <Input type="text" label="Nombre" {...register('name', {
                            required: 'Debes ingresar tu nombre completo'
                        })} error={errors.name !== undefined} />
                        {errors.name && <Typography variant="small" color="red">{errors.name?.message}</Typography>}

                        <Input type="text" label="Correo" {...register('email', {
                            required: 'Debes ingresar un email', pattern: {
                                value: /^\S+@\S+.\S+$/i,
                                message: 'El email ingresado no es válido',
                            },
                        })} error={errors.email !== undefined} />
                        {errors.email && <Typography variant="small" color="red">{errors.email?.message}</Typography>}
                        {errorUser !== '' && <Typography variant="small" color="red">{errorUser}</Typography>}


                        <Input type="password" label="Contraseña" {...register('password', {
                            required: 'Debes ingresar una contraseña ', pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Mínimo 8 caracteres, una minúscula, una mayúscula, y un dígito',
                            },
                        })} error={errors.password !== undefined} />
                        {errors.password && <Typography variant="small" color="red">{errors.password?.message}</Typography>}

                        <button className="test" type="submit" hidden>hidden</button>
                    </form>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-medium text-gray-900">Login</Link>

                    </Typography>
                </Card>
            )
            }
            {(stepIndex === 1) && (
                <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 " style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} >
                    <Typography color="gray" className="mt-1 font-normal text-center" >
                        Registra los datos de uno de tus vehiculos
                    </Typography>
                    <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                        <Input type="text" label="Placa" {...register('regisPlate', {
                            required: 'Debes ingresar una regisPlate', pattern: {
                                value: /^[A-Z]{3}\d{3}/,
                                message: 'Ingresa una placa válida: ej: ABC123',
                            },
                        })} error={errors.name !== undefined} />
                        {errors.regisPlate && <Typography variant="small" color="red">{errors.regisPlate?.message}
                        </Typography>}
                        <div className="flex justify-center items-center h-full">
                            <div className="flex w-72 flex-col gap-6 flex">

                                <Controller
                                    name="brand"
                                    control={control}
                                    rules={{ required: 'Debes ingresar marca' }}

                                    render={({ field }) => (
                                        <Select
                                            label="Selecciona marca"
                                            error={errors.brand !== undefined}
                                            {...field}
                                        >
                                            {brands.map((brand) => (
                                                <Option value={brand.name} key={brand.id} onClick={() => {
                                                    setBrandId(brand.id);
                                                    field.onChange(brand.name);
                                                }}>
                                                    {brand.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <Controller
                                    name="model"
                                    control={control}
                                    rules={{ required: 'Debes ingresar modelo' }}
                                    render={({ field }) => (
                                        <Select
                                            label="Selecciona modelo"
                                            error={errors.model !== undefined}
                                            {...field}

                                        >
                                            {models.map((model) => (
                                                <Option
                                                    value={model.name}
                                                    key={model.id}
                                                    onClick={() => {
                                                        setModelId(model.id);
                                                        field.onChange(model.name);
                                                    }}
                                                >
                                                    {model.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {loading ? <Spinner color="green" /> : <span />}
                            </div>

                        </div>

                        <button className="test" type="submit" hidden>another test</button>
                    </form>
                </Card>
            )
            }
            {(stepIndex === 2) && (
                <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 " style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} >
                    <Typography variant="h4" color="gray" className="text-center">
                        Bienvenido
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-center" >
                        Comienza a experimentar la verdadera tranquilidad de conducir un coche eléctrico
                    </Typography>
                    <div className="flex justify-center items-center">
                        <img
                            width="200" height="160"
                            src={require('../../img/gifCarro.gif')}
                            alt='ImgCar'

                        />
                    </div>

                </Card>
            )
            }

        </div>
    );
};

export default StepperForm;
