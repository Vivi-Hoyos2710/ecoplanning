import React, { useState, useRef, SetStateAction, useEffect } from 'react';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import { Input } from '@material-tailwind/react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SideBar from './SideBar';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
  useGoogleMap,
} from '@react-google-maps/api';

type LatlngLiteral = google.maps.LatLngLiteral;
type DirectionResult = google.maps.DirectionsResult;
const { REACT_APP_GOOGLE_MAPS_API } = process.env;
const Map = () => {
  const [origin, setOrigin] = useState<LatlngLiteral>({ lat: 6.1870354, lng: -75.56875661587414 });
  const [destination, setDestination] = useState<LatlngLiteral>({ lat: 6.203440, lng: -75.556541 });
  const [directions, setDirections] = useState<DirectionResult>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries: ['places']
  });
  const [center, setCenter] = useState({
    lat: 6.244203,
    lng: -75.581215
  });

  useEffect(() => {
    console.log(directions);
  }, [directions]);

  const getRoute = () => {
    if (!origin) return;
    const service = new google.maps.DirectionsService()
    service?.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status == google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        }
      }
    )
  }
  const options = {
    enableHighAccuracy: false,
    maximumAge: Infinity,
    setTimeout: 20000
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });
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
        {(
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5
              },
            }}
          />)
        }
        <Marker position={center} />
        <div className="flex flex-col lg:flex-row p-5 justify-between">
          <SearchForm setOrigin={setOrigin} setDestination={setDestination} getRoute={getRoute} />
          <SideBar />
        </div>
      </GoogleMap>
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
