import React from 'react';
import { useState } from 'react';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import fondo1 from '../../img/fondoSignUp.svg';
import fondo2 from '../../img/fondoHojitas.svg';
import DefaultStepper from './Stepper';

const SignIn = () => {

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo2}), url(${fondo1})`, margin: '0', padding: '0' }}
    >
       <div className="flex justify-center items-center min-h-screen p-5 md:p-0 ">
      <DefaultStepper/>
      </div>
    </div>
  );
};


export default SignIn;
