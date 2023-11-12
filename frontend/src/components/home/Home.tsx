import React from 'react';
import fondo1 from '../../img/fondoLogin.svg';
import burbuja from '../../img/burbuja.svg';
import carro from '../../img/logoCarro.svg';
import { Link } from 'react-router-dom';
import { Typography, Card, Button } from '@material-tailwind/react';
import { NavbarDefault } from './Navbar';
import { useState } from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div
        className="bg-cover bg-center bg-no-repeat w-screen h-screen md:h-auto md:min-h-screen absolute p-3 home-background"
        style={{ backgroundImage: `url(${fondo1})` }}
      >
        <Section1 />
      </div>
    </div>
  );
};
export default Home;

const Section1 = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <NavbarDefault />

      <div className="flex justify-center items-center mt-10">
        <div className="relative w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/2 ">
        <Link to="/signin">
          <div
            className={`relative transition-transform transform ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={burbuja} alt="Imagen" className="w-full h-auto" />

            <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-5/6">
              <img className="w-24 md:w-32 lg:w-30 xl:w-40 "
                  src={carro}
                  alt="carro"/>
                  <div>
              <Typography
                variant="h2"
                textGradient
                className="text-white text-center mb-2 mt-2 text-2xl sm:text-xs md:text-2xl lg:text-3xl xl:text-4xl"
                style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)' }}>
                Say goodbye to distance anxiety and embrace a new era of stress-free electric
                driving 
              </Typography>
              <Typography

                variant='small'
                color="gray"
                className="text-base sm:text-xs md:text-lg lg:text-md xl:text-xl text-center mb-2"
              >
                You can travel and at the same time conserve your vehicle&apos;s electric battery,
                save costs and help the planet.
              </Typography>
              </div>
              <div className="flex flex-col items-center justify-center mt-2">
                <Link to="/signin">
                  <Button type="submit" variant="gradient" color="cyan" className="rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </Link>
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
