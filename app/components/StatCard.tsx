"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherService";
import StatCardSkeleton from "./StatCardSkeleton";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import LandingPageAnim from '../../public/lottieAnimation/Weather.json';

interface WeatherData {
  tempC: number;
  tempF: number;
  humidity: number;
  windmph: number;
  windkph: number;
  feels_like_C: number;
  feels_like_F: number;
  weather: {
    description: string;
    icon: string;
  };
  location: {
    name: string;
    country: string;
  };
}

interface StatCardProps {
  cityName: string;
  isCelsius: boolean;
}

export default function StatCard({ cityName, isCelsius }: StatCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const unit = isCelsius ? "°C" : "°F";
  const windUnit = isCelsius ? "km/h" : "mph";

  useEffect(() => {
    if (!cityName || cityName.trim() === "") return;

    async function getWeather(): Promise<void> {
      setLoading(true);
      setError("");
      setWeatherData(null);

      try {
        const { current } = await fetchWeather(cityName, 1);
        setWeatherData(current);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch weather");
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [cityName]);

  if (!cityName || cityName.trim() === "") {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] flex items-center justify-center mt-0 sm:mt-[-20px] md:mt-[-30px] lg:mt-[-40px]">
        <Lottie
          animationData={LandingPageAnim}
          loop
          className="absolute inset-0 w-full h-full opacity-70"
        />
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-10 text-center font-bold text-amber-50 px-4">
          What's the weather like today?
          <br />
          Type a city to find out!
        </p>
      </div>
    );
  }

  if (loading) return <StatCardSkeleton />;

  if (error)
    return (
      <h1 className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4">
        CITY NOT FOUND
      </h1>
    );

  if (!weatherData)
    return (
      <p className="text-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl px-4">
        No data available for this city.
      </p>
    );

  const stats = [
    {
      title: "Humidity",
      value: `${Math.round(weatherData?.humidity)}%`,
      label: "cloud",
    },
    {
      title: "Wind",
      value: `${
        isCelsius
          ? Math.round(weatherData?.windmph)
          : Math.round(weatherData?.windkph)
      } ${windUnit}`,
      label: "wind",
    },
    {
      title: "Feels Like",
      value: `${
        isCelsius
          ? Math.round(weatherData?.feels_like_C)
          : Math.round(weatherData?.feels_like_F)
      }${unit}`,
      label: "Thermometer",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center pt-4 sm:pt-6 lg:pt-2 px-4"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            {weatherData?.location?.name}, {weatherData?.location?.country}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center items-center px-4 pb-4 sm:pb-6 lg:pb-1 gap-3 md:gap-6"
        >
          <img
            src={weatherData?.weather?.icon}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-13"
            alt={weatherData?.weather?.description}
          />
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-md">
            {weatherData?.weather?.description} with a high of{" "}
            {isCelsius
              ? Math.round(weatherData?.tempC)
              : Math.round(weatherData?.tempF)}
            {unit}
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 justify-center gap-3 lg:grid-cols-3 md:grid md:grid-cols-3 sm:grid sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + index * 0.2,
              ease: "easeOut",
            }}
            className={`flex flex-col items-start p-7 bg-[#26303B] min-h-[120px] rounded-2xl gap-2 ${
              index === 2 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <h4 className="lg:text-lg lg:font-medium text-sm">
              {stat.title}
            </h4>
            <h3 className="lg:text-2xl lg:font-bold font-bold">
              {stat.value}
            </h3>
            <h5 className="lg:text-sm text-[#99ABBD] text-xs">
              {stat.label}
            </h5>
          </motion.div>
        ))}
      </div>
    </>
  );
}
