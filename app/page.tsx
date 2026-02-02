"use client";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import StatCard from "./components/StatCard";
import ForecastTable from "./components/ForecastTable";
import UnitToggle from "./components/UnitToggle"


export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>(""); 
  // const [checked, setChecked] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  

  // const handleChange = (): void => {
  //   setChecked(!checked);
  // };

  return (
    <>
      {/* Header */}
      <div className="sm:pt-8 lg:pt-5 px-2 sm:px-5 pb-4 sm:pb-5">
        <div className="mx-auto w-full flex flex-wrap justify-between pl-10 pr-10">
          <div className="flex flex-row gap-5 items-center">
            <img
              src="/images/logo.png"
              alt="Weather App"
              className="w-[16px] h-[16px] sm:w-[16px]"
            />
            <h1 className="font-bold text-xl">Weather App</h1>
          </div>
          
          <div className="flex items-center">
            <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
            <img
              src="/images/thermo.png"
              className="mr-0 sm:mr-5 w-[20px] sm:w-[25px] h-[20px] sm:h-[25px]"
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
      <footer className="p-6 sm:p-8 lg:p-10 flex justify-center text-[16px] sm:text-lg lg:text-[20px] text-[#99ABBD] px-4">
        © 2026 Weather App. All rights reserved.
      </footer>
    </>
  );
}
