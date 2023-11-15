import React,{useState} from 'react';
import {Input, Typography} from '@material-tailwind/react'
import PlacesAutoComplete,{
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import { DriverFormData } from '../../types/CarTypes';
import { useForm, SubmitHandler, Controller, UseFormRegister } from 'react-hook-form';

type LatLngLiteral = google.maps.LatLngLiteral;
type PlacesProps ={
  setInputPlace : (position: LatLngLiteral) => void;
  register: UseFormRegister<DriverFormData>;
  label: string;
  formName : any;
  errors: any;
}

export default function Places(
      {setInputPlace,label, formName, register, errors} : PlacesProps
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
      const searchOptions = {
        location: new google.maps.LatLng( 6.1870354,  -75.56875661587414 ),
        radius: 100000,
      }
    return (
        <div>
            <PlacesAutoComplete
                value={place}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={searchOptions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div >
            <Input crossOrigin={undefined} label={label} className="bg-white flex-grow"
              {...register(formName, {
              })}
              {...getInputProps({
                // placeholder: 'Search Places ...',
                // className: 'location-search-input',
              })}
            />
             {errors[formName] && (
              <Typography variant="small" color="red">
                {errors[formName]?.message}
              </Typography>
            )}
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
