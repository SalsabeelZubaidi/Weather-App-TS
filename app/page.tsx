"use client";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import StatCard from "./components/StatCard";
import ForecastTable from "./components/ForecastTable";
import UnitToggle from "./components/UnitToggle";
import { getUserLocation, formatCoordinates } from "./services/locationService";


export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>(""); 
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  // to detect user's location when component mounts
  useEffect(() => {
    const detectLocation = async () => {
      console.log("Attempting to get user location...");
      try {
        const coordinates = await getUserLocation();
        console.log("Location obtained:", coordinates);
        const formattedCoords = formatCoordinates(
          coordinates.latitude,
          coordinates.longitude
        );
        setSelectedCity(formattedCoords);
      } catch (error) {
        console.error("Location detection error:", error);
        setLocationError(
          error instanceof Error ? error.message : "Failed to detect location"
        );
        // Fallback to default city (Amman) if location detection fails
        // setSelectedCity("Amman");
      }
    };

    detectLocation();
  }, []);
  
  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-2">
        <div className="mx-auto w-full flex flex-wrap justify-between items-center">
          <div className="flex flex-row gap-2 sm:gap-3 items-center">
            <img
              src="/images/logo.png"
              alt="Weather App"
              className="w-2 h-2 lg:w-[12px] lg:h-[12px] md:w-[10px] md:h-[10px]"
            />
            <h1 className="font-bold text-xs lg:text-md md:text-sm">Weather App</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
            <img
              src="/images/thermo.png"
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[20px] lg:h-[20px]"
            />
          </div>
        </div>
      </div>

      <hr className="opacity-50 w-full" />

      {/* Body */}
      <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 flex flex-col gap-6 sm:gap-8 lg:gap-10 mx-auto max-w-7xl w-full">
        <SearchBar onCitySelect={setSelectedCity} />

        <StatCard cityName={selectedCity} isCelsius={isCelsius} />

        <ForecastTable cityName={selectedCity} isCelsius={isCelsius}/>
      </div>

      {/* Footer */}
      <footer className="p-4 sm:p-2 lg:p-4 flex justify-center text-xs lg:text-sm md:text-sm text-[#99ABBD] px-4">
        © 2026 Weather App. All rights reserved.
      </footer>
    </>
  );
}
