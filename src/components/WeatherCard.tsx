import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Thermostat,
  WaterDrop,
  Speed,
  Air,
  Explore,
} from "@mui/icons-material";
import { useFetchPlaceByCoordinates } from "../queries/index.ts";
import { Coordinates } from "../types/index.ts";
import { getWeatherIcon } from "../utils/index.ts";

export interface WeatherCardProps {
  coordinates: Coordinates | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ coordinates }) => {
  const { data, isLoading, error } = useFetchPlaceByCoordinates(coordinates);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body1" color="text.secondary">
          Try to search a new place
        </Typography>
        <span role="img" aria-label="earth">
          🌍
        </span>
      </div>
    );
  }

  const { main, weather } = data;

  return (
    <MuiCard sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h4" color="text.primary">
          {data.name}, {data.sys.country}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Temperature: {main.temp}°C
        </Typography>
        <img
          src={getWeatherIcon(weather[0].icon)}
          alt={weather[0].description}
        />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {weather[0].main}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Thermostat sx={{ fontSize: 16 }} style={{ marginRight: 4 }} />{" "}
              Feels like: {main.feels_like}°C
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <WaterDrop sx={{ fontSize: 16 }} style={{ marginRight: 4 }} />{" "}
              Humidity: {main.humidity}%
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Speed sx={{ fontSize: 16 }} style={{ marginRight: 4 }} />{" "}
              Pressure: {main.pressure} hPa
            </Typography>
          </div>
          <div>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Air sx={{ fontSize: 16 }} style={{ marginRight: 4 }} /> Wind
              Speed: {data.wind.speed} m/s
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Explore sx={{ fontSize: 16 }} style={{ marginRight: 4 }} /> Wind
              Direction: {data.wind.deg}°
            </Typography>
          </div>
        </div>
      </CardContent>
    </MuiCard>
  );
};

export default WeatherCard;
