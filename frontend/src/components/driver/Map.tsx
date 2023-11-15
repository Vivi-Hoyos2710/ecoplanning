import React, { useState, useEffect } from 'react';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import { Spinner } from '@material-tailwind/react';
import SearchForm from './SearchForm';
import SideBar from './SideBar';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { getStationList } from '../../services/StationService';
import { Station, Coords } from '../../types/StationTypes';
import { getTempByCoord } from '../../services/WeatherService';
import { getDistanceMatrix } from '../../services/DistanceMatrixService';
import { getElevations } from '../../services/ElevationService';
import {  getModelByName } from '../../services/ModelService';
import { Model } from '../../types/ModelTypes';
import { getModelCost } from '../../services/MLService';
type LatlngLiteral = google.maps.LatLngLiteral;
type DirectionResult = google.maps.DirectionsResult;
type DistAndDur ={
  dist : number;
  duration: number;
}

const { REACT_APP_GOOGLE_MAPS_API} = process.env;
// console.log(REACT_APP_DISTANCE_MATRIX_API,"APIszs");
// console.log(REACT_APP_WEATHER_API,"APIszs2");
const Map = () => {
  const [origin, setOrigin] = useState<LatlngLiteral>({ lat: 6.1870354, lng: -75.56875661587414 });
  const [destination, setDestination] = useState<LatlngLiteral>({ lat: 6.203440, lng: -75.556541 });
  const [directions, setDirections] = useState<DirectionResult>();
  const [stations, setStations] = useState<Station[]>();
  const [batteryPercentage, setBatteryPercentage] = useState<number>(0.0);
  const [carModel, setCarModel] = useState<string>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries: ['places']
  });
  const [center, setCenter] = useState({
    lat: 6.244203,
    lng: -75.581215
  });
  useEffect(() => {
    const getStations = async () => {
      const curStations = await getStationList([{ name: 'ordering', value: 'id' }]);
      setStations(curStations)
    };

    getStations();
  }, []);

  useEffect(() => {
    console.log(directions);
  }, [directions]);

  const getTemp = async(coords: LatlngLiteral[])=>{
    const temp:Array<number> = [];
    try{
      for(let i  = 0; i < coords.length; ++i){
          temp[i] = await getTempByCoord({lng:coords[i].lng, lat:coords[i].lat});
        }
    }catch(e){
      console.error(e);
    }
    return temp;
  }

  const runFloyd = ( graph:Array<Array<number>>) => {//pass by reference
    const len = graph.length;
    for (let k = 0; k < len; k++) {
      for (let u = 0; u < len; u++) {
        for (let v = 0; v < len; v++) {
          graph[u][v] = Math.min(Math.max(graph[u][v], graph[u][k] + graph[k][v]),100.0);
        }
      }
    }
  }
  const getStop = (s : number, t : number,n : number, percentageLeft : number, graph : Array<Array<number>>, distanceMatrix : any)=>{
    let  minDistToT = inf, minDistToTIdx = -1;
    if(graph[s][t] + percentageLeft > 5){
      return t;
    }
    for(let i = 0; i < n-2; ++i){
      if(s == i || graph[s][i] + percentageLeft <= 5)continue;
      const distToT : number = parseInt(distanceMatrix[i]["elements"][t]["distance"].text);
      if(minDistToT > distToT){
        minDistToT = distToT, minDistToTIdx = i;
      }
    }
    return minDistToTIdx;
  }

  const getRouteStops = (len : number, percentageLeft:number, graph:Array<Array<number>>, distanceMatrix : any)=>{

    let s = len - 2;
    const t = s + 1;// indices of origin and destination
    const stops: Array<number> = [];
    let curS = getStop(s,t,len, percentageLeft, graph, distanceMatrix);
    if(curS == -1)return [-1];
    s = curS;
    while(s != t){
      stops.push(s);
      percentageLeft = 80;
      curS = getStop(s,t,len, percentageLeft, graph, distanceMatrix);
      if(curS == -1)return [-1];
      s = curS;
    }
    return stops;
  }


  const prepare = async()=>{
    const obj:any ={};
    const coords: LatlngLiteral[] = stations?.map((station: Station) => {
      return {
        lng: station.coordinate__longitude,
        lat: station.coordinate__latitude,
      };
    })??[];
    coords.push(origin);
    coords.push(destination);
    obj.coords = coords;
    try{
      obj.elevations =  await getElevations(coords);
      obj.temps = await getTemp(coords);
      obj.distanceMatrix = await getDistanceMatrix(coords);
      const brandModel:Model[] = await getModelByName(carModel??"");
      console.log(brandModel[0]);
      obj.range = brandModel[0].range*1000.0;
    }catch(e) {
      console.error(e);
    }
    return obj;
  }
const inf = 1e15;

  const generateGraph = async (elevations:number[], temps:number[], distanceMatrix:any, coords:Coords[], range:number) =>{
    if(!range)throw Error("Division By Zero");
    const graph : Array<Array<number>> = [];

    for(let i  = 0; i < coords.length; ++i){
      graph[i] = Array<number>();
      for(let j = 0;j<coords.length;++j){
        graph[i][j] = -100;
      }
    }
    try{
      for(let i = 0; i < coords.length;++i){
        for(let j = 0; j < coords.length;++j){
          const dist : number = distanceMatrix[i]["elements"][j]["distance"].value;
          const duration : number = distanceMatrix[i]["elements"][j]["duration"].value;
          const distRatio : number = dist / range;
          if(distRatio > 1)continue;
          graph[i][j] = await getModelCost(-distRatio,duration,elevations[j] - elevations[i], (temps[i]+temps[j])/2.0);
        }
      }
    }catch(e:any){
      console.error(e);
      throw Error(e);
    }
    return graph;
  }
  const showGraph = ( graph: Array<Array<number>>, coords : LatlngLiteral[])=>{
    const n= coords.length;
    for(let i = 0; i < coords.length;++i){
        console.log(graph[i],"");
    }
  }
  const getRoute = async()=>{
    if(!origin)return;
    const {elevations, temps, distanceMatrix, coords, range} = await prepare();
    // console.log(elevations);
    // console.log(temps);
    // console.log(distanceMatrix);
    // console.log(elevations);
   const  graph:Array<Array<number>> = await generateGraph(elevations,temps,distanceMatrix,coords,range);
   showGraph(graph,coords);
   const stops : Array<number> = getRouteStops(graph.length,batteryPercentage,graph, distanceMatrix);
   if(stops[0] == -1){
    throw new Error("Couldn't Arrive to your Destination, Try Again");
   }
   const finalStops : Array<LatlngLiteral> = [];

   for (const index of stops){
    finalStops.push(coords[index]);
   }
   renderDirections(finalStops);
  }

  const renderDirections = (waypoints : Array<LatlngLiteral>)=>{
      // Ensure that the origin is defined
      if (!origin) return;
      const service = new google.maps.DirectionsService();

      service?.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints.map(waypoint => ({ location: waypoint })),
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error('Directions request failed. Status:', status);
          }
        }
      );

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
        {stations && stations.map((station:Station)=>{
          return (
            <Marker position={
              {
                lat:station.coordinate__latitude,
                lng: station.coordinate__longitude,
              }
            }
            // icon="https://fontawesome.com/icons/charging-station?f=classic&s=solid"
            />
          );
        })}
        {/* <Marker position={center} /> */}
        <div className="flex flex-col lg:flex-row p-5 justify-between">
          <SearchForm
          setOrigin={setOrigin}
          setDestination={setDestination}
          getRoute={getRoute}
          setBatteryPercentage={setBatteryPercentage}
          setCarModel={setCarModel}
          />
          <SideBar />
        </div>
      </GoogleMap>
    </div>
  ) : (
    <Spinner />
  );
};

export default Map;



function setTableData(stations: import("../../types/StationTypes").Station[]) {
  throw new Error('Function not implemented.');
}
/*

juancamilo@gmail.com
Mac123
*/


// 38.959365, -5.867984
