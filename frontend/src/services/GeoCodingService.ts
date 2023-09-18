import axios from 'axios';
import Geocode from "react-geocode";
import { GeocodingCoords} from "../types/StationTypes";

const {REACT_APP_GOOGLE_GEOCODING_API} = process.env;
Geocode.setApiKey(REACT_APP_GOOGLE_GEOCODING_API??'');

Geocode.setLanguage("es");
Geocode.setRegion("CO")//Region colombia
Geocode.enableDebug();
export async function fromAddress(address:string): Promise<GeocodingCoords> {
        const response = await Geocode.fromAddress(address);
        return response.results[0].geometry.location;
}
