import React from "react";
import {Tabs,TabsHeader,TabsBody,Tab,TabPanel,Card,Typography, Timeline,TimelineItem,TimelineConnector,TimelineHeader,TimelineIcon,TimelineBody,} from "@material-tailwind/react";
import { FiUser,FiTruck,FiBatteryCharging} from "react-icons/fi";
import fondo1 from '../../img/FondoRecomendacionesBateria.svg';
import test from '../../img/gifCarro.gif';
import { IconContext } from "react-icons";

const BatteryCareTips = () =>  {
  const data = [
    {
      label: "Carga",
      value: "html",
      tittle:`Mantenga siempre la carga entre el 20% y el 80%.` ,
      icon:FiBatteryCharging,
      icon1:AiOutlineCaretRight,
      desc:`Es recomendable mantenerla con una carga aproximada del 20 al 80%, evitando tanto la descarga completa como la sobrecarga máxima en el momento de la recarga.`,
      desc1:`El objetivo principal de esta práctica es reducir al mínimo el desgaste de las celdas de la batería, reservando la carga completa únicamente para situaciones en las que sea necesario, como en viajes prolongados.`,
      desc2:`Limitar el uso de la carga rápida y favorecer la carga normal es beneficioso, ya que contribuye a una mayor duración de la batería y reduce el desgaste a largo plazo.`,
      image:"https://www.mundodeportivo.com/urbantecno/hero/2022/04/que-se-necesita-para-cargar-coche-electrico-casa.jpg?width=1200&aspect_ratio=16:9"
    },
    {
      label: "Temperatura",
      value: "react",
      tittle:`Reduce la exposición a temperaturas muy altas o bajas` ,
      icon:LiaTemperatureHighSolid,
      icon1:AiOutlineCaretRight,
      desc:`La batería es susceptible a las temperaturas extremas, lo que puede comprometer su durabilidad. Por esta razón, es esencial evitar la exposición prolongada a condiciones climáticas extremas en la medida de lo posible.`,
      desc1:`Se recomienda estacionar el vehículo en áreas sombreadas o bajo techo siempre que sea factible.`,
      desc2:`Es aconsejable no dejar el automóvil al aire libre durante largos períodos cuando las temperaturas sean inferiores a 5°C o superiores a 35°C.`,
      image: test
    },
    {
      label: "Conducción",
      value: "vue",
      tittle:`Conduce con eficacia` ,
      icon:FiTruck,
      icon1:AiOutlineCaretRight,
      desc:`Opta por una conducción suave y eficiente, evitando aceleraciones bruscas y frenadas fuertes, lo que contribuirá a reducir la demanda de la batería.`,
      desc1:`La forma de conducir importa. La potencia de descarga también afecta al envejecimiento de las celdas. Usar constantemente la máxima potencia estresa la batería.`,
      desc2:`Planifica tus rutas con nosotros para evitar pendientes pronunciadas y congestiones de tráfico, lo que contribuirá a reducir la carga sobre la batería`,
      image: test
    },
    {
      label:"Trayecto",
      value:"angular",
      tittle:`Realiza un mantenimiento adecuado`,
      icon:FaTrafficLight,
      icon1:AiOutlineCaretRight,
      desc:`El mayor consumo de batería se produce en el arranque.Hasta pasados unos minutos el alternador no empieza a recargarla. Cuando abusas de trayectos cortos, la vida útil se acorta considerablemente.`,
      desc1:`Quienes utilizan el coche muy de vez en cuando, sobre todo cuando la batería ya tiene un tiempo, habrán comprobado que puede descargarse por completo.`,
      desc2:`Lo ideal es poner en marcha el coche al menos una vez al mes y recorre 30 o 40 kilómetros por carretera o autovía.`,
      image: test
    },
  ];
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <div className="flex flex-col justify-center items-center min-h-screen  p-5 md:p-0">
      <div className="flex flex-col items-center space-y-8 w-full max-w-screen-lg">
      <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-3 " >
            <Typography  color="gray" className="mt-1 font-bold text-center">
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
        {data.map(({ value, icon,icon1,tittle, desc,desc1,desc2, image  }) => (
          <TabPanel key={value} value={value}>
            <div className="flex items-center">
            <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-1 border border-gray-300  border-2" >
            {React.createElement(icon, { className: "w-8 h-8" })}
            </Card>
            <Typography className="font-bold text-center mt-3 ml-2">{tittle}</Typography>
            </div>
        <div className="mt-5" >
        <Timeline>
        <TimelineItem >
        <TimelineConnector />
        <div className="flex">
        <TimelineIcon className="w-2 h-2" />
        <TimelineBody className="pb-3">
        <Typography className="text-justify">{desc}</Typography>
          </TimelineBody>
        </div>
        </TimelineItem>
        <TimelineItem >

        <TimelineConnector />
        <div className="flex">
        <TimelineIcon className="w-2 h-2"/>
        <TimelineBody className="pb-3">
            <Typography className="text-justify">{desc1}</Typography>
          </TimelineBody>
        </div>
        </TimelineItem>
        </Timeline>
        <TimelineItem >
        <TimelineConnector />
        <div className="flex">
        <TimelineIcon className="w-2 h-2" />
        <TimelineBody>
        <Typography className="text-justify">{desc2}</Typography>
          </TimelineBody>
        </div>
        </TimelineItem>
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
