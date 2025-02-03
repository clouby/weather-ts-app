import { useQuery } from "@tanstack/react-query";
import {
  fetchCoordinatesByPlaceName,
  fetchPlaceByCoordinates,
} from "./fetches.ts";
import { Coordinates } from "../types/index.ts";

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    feels_like: number;
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
};

export function useFetchPlaceByCoordinates(coordinates: Coordinates | null) {
  return useQuery<WeatherData | null>({
    queryKey: ["place", coordinates?.lat, coordinates?.lon],
    queryFn: () =>
      coordinates
        ? fetchPlaceByCoordinates(coordinates?.lat, coordinates?.lon)
        : null,
    enabled: !!coordinates?.lat && !!coordinates?.lon,
  });
}

export type GeoCoordinate = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
  local_names?: Readonly<Record<string, string>>;
};

export function useFetchCoordinatesByPlaceName(name: string) {
  const keyName = name ? name.trim().toLowerCase() : name;
  return useQuery<Array<GeoCoordinate>>({
    queryKey: ["coordinates", keyName],
    queryFn: () => fetchCoordinatesByPlaceName(keyName),
    enabled: !!keyName,
  });
}
