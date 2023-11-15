import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Typography } from '@material-tailwind/react';
import { GiBatteryPack } from 'react-icons/gi';
import {
    BsExclamationCircleFill,
    BsFillBarChartLineFill,
    BsGearWideConnected
} from 'react-icons/bs';
import { UserMenu } from './utils/UserMenu';
import { UserContext } from '../../types/UserTypes';
import { ReportStation } from './ReportStation';

export default function SideBar() {

    const user = useContext(UserContext);
    const [open, setOpen] = useState<boolean>(false);
    const [contenidoMobil, setContenidoMobil] = useState<boolean>(true);
    const handleOpen: () => void = () => {
        setOpen((cur: boolean) => !cur);
    };
    const isMobileScreen = window.innerWidth <= 800;
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 800;
            setContenidoMobil(!mobile);
           console.log("entro");
        };
        console.log("entro1");
        handleResize();
        
    }, []);
    return (
        <div className={`w-full lg:w-1/12 lg:ml-4 mt-4 lg:mt-0 ${isMobileScreen ? 'mobile-style' : ''}`}>
            {contenidoMobil ? (
        <Card className=" shadow-lg w-full rounded-t-lg p-5 ">
            <div className="flex flex-col items-center justify-center space-y-5">
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-center items-center pb-3">
                            <UserMenu userEmail={user.email} />
                        </div>

                        <Button className="rounded-full" variant="gradient" color="blue">
                            <BsFillBarChartLineFill style={{ fontSize: '30px' }} />
                        </Button>
                        <Typography color="gray" className="font-bold text-center text-xs">
                            Vehicle Statistics
                        </Typography>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link to="/bct">
                            <Button className="rounded-full text-lg" variant="gradient" color="green">
                                <GiBatteryPack style={{ fontSize: '30px' }} />
                            </Button>
                        </Link>
                        <Typography color="gray" className="font-bold text-center text-xs">
                            Battery care tips
                        </Typography>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Button className="rounded-full text-lg" variant="gradient" color="red" onClick={()=>handleOpen()}>
                            <BsExclamationCircleFill style={{ fontSize: '30px' }} />
                        </Button>
                        <Typography color="gray" className="font-bold text-center text-xs">
                            Report station
                        </Typography>
                        <ReportStation handleOpen={handleOpen} open={open}/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link to="/settings">
                            <Button className="rounded-full text-lg" variant="gradient">
                                <BsGearWideConnected style={{ fontSize: '30px' }} />
                            </Button>
                        </Link>
                        <Typography color="gray" className="font-bold text-center text-xs">
                            Settings
                        </Typography>
                    </div>
                </div>
            </Card>
        ): (
            <div className="fixed bottom-0 left-0 right-0 p-2">
            <Card className="p-3">
             
            <div className="flex items-center justify-center space-x-4">
  <div className="flex flex-col items-center space-y-2">
    <Button className="rounded-full text-sm w-15" size="sm" variant="gradient" color="blue">
      <div className="flex items-center justify-center">
        <BsFillBarChartLineFill style={{ fontSize: '20px' }} />
      </div>
    </Button>
    <Typography color="gray" className="font-bold text-center text-xs">
      Statistics
    </Typography>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Link to="/bct">
      <Button className="rounded-full w-15 text-sm" size="sm" variant="gradient" color="green">
        <div className="flex items-center justify-center">
          <GiBatteryPack style={{ fontSize: '20px' }} />
        </div>
      </Button>
    </Link>
    <Typography color="gray" className="font-bold text-center text-xs">
      BatteryTips
    </Typography>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Button className="rounded-full w-15 text-sm" size="sm" variant="gradient" color="red" onClick={()=>handleOpen()}>
      <div className="flex items-center justify-center">
        <BsExclamationCircleFill style={{ fontSize: '20px' }} />
      </div>
    </Button>
    <Typography color="gray" className="font-bold text-center text-xs">
      Report Station
    </Typography>
    <ReportStation handleOpen={handleOpen} open={open}/>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Link to="/settings">
      <Button className="rounded-full w-15 text-sm" size="sm" variant="gradient">
        <div className="flex items-center justify-center">
          <BsGearWideConnected style={{ fontSize: '20px' }} />
        </div>
      </Button>
    </Link>
    <Typography color="gray" className="font-bold text-center text-xs">
      Settings
    </Typography>
  </div>
</div>


            </Card>
          </div>
        )}
        

        
        </div>

    );
}
