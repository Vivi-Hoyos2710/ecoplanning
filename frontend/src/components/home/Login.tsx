import React from 'react';
import { useState } from 'react';
import { getLoginToken } from '../../services/AuthService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Input, Checkbox, Button, Typography, Alert } from '@material-tailwind/react';
import { AiFillInfoCircle } from 'react-icons/ai';
import fondo1 from '../../img/fondoLogin.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import { LoginFormData } from '../../types/AuthTypes';

const Login = () => {
  const [errorsBdd, setErrorsBdd] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();
  const submitFun: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    const logIn = async () => {
      const error = await getLoginToken(data);
      if (error.response.status == 400) {
        setErrorsBdd(true);
      }
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
          <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4" >
            <Typography variant="h4" color="gray" className="text-center">
              Bienvenido de vuelta
            </Typography>
          </Card>
          <div className="w-full ">
            <Card shadow={true} className="shadow-lg w-full rounded-t-lg p-8 "  >
              <Typography color="gray" className="mt-1 font-normal text-center" >
                Registra tus datos para iniciar sesión
              </Typography>
              <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                <Input type="text" label="Correo" {...register('email', {
                  required: 'Debes ingresar un email', pattern: {
                    value: /^\S+@\S+.\S+$/i,
                    message: 'El email ingresado no es válido',
                  },
                })} error={errors.email !== undefined} />
                {errors.email && <Typography variant="small" color="red">{errors.email?.message}</Typography>}

                <Input type="password" label="Contraseña" {...register('password', {
                  required: 'Debes ingresar la contraseña'
                })}  error={errors.password !== undefined}/>
                {errors.password && <Typography variant="small" color="red">{errors.password?.message}</Typography>}

                <div className="flex flex-col items-center justify-center">
                  <Button type="submit" variant="gradient" color="cyan" className="rounded-full">Iniciar</Button>
                </div>

                {errorsBdd && <Alert variant="gradient">
                  <AiFillInfoCircle /><Typography variant="small">Credenciales incorrectas: El correo o la contraseña proporcionados no son válidos. Por favor, inténtalo de nuevo.</Typography>
                </Alert>}
              </form>

              <Typography color="gray" className="mt-4 text-center font-normal">
                No tienes cuenta?{' '}
                <a href="#" className="font-medium text-gray-900" >
                  Registrate
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
