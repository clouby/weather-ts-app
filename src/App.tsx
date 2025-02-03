import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import WeatherCard from "./components/WeatherCard.tsx";
import InputSearch from "./components/InputSearch.tsx";
import { Coordinates } from "./types/index.ts";

const queryClient = new QueryClient();

function App() {
  const [placeValue, setPlaceValue] = useState<Coordinates | null>(null);

  function onChange(value: Coordinates) {
    if (value) {
      setPlaceValue(value);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            my: 4,
            width: "100%",
          }}
        >
          <InputSearch onValueChange={onChange} />
          <WeatherCard coordinates={placeValue} />
        </Box>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
