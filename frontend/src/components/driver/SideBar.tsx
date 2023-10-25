import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Button, Typography} from '@material-tailwind/react';
import { GiBatteryPack } from 'react-icons/gi';
import {
  BsExclamationCircleFill,
  BsFillBarChartLineFill,
  BsGearWideConnected
} from 'react-icons/bs';
import { UserMenu } from './utils/UserMenu';
import { UserContext } from '../../types/UserTypes';
export default function SideBar (){
    const user = useContext(UserContext);
    return(
        <div className="w-full lg:w-1/12 lg:ml-4 mt-4 lg:mt-0">
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
            <Button className="rounded-full text-lg" variant="gradient" color="red">
                <BsExclamationCircleFill style={{ fontSize: '30px' }} />
            </Button>
            <Typography color="gray" className="font-bold text-center text-xs">
                Report station
            </Typography>
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
        </div>
    );
}
