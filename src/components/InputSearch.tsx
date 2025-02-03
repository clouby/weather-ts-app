import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDebounce } from "use-debounce";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GeoCoordinate,
  useFetchCoordinatesByPlaceName,
} from "./../queries/index.ts";
import { Coordinates } from "../types/index.ts";

export type InputSearchProps = {
  onValueChange: (value: Coordinates) => void;
};

const InputSearch: React.FC<InputSearchProps> = ({ onValueChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 250);
  const {
    data = [],
    isLoading,
    isFetched,
  } = useFetchCoordinatesByPlaceName(debouncedValue);

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    event.preventDefault();
    setInputValue(value);
  };

  const handleOnChange = (
    _event: React.ChangeEvent<{}>,
    value: string | GeoCoordinate | null
  ) => {
    if (value) {
      onValueChange({
        lat: typeof value === "string" ? 0 : value.lat,
        lon: typeof value === "string" ? 0 : value.lon,
      });
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={data.length > 0 ? data : []}
      filterOptions={(x) => x}
      noOptionsText="No locations"
      inputValue={inputValue}
      loading={isLoading && !isFetched}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.name}, ${option.state ? `(${option.state})` : ""}`
      }
      onInputChange={handleInputChange}
      onChange={handleOnChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Place Location"
          placeholder="Search a place location to get the weather"
          autoFocus
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading && !isFetched ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default InputSearch;
