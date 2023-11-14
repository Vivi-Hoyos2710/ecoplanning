import React, { useState, useEffect } from 'react';
import { Card, Spinner, Typography } from '@material-tailwind/react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { getOVMSDataFilter } from '../../../services/OVMSService';
import moment from 'moment';
import { OVMSData } from '../../../types/OVMSTypes';
import carSolid from '../../../img/carSolid.svg';


const { REACT_APP_GOOGLE_MAPS_API } = process.env;
type LatlngLiteral = google.maps.LatLngLiteral;
const today = moment();
export const Dashboard = () => {
  const [center, setCenter] = useState({
    lat: 6.2489,
    lng: -75.5748
  });
  const options = {
    enableHighAccuracy: false,
    maximumAge: Infinity,
    setTimeout: 20000
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries: ['places']
  });
  const [carPositions, setCarPositions] = useState<LatlngLiteral[]>([]);

  useEffect(() => {
    const getCarCoordinates = async () => {
      const carCoordinates = await getOVMSDataFilter([
        {
          name: 'timestamp__gte',
          value: today.startOf('day').format('YYYY-MM-DD')
        },
        {
          name: 'timestamp__lte',
          value: today.endOf('day').format('YYYY-MM-DDTHH:mm:ss')
        }
      ]);
      setCarPositions(
        carCoordinates.map(
          (ovmsData: OVMSData) => {
            return {
              lng: ovmsData.longitude,
              lat: ovmsData.latitude
            };
          }
        )
      );
    }
    getCarCoordinates();
  }, []);

  return isLoaded ? (
    <div className="flex flex-col justify-center items-center  p-5 md:p-0">
      <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
        <Typography variant="h4" color="gray" className="mt-1 font-bold text-center">
          General Dashboard - All vehicles
        </Typography>
      </Card>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: '99%', height: '85vh' }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        {carPositions.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url:"http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png",
          }
          }
        />
      ))}
      </GoogleMap>

    </div>
  ) : (
    <Spinner />
  );
};
