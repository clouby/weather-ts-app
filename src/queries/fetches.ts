import {
  OPENWEATHER_API_KEY,
  OPENWEATHER_API_BASE_URL,
} from "../constants/index.ts";

function wrongFetchMessage(name: string) {
  return `Something went wrong with - ${name} - the fetch request from OpenWeather`;
}

export async function fetchPlaceByCoordinates(lat: number, lon: number) {
  const response = await fetch(
    `${OPENWEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error(wrongFetchMessage("fetchPlaceByCoordinates"));
  }

  return response.json();
}

export async function fetchCoordinatesByPlaceName(name: string) {
  const response = await fetch(
    `${OPENWEATHER_API_BASE_URL}/geo/1.0/direct?q=${name}&limit=5&appid=${OPENWEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(wrongFetchMessage("fetchCoordinatesByPlaceName"));
  }

  return response.json();
}
