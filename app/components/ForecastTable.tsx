"use client";
import { useEffect, useState } from "react";
import ForecastTableSkeleton from "./ForecastTableSkeleton";
import { fetchWeather } from "../services/weatherService";
import Lottie from "lottie-react";
import notFoundAnim from '../../public/lottieAnimation/data.json';
import React from "react";

interface ForecastDayData {
  date: string;
  minTempC: number;
  minTempF: number;
  maxTempC: number;
  maxTempF: number;
  weather: {
    description: string;
    icon: string;
  };
}

interface ForecastTableProps {
  cityName: string;
  isCelsius: boolean;
}

export default function ForecastTable({ cityName, isCelsius }: ForecastTableProps) {
  const [forecastData, setForecastData] = useState<ForecastDayData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true);
      setError("");
      setForecastData([]);

      if (!cityName) {
        setLoading(false);
        return;
      }

      try {
        const { forecast } = await fetchWeather(cityName, 6);
        setForecastData(forecast || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [cityName]);

  if (loading) return <ForecastTableSkeleton />;

  if (error) return (
    <div className="flex flex-col items-center mt-10">
      <Lottie animationData={notFoundAnim} loop className="h-64 w-64" />
      <p className="mt-4 text-center font-bold text-xl text-red-500">
        {error}
      </p>
    </div>
  );

  if (!forecastData || forecastData.length === 0) return (
    <div>
    </div>
  );

  return (
      <div className="flex flex-col gap-4 ">
        <h3 className="text-2xl font-bold mt-10 mb-4 text-[30px]">5-Day Forecast</h3>
        <div className="border-2 border-[#384757] rounded-xl overflow-hidden">
          <div className="grid grid-cols-4">
            <div className="p-6 bg-[#1C2129] text-sm sm:text-base font-medium border-b border-[#E5E8EB]">Day</div>
            <div className="p-6 bg-[#1C2129] text-sm sm:text-base font-medium border-b border-[#E5E8EB]">High/Low</div>
            <div className="p-6 bg-[#1C2129] text-sm sm:text-base font-medium border-b border-[#E5E8EB]">Condition</div>
            <div className="p-6 bg-[#1C2129] text-sm sm:text-base font-medium border-b border-[#E5E8EB]"> </div>
          
            {/* Forecast Rows */}
            {forecastData.slice(1).map((day: ForecastDayData, i: number) => {
              const dayName = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "long",
              });
              const unit = isCelsius ? "°C" : "°F";
              return (
                 <React.Fragment key={day.date}>
                  <div className={`p-5 md:p-6 text-sm sm:text-base ${i > 0 ? 'border-t border-[#E5E8EB]' : ''}`}>
                    {dayName}
                  </div>
                  <div className={`p-5 sm:p-5 md:p-6 text-sm sm:text-base  text-[#99ABBD] ${i > 0 ? 'border-t border-[#E5E8EB]' : ''}`}>
                    {isCelsius ? Math.ceil(day.maxTempC) : Math.ceil(day.maxTempF)}{unit} /
                    {isCelsius ? Math.floor(day.minTempC) : Math.floor(day.minTempF)}{unit}
                  </div>
                  <div className={`p-5 sm:p-5 md:p-6 capitalize text-sm sm:text-base  text-[#99ABBD] ${i > 0 ? 'border-t border-[#E5E8EB]' : ''}`}>
                    {day.weather.description}
                  </div>
                  <div className={`p-5 sm:p-5 md:p-6 hidden sm:flex items-end justify-end ${i > 0 ? 'border-t border-[#E5E8EB]' : ''}`}>
                    <img
                      src={day.weather.icon} 
                      alt={day.weather.description}
                      className="w-10 h-10 lg:w-[40px] lg:h-[40px] md:w-10 md:h-10"
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
    </div>
  );
}
