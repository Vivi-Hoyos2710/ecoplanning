type Station = {
    "id": number;
    "name": string;
    "coordinate": number;
    "coordinate__longitud": number;
    "coordinate__latitud": number;
};

type StationInfo = {
    "name": string;
    "longitud": number;
    "latitud": number;
}

export type { Station , StationInfo };
