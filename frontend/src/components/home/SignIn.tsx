import React from 'react';
import { useState } from 'react';
import { getLoginToken } from '../../services/AuthService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import fondo1 from '../../img/fondoSignUp.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { LoginFormData } from '../../types/AuthTypes';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();
  const submitFun: SubmitHandler<LoginFormData> = (data) => {
    const logIn = async () => {
      await getLoginToken(data);
    };
    logIn();
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo2}), url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <div className="flex justify-center items-center min-h-screen p-5 md:p-0 ">
        <div className="flex flex-col items-center space-y-4 w-full sm:max-w-md mt-2">
          <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}>
            <Typography variant="h4" color="gray" className="text-center">
              Bienvenido de vuelta
            </Typography>
          </Card>
          <div className="w-full ">
            <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 " style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} >
              <Typography color="gray" className="mt-1 font-normal text-center" >
                Registra tus datos para iniciar sesión
              </Typography>
              <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                <Input type="email" label="Correo" {...register('email', { required: 'Email is needed' })} />
                <Input type="password" label="Contraseña" {...register('password')} />
                <div className="flex flex-col items-center justify-center">
                <Button type="submit" variant="gradient" color="cyan" className="rounded-full">Iniciar</Button>
                </div>
              </form>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Ya tienes contraseña?{' '}
                <a href="#" className="font-medium text-gray-900" >
                  Inicia Sesión
                </a>
              </Typography>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
