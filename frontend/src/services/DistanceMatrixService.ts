
import axios from "axios";
import { Coords, Station } from "../types/StationTypes";
type LatlngLiteral = google.maps.LatLngLiteral;
const {REACT_APP_DISTANCE_MATRIX_API} = process.env;
import { parseCoordinates } from "./utils";

// export async function getDistanceMatrix(coords:LatlngLiteral[]) {
//     console.log(coords.length);
//     const parsedCoordinates : string = parseCoordinates(coords);
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json
//     ?destinations=${parsedCoordinates}
//     &origins=${parsedCoordinates}
//     &key=${REACT_APP_DISTANCE_MATRIX_API}`;
//     // console.log(url);
//     // https://maps.googleapis.com/maps/api/distancematrix/json
//     // ?destinations=-75.5582293%2C6.197298399999999%7C-75.5412824%2C6.1530667%7C6.197298399999999%2C-75.5582293%7C6.1530667%2C-75.5412824
//     // &origins=-75.5582293%2C6.197298399999999%7C-75.5412824%2C6.1530667%7C6.197298399999999%2C-75.5582293%7C6.1530667%2C-75.5412824
//     // &key=AIzaSyDetKBiphPghw0--Jqxla5A51_TKGEfNwk
//     try{
//         const response:any = await axios.get(url);
//         console.log(response);
//         return response["rows"]
//     }catch(err){
//         console.error(err);
//         throw(err);
//     }
//   }
export async function getDistanceMatrix(coords:LatlngLiteral[]) {
    const service = new google.maps.DistanceMatrixService();
    try{
        const request = {
            origins: coords,
            destinations: coords,
            travelMode: google.maps.TravelMode.DRIVING,
          };
        const response = await service.getDistanceMatrix(request);
        return response["rows"]
    }catch(err){
        console.error(err);
        throw(err);
    }
  }
