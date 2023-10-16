import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import { Input } from "@material-tailwind/react";

  type PlacesProps = {
    setPlace: (position: google.maps.LatLngLiteral) => void;
    placeholder: string;
  };

  export default function Places({ setPlace ,placeholder}: PlacesProps) {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (val: string) => {
      setValue(val, false);
      clearSuggestions();

      const results = await getGeocode({ address: val });
      const { lat, lng } = await getLatLng(results[0]);
      setPlace({ lat, lng });
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e:any) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input bg-white flex-grow rounded-sm border-inherit"
          placeholder={placeholder}

        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  }
