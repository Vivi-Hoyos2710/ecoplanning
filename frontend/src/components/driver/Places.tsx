import React,{useState} from 'react';
import {Input} from '@material-tailwind/react'
import PlacesAutoComplete,{
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

type LatLngLiteral = google.maps.LatLngLiteral;
type PlacesProps ={
  setInputPlace : (position: LatLngLiteral) => void;
  label: string;
}
export default function Places(
      {setInputPlace,label} : PlacesProps
    ){

    const [place, setPlace] = useState<string | undefined>();
    const handleChange = (address:any) => {
        setPlace(address);
      };

    const handleSelect = (address:any) => {
      setPlace(address);
        geocodeByAddress(address)
          .then((results:any) => getLatLng(results[0]))
          .then((latLng:any) => {
            setInputPlace(latLng);
            console.log('Success', latLng)
          })
          .catch((error:any) => console.error('Error', error));
      };
    return (
        <div>
            <PlacesAutoComplete
                value={place}
                onChange={handleChange}
                onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div >
            <Input crossOrigin={undefined} label={label} className="bg-white flex-grow"
              {...getInputProps({
                // placeholder: 'Search Places ...',
                // className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {
                /* eslint-disable-next-line react/jsx-key */
                suggestions.map((suggestion ) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
            </PlacesAutoComplete>
        </div>
    )
}
