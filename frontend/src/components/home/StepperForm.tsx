import React from 'react';
import { useState } from 'react';
import { getLoginToken } from '../../services/AuthService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import fondo1 from '../../img/fondoLogin.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { SignInFormData } from '../../types/AuthTypes';

interface StepperProps {
    stepIndex: number,
    checkValid: any //buscar type de una function
}


const StepperForm = ({ stepIndex, checkValid }: StepperProps) => {
    const [formData, setFormData] = useState<SignInFormData>();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInFormData>();

    const submitFun: SubmitHandler<SignInFormData> = (data: SignInFormData) => {
        checkValid(true);
        console.log(data);
    };

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
                        <Input type="text" label="Contraseña" />
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
                            required: 'Debes ingresar una regisPlate'
                        })} error={errors.name !== undefined} />
                        {errors.regisPlate && <Typography variant="small" color="red">{errors.regisPlate?.message}
                        </Typography>}
                        <Input type="email" label="Modelo" />
                        <Input type="email" label="Marca" />
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
