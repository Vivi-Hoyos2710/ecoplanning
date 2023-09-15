import React from 'react';
import fondo1 from '../../img/fondoLogin.svg';
import burbuja1 from '../../img/burbuja.svg';
import {Typography,Card } from '@material-tailwind/react';
import { NavbarDefault } from './Navbar';
import { useState } from 'react';


const Home = () => {

  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center bg-no-repeat w-screen absolute p-3"style={{ backgroundImage: `url(${fondo1})` }}>
       <Section1/>
      </div>
    </div>
  );
};
export default Home;

const Section1 = () => {
  const [isHovered, setIsHovered] = useState(false);
    return (
      <div>

        <NavbarDefault/>
        <div className="flex justify-center items-center">
        <div className="relative w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/2 ">
      <img
        src={burbuja1}
        alt="Imagen"
        className={`w-full h-auto transition-transform transform ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
    </div>


        </div>
    );
  };

  const Section2 = () => {
    return (
      <div>
      <h1 className="text-white text-4xl font-bold">hola 2</h1>
      </div>
    );
  };

  const Section3 = () => {
    return (
      <div>
      <h1 className="text-white text-4xl font-bold">hola 3</h1>
      </div>
    );
  };
