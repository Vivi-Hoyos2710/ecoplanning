import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography
} from '@material-tailwind/react';
import { FiUser, FiTruck, FiBatteryCharging } from 'react-icons/fi';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import test from '../../img/gifCarro.gif';

const BatteryCareTips = () => {
  const data = [
    {
      label: 'Carga',
      value: 'html',
      tittle: `Mantenga siempre la carga entre el 20% y el 80%.`,
      icon: FiBatteryCharging,
      desc: `El propósito es minimizar el estrés en las celdas de la batería y
      sólo cargarla completamente cuando sea necesario en viajes largos.`,
      image: test
    },
    {
      label: 'Temperatura',
      value: 'react',
      tittle: `Reduce la exposición a temperaturas muy altas o bajas`,
      icon: FiBatteryCharging,
      desc: `Es conveniente aparcar a la sombra o en interiores porque las baterías
      funcionan mejor a temperaturas moderadas`,
      image: test
    },
    {
      label: 'Conducción',
      value: 'vue',
      tittle: `Conduce con eficacia`,
      icon: FiBatteryCharging,
      desc: `Evite acelerar y frenar bruscamente y utilice la regeneración de energía siempre que sea posible.`,
      image: test
    },
    {
      label: 'Trayecto',
      value: 'angular',
      tittle: `Realiza un mantenimiento adecuado`,
      icon: FiBatteryCharging,
      desc: `Seguir el programa de mantenimiento recomendado por el fabricante.`,
      image: test
    }
  ];
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <div className="flex flex-col justify-center items-center min-h-screen p-5 md:p-0">
        <div className="flex flex-col items-center space-y-4 w-full max-w-screen-lg">
          <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4 ">
            <Typography color="gray" className="mt-1 font-bold text-center">
              Para conservar la batería de tu coche eléctrico debes seguir estas sugerencias
            </Typography>
          </Card>
          <div className="w-full ">
            <Tabs value="html">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, icon, tittle, desc, image }) => (
                  <TabPanel key={value} value={value}>
                    <div className="flex items-center gap-2">
                      {React.createElement(icon, { className: 'w-8 h-8' })}
                      <Typography className="font-bold">{tittle}</Typography>
                    </div>
                    <Typography>{desc}</Typography>
                    <div className="flex justify-center items-center">
                      <img width="130" height="35" src={image} alt={value} />
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BatteryCareTips;
