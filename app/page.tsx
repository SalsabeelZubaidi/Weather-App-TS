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
        setSelectedCity("Amman");
      }
    };

    detectLocation();
  }, []);
  
  return (
    <>
      {/* Header */}
      <div className="lg:px-1 lg:py-3">
        <div className="mx-auto w-full flex flex-wrap justify-between pl-10 pr-10">
          <div className="flex flex-row gap-3 items-center">
            <img
              src="/images/logo.png"
              alt="Weather App"
              className="w-[13px] h-[13px] lg:w-[14px]"
            />
            <h1 className="font-bold text-l">Weather App</h1>
          </div>
          
          <div className="flex items-center">
            <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
            <img
              src="/images/thermo.png"
              className="lg:w-[20px] lg:h-[20px]"
            />
          </div>
        </div>
      </div>

      <hr className="opacity-50 w-full" />

      {/* Body */}
      <div className="pt-6 sm:pt-8 lg:pt-10 px-2 sm:px-6 md:px-8 lg:px-2 pb-12 sm:pb-16 lg:pb-20 flex flex-col gap-4 sm:gap-6 mx-auto max-w-6xl w-full">
        <SearchBar onCitySelect={setSelectedCity} />

        <StatCard cityName={selectedCity} isCelsius={isCelsius} />

        <ForecastTable cityName={selectedCity} isCelsius={isCelsius}/>
      </div>

      {/* Footer */}
      <footer className="p-6 sm:p-8 lg:p-10 flex justify-center text-[16px] sm:text-lg lg:text-[16px] text-[#99ABBD] px-4">
        © 2026 Weather App. All rights reserved.
      </footer>
    </>
  );
}
