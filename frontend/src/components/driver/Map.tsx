import React, { useState, useRef, SetStateAction, useEffect } from 'react';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import { Input } from '@material-tailwind/react';
import axios from 'axios';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';

type LatlngLiteral = google.maps.LatLngLiteral;
type DirectionResult = google.maps.DirectionsResult;
const { REACT_APP_GOOGLE_MAPS_API } = process.env;
const Map = ({ children }: { children: React.ReactNode }) => {
  const [origin, setOrigin] = useState<LatlngLiteral>({   lat: 6.244203, lng: -75.581215});
  const [destination, setDestination] = useState<LatlngLiteral>({ lat: 6.1673, lng: 75.5837 });
  const [directions, setDirections] = useState<DirectionResult>();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API ?? ''
  });
  // const [map, setMap] = useState(null);
  // const [directionsResponse, setDirectionsResponse] = useState(null);
  // const originRef = useRef();
  // const destiantionRef = useRef();
  // const [IP, setIP] = useState('');
  const [center, setCenter] = useState({
    lat: 6.244203,
    lng: -75.581215
  });
  // const getRoute = ()=>
  // {
  //   const service  = new google.maps.DirectionsService();
  //   service.route(
  //     {
  //       origin,
  //       destination,
  //       travelMode : google.maps.TravelMode.DRIVING
  //     },
  //     (result,status) => {
  //       if(status === 'OK' && result){
  //         setDirections(result);
  //       }
  //     }
  //   )
  // }

  const options = {
    enableHighAccuracy: false,
    maximumAge: Infinity,
    setTimeout: 20000
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });
        // console.log(center);
      },
      (err) => {
        console.log(err);
      },
      options
    );
  };
  useEffect(() => {
    getLocation();
  }, []);

  return isLoaded ? (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-full z--1"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo1})`, margin: '0', padding: '0' }}
    >
      <GoogleMap
        center={center}
        zoom={20}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false

        }}

        // onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        <div className="w-full">{children}</div>
      </GoogleMap>
      {/* <Marker position={center} /> */}
      {/*
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )} */}
    </div>
  ) : (
    <div></div>
  );
};

export default Map;


/*

juancamilo@gmail.com
Mac123
*/
