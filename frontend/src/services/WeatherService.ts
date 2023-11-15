import { Coords } from "../types/StationTypes";
import axios from "axios";
const {REACT_APP_WEATHER_API} = process.env;
type LatlngLiteral = google.maps.LatLngLiteral;

export async function getTempByCoord(coords : LatlngLiteral) {
    try{
        const response:any = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${REACT_APP_WEATHER_API}&q=${coords.lat},${coords.lng}&aqi=no`);
        return response["data"]["current"]["temp_c"];
    }catch(err){
        console.error(err);
        throw(err);
    }
  }
