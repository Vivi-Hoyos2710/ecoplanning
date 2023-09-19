import React from 'react';
import { useState } from 'react';
import { getLoginToken } from '../../services/AuthService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Button, Typography, Alert } from '@material-tailwind/react';
import { AiFillInfoCircle } from 'react-icons/ai';
import fondo1 from '../../img/fondoLogin.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { LoginFormData } from '../../types/AuthTypes';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errorsBdd, setErrorsBdd] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();
  const submitFun: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    const logIn = async () => {

      const error = await getLoginToken(data);
      console.log(error);
      if (error) {
          setErrorsBdd(true);
      }else{
        navigate("/");
        window.location.reload();
      }




      setErrorsBdd(true);

    };
    logIn();
  };


  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo2}), url(${fondo1})`, margin: '0', padding: '0' }}
    >

      <div className="flex  justify-center items-center min-h-screen p-5 md:p-0 ">

        <div className="flex flex-col items-center space-y-4 w-full sm:max-w-md mt-2">

          <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4" >
            <Typography variant="h4" color="gray" className="text-center">
            Welcome back
            </Typography>
          </Card>
          <div className="w-full ">
            <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 "  >
              <Typography color="gray" className="mt-1 font-normal text-center" >
              Register your login information
              </Typography>
              <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                <Input type="text" label="E-mail" {...register('email', {
                  required: 'You must enter an email', pattern: {
                    value: /^\S+@\S+.\S+$/i,
                    message: 'The email entered is invalid "someone@example.com" ',
                  },
                })} error={errors.email !== undefined} />
                {errors.email && <Typography variant="small" color="red">{errors.email?.message}</Typography>}

                <Input type="password" label="Password" {...register('password', {
                  required: 'You must enter a password'
                })} error={errors.password !== undefined} />
                {errors.password && <Typography variant="small" color="red">{errors.password?.message}</Typography>}

                <div className="flex flex-col items-center justify-center">
                  <Button type="submit" variant="gradient" color="cyan" className="rounded-full">Start</Button>
                </div>

                {errorsBdd && <Alert variant="gradient">
                  <AiFillInfoCircle /><Typography variant="small">The email or password provided is invalid. Please try again.</Typography>
                </Alert>}
              </form>

              <Typography color="gray" className="mt-4 text-center font-normal">
              Don&apos;t have an account?{' '}
                <Link to="/signin" className="font-medium text-gray-900">Sign up</Link>


              </Typography>
            </Card>
            <div className="text-left mt-4">
        <Link to="/">
            <Button variant="gradient" color="gray" className="rounded-full ml-4">
            Back to Home
            </Button>
          </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
