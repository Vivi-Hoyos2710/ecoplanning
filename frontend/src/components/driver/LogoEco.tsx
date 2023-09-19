import React from 'react';
import {Card} from "@material-tailwind/react";
import logo from '../../img/logo.svg';

const LogoEco = () => {

  return (
    <div>
      <Card  className="flex items-center justify-center shadow-lg w-full rounded-t-lg p-1">
    <img
                           width="160" height="100"
                            src={logo}
                            alt='logo'

                        />
    </Card>
    </div>
  );
};


export default LogoEco ;
