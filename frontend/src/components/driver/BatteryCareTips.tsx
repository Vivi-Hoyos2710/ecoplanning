import React from "react";
import {Tabs,TabsHeader,TabsBody,Tab,TabPanel,Card,Typography, Timeline,TimelineItem,TimelineConnector,TimelineIcon,TimelineBody,Button,} from "@material-tailwind/react";
import {FiTruck,FiBatteryCharging} from "react-icons/fi";
import {LiaTemperatureHighSolid} from "react-icons/lia";
import {FaTrafficLight} from "react-icons/fa";
import {AiOutlineCaretRight} from "react-icons/ai";
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import fondo2 from '../../img/fondoRecomendacionesBateria1.svg';
import test from '../../img/gifCarro.gif';
import { Link} from "react-router-dom";
import LogoEco from "./LogoEco";


const BatteryCareTips = () =>  {
  const data = [
    {
      label: "Charge",
      value: "html",
      tittle:`Recharging the battery consciously` ,
      icon:FiBatteryCharging,

      icon1:AiOutlineCaretRight,
      desc:`It is advisable to maintain it with a charge of approximately 20 to 80%, avoiding both full discharge and maximum overcharge at the time of recharging.`,
      desc1:`The main objective of this practice is to minimize the wear and tear on the battery cells, reserving full charging only for situations where it is necessary, such as long trips.`,
      desc2:`Limiting the use of fast charging and favoring normal charging is beneficial, as it contributes to longer battery life and reduces long-term wear and tear.`,
      image:"https://www.mundodeportivo.com/urbantecno/hero/2022/04/que-se-necesita-para-cargar-coche-electrico-casa.jpg?width=1200&aspect_ratio=16:9"

    },
    {
      label: "Temperature",
      value: "react",
      tittle:`Reduces exposure to very high or low temperatures` ,
      icon:LiaTemperatureHighSolid,

      icon1:AiOutlineCaretRight,
      desc:`The battery is susceptible to extreme temperatures, which may compromise its durability, for this reason, it is essential to avoid prolonged exposure to extreme weather conditions as much as possible.`,
      desc1:`It is recommended to park the vehicle in shaded areas or under cover whenever feasible.`,
      desc2:`It is advisable not to leave the car in the open air for long periods of time when temperatures are below 5°C or above 35°C.`,

      image: test
    },
    {
      label: "Driving",
      value: "vue",
      tittle:`Drive efficiently` ,
      icon:FiTruck,

      icon1:AiOutlineCaretRight,
      desc:`Opt for smooth and efficient driving, avoiding sudden acceleration and hard braking, which will help reduce the demand on the battery.`,
      desc1:`The way you drive matters, discharge power also affects cell aging, constantly using maximum power stresses the battery.`,
      desc2:`Plan your routes with us to avoid steep slopes and traffic congestion, which will help reduce the load on the battery.`,
      image: test
    },
    {
      label:"Highway",
      value:"angular",
      tittle:`Efficient pathways`,
      icon:FaTrafficLight,
      icon1:AiOutlineCaretRight,
      desc:`The highest battery consumption occurs at start-up, and the alternator does not start recharging the battery until after a few minutes, when you abuse short journeys, the service life is considerably shortened.`,
      desc1:`It is advisable to opt for flatter routes and avoid uneven roads and steep climbs, as the latter can affect the battery of an electric car, reducing energy efficiency and decreasing the vehicle's range.`,
      desc2:`If you use your electric car rarely, especially with an older battery, avoid discharging it completely, run it at least once a month and drive about 30-40 miles on the highway to maintain battery health.`,

      image: test
    },
  ];
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo2})`, margin: '0', padding: '0' }}
    >
      <div className="p-5 space-y-4 lg:space-y-0">
      <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left ">
      <LogoEco/>
      <Link to="/">
            <Button variant="gradient" color="gray" className="rounded-full ml-4">
            Back to main page
            </Button>
          </Link>
      </div>

      <div className="flex flex-col justify-center  items-center ">

      <div className="flex flex-col items-center space-y-8 w-full max-w-screen-lg">
      <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-3 " >
            <Typography variant="h4" color="gray" className="mt-1 font-bold text-center">
            To conserve the battery of your electric car, you should follow these tips
            </Typography>
          </Card>
    <div className="w-full ">
    <Tabs value="html" >
      <TabsHeader style={{ backgroundColor: '#dcf6de' }}>
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
    </div>
  );
};
export default BatteryCareTips;
