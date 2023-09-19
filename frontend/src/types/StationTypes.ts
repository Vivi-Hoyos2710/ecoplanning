type Station = {
  id: number;
  name: string;
  coordinate: number;
  coordinate__longitude: number;
  coordinate__latitude: number;
};

type StationInfo = {
  name: string;
  longitude: number;
  latitude: number;
  address: string;
};

type GeocodingCoords = {
  lng: number;
  lat: number;
};

type Coords = {
  longitude: number;
  latitude: number;
};
type StationForm = {
  name: string;
  address: string;
};
export type { Station, StationInfo, StationForm, Coords, GeocodingCoords };
