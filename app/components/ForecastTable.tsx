"use client";
import { useEffect, useState } from "react";
import ForecastTableSkeleton from "./ForecastTableSkeleton";
import { fetchWeather } from "../services/weatherService";
import React from "react";
import { motion } from "framer-motion";

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

  if (error)
    return (
      <div className="flex flex-col items-center">
        <p className="lg:text-center lg:font-bold lg:text-xl text-amber-100">
          Please Try Again
        </p>
      </div>
    );

  if (!forecastData || forecastData.length === 0) return <div></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-6 sm:mt-6 lg:mt-4 mb-2 sm:mb-4 lg:mb-2">
        5-Day Forecast
      </h3>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        <div className="space-y-3">
          {forecastData.slice(1).map((day: ForecastDayData, index: number) => {
            const dayName = new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            });
            const unit = isCelsius ? "°C" : "°F";

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="bg-[#26303B] rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{dayName}</div>
                  <div className="text-xs text-[#99ABBD] capitalize mt-1">
                    {day.weather.description}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-right">
                    {isCelsius ? Math.ceil(day.maxTempC) : Math.ceil(day.maxTempF)}{unit} /
                    {isCelsius ? Math.floor(day.minTempC) : Math.floor(day.minTempF)}{unit}
                  </div>
                  <img
                    src={day.weather.icon}
                    alt={day.weather.description}
                    className="w-8 h-8"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block border-2 border-[#384757] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr_72px]">
          <div className="p-3 sm:p-4 lg:p-5 bg-[#1C2129] text-xs sm:text-sm lg:text-base font-medium border-b border-[#E5E8EB] text-[#E5E8EB]" >
            Day
          </div>
          <div className="p-3 sm:p-4 lg:p-5 bg-[#1C2129] text-xs sm:text-sm lg:text-base font-medium border-b border-[#E5E8EB] text-[#E5E8EB]">
            High/Low
          </div>
          <div className="p-3 sm:p-4 lg:p-5 bg-[#1C2129] text-xs sm:text-sm lg:text-base font-medium border-b border-[#E5E8EB] text-[#E5E8EB]">
            Condition
          </div>
          <div className="p-3 lg:p-5 bg-[#1C2129] border-b border-[#E5E8EB]"></div>

          {forecastData.slice(1).map((day: ForecastDayData, i: number) => {
            const dayName = new Date(day.date).toLocaleDateString("en-US", {
              weekday: "long",
            });
            const unit = isCelsius ? "°C" : "°F";

            return (
              <React.Fragment key={day.date}>
                {[ 
                  dayName,
                  `${isCelsius ? Math.ceil(day.maxTempC) : Math.ceil(day.maxTempF)}${unit} / ${
                    isCelsius ? Math.floor(day.minTempC) : Math.floor(day.minTempF)
                  }${unit}`,
                  day.weather.description,
                  <div className="h-[40px] w-[40px]">
                    <img 
                        key="icon"
                        src={day.weather.icon}
                        alt={day.weather.description}
                      />
                  </div>
                
                ].map((content, colIndex) => (
                  <motion.div
                    key={colIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    className={`p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base capitalize  ${
                      i > 0 ? "border-t border-[#E5E8EB]" : ""
                    } 
                      ${colIndex === 0 ? "text-[#E5E8EB]" : ""}
                      ${colIndex === 1 || colIndex==2 ? "text-[#99ABBD] " : ""}
                    `}
                  >
                    {content}
                  </motion.div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
