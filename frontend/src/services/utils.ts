
import axios from "axios";
import { Coords, Station } from "../types/StationTypes";
type LatlngLiteral = google.maps.LatLngLiteral;

const {DISTANCE_MATRIX_API} = process.env;

export function parseCoordinates(vertices:LatlngLiteral[]) {
        let coordinates = "";
        console.log("Empieza");
        console.log(vertices.length);

        for(let i  = 0; i < vertices.length; ++i){
            console.log(vertices[i]);
            coordinates += vertices[i].lat + "%2C"+vertices[i].lng;
            if(i != vertices.length - 1)
            coordinates += "%7C";
    }
    console.log("termina");
        return coordinates;
  }
