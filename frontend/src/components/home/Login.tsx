import React from 'react';
import { useState } from "react";
import {getLoginToken} from "../../services/AuthService";
import { useForm,SubmitHandler } from "react-hook-form";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import fondo1 from '../../img/fondoLogin.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { LoginFormData } from '../../types/AuthTypes';

const Login = () => {
  const {register,handleSubmit,formState: { errors },}=useForm<LoginFormData>();
  const submitFun:SubmitHandler<LoginFormData>=(data)=> {
    const logIn=async()=>{
      await getLoginToken(data);
    };
    logIn();  }


  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: `url(${fondo2}), url(${fondo1})`, margin: '0', padding: '0' }}>
    <div className="flex justify-center items-center min-h-screen m-5">
    <div className="flex flex-col items-center space-y-4 w-full sm:max-w-md mt-2">
      <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4">
        <Typography variant="h4" color="gray" className="text-center">
          Bienvenido de vuelta
        </Typography>
      </Card>
      <div className="w-full">
        <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-4">
          <Typography color="gray" className="mt-1 font-normal">
            Registra tus datos para iniciar sesión
          </Typography>
          <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4" >
            <Input type="email"  {...register("email",{ required: 'Email is needed' })}/>
            <Input type="password" {...register("password")}/>
            <Button type="submit">Login</Button>

          </form>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </Card>
      </div>
    </div>

  </div>
  </div>
);
};


export default Login;
