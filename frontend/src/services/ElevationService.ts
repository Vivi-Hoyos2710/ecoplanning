
import axios from "axios";
import { Coords, Station } from "../types/StationTypes";
import { parseCoordinates } from "./utils";
type query={
    origins: string;
    destinations:string;
  }
type LatlngLiteral = google.maps.LatLngLiteral;

export async function getElevations(coords:LatlngLiteral[]) {
    const elevator = new google.maps.ElevationService();
    const response = await elevator
    .getElevationForLocations({
      locations: coords,
    })
    return response.results.map(el => el.elevation);
  }
