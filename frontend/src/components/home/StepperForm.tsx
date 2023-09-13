import React from 'react';
import { useState } from 'react';
import { createUser } from '../../services/UserService';
import { createCar } from '../../services/CarService';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Card, Input, Checkbox, Button, Typography, Select, Option } from '@material-tailwind/react';
import fondo1 from '../../img/fondoLogin.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { SignInFormData } from '../../types/AuthTypes';

interface StepperProps {
    stepIndex: number,
    setActiveStep: any,
    checkValid: any //buscar type de una function
    
}


const StepperForm = ({ stepIndex, checkValid,setActiveStep }: StepperProps) => {
    const [errorUser, setErrorUser] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        control, reset,
    } = useForm<SignInFormData>();

    const submitFun: SubmitHandler<SignInFormData> = (data: SignInFormData) => {
        const userId=0;
        if (stepIndex === 0) {
            console.log(data);
            const signIn = async () => {
                try {
                    const user= await createUser(data);
                    checkValid(true);

                } catch (error:any) {
                    console.log(error.response.data.email);
                    setErrorUser(error.response.data.email);
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
                    {errorUser!=='' && <Typography variant="small" color="red">{errorUser}</Typography>}


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
                    <a href="#" className="font-medium text-gray-900" >
                        Inicia Sesión
                    </a>
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
                            value: /^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]$|^\d{3}[A-Z]{2}$|^\d{4}[A-Z]{1}$/,
                            message: 'Ingresa una placa válida: ',
                        },
                    })} error={errors.name !== undefined} />
                    {errors.regisPlate && <Typography variant="small" color="red">{errors.regisPlate?.message}
                    </Typography>}
                    <div className="flex w-72 flex-col gap-6">
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
                                    <Option value="brand1">Brand1</Option>
                                    <Option value="Brand2">brand2</Option>
                                    <Option value="Brand3">brand3</Option>
                                    <Option value="Material Tailwind Angular">Brand4</Option>
                                    <Option value="Material Tailwind Svelte">Brand5</Option>
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
                                    <Option value="model1">model1</Option>
                                    <Option value="model2">model2</Option>
                                    <Option value="model3">model3</Option>
                                    <Option value="model4">model4</Option>
                                    <Option value="model5">model5</Option>
                                </Select>
                            )}
                        />
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
