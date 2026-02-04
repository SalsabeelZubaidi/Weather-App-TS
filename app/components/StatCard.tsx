"use client";
import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherService";
import StatCardSkeleton from "./StatCardSkeleton";
import Lottie from "lottie-react";
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

export default function StatCard({ cityName, isCelsius }: StatCardProps) { //the object im destructring must match statCardProps shape
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);  //the value will be null or weatherData // (null) is the initial state
  const [loading, setLoading] = useState<boolean>(false);  //useState<Type>(initalValue)
  const [error, setError] = useState<string>("");

  const unit = isCelsius ? "°C" : "°F";
  const windUnit = isCelsius ? "km/h" : "mph";


  // Fetch weather when cityName changes
  useEffect(() => {
    if (!cityName || cityName.trim() === "") return;
    //if(emptyString or string with only spaces in it) stop the function //since return is inside a function

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
  }, [cityName]); //dependency array for useEffect. It means to run this effect when the component mounts, and re-run it every time cityName changes

  
  if (!cityName || cityName.trim() === "") {
    return (
      <div className="relative w-full h-[290px] sm:h-[400px] md:h-[450px] flex items-center justify-center mt-[-20px] sm:mt-[-30px] md:mt-[-40px]">
        <Lottie
          animationData={LandingPageAnim}
          loop
          className="absolute inset-0 w-full h-full opacity-70 "
        />
        <p className="text-xl lg:text-2xl relative z-10 text-center font-bold sm:text-sm md:text-3xl lg:text-4xl text-amber-50 px-4">
          What's the weather like today?
          <br />
          Type a city to find out!
        </p>
      </div>
    );
  }

  if (loading) return <StatCardSkeleton />;
  if (error) return (
    <h1 className="text-center mt-20 sm:mt-32 md:mt-40 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4">
      CITY NOT FOUND
    </h1>
  );
  if (!weatherData) return (
    <p className="text-center mt-10 sm:mt-16 md:mt-20 font-bold text-xl sm:text-2xl md:text-3xl px-4">
      No data available for this city.
    </p>
  );

  const stats = [
    { 
      title: "Humidity", 
      value: `${Math.round(weatherData?.humidity)}%`, 
      label: "cloud" 
    },
    { 
      title: "Wind", 
      // value: `${Math.round(weatherData?.wind)} mph`, 
      value:  `${isCelsius ? Math.round(weatherData?.windmph) : Math.round(weatherData?.windkph)} ${windUnit}`,
      label: "wind" 
    },
    { 
      title: "Feels Like", 
      value: `${isCelsius ? Math.round(weatherData?.feels_like_C) : Math.round(weatherData?.feels_like_F)}${unit}`, 
      label: "Thermometer" 
    }
  ];
  return (
    <>
      <div className="flex justify-center pt-5 sm:pt-16 lg:pt-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-center">
          {weatherData?.location?.name}, {weatherData?.location?.country}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center px-4 pb-6 sm:pb-8 md:pb-12 gap-3 sm:gap-6 md:gap-10">
        <img
          src={weatherData?.weather?.icon}
          className="w-16 h-16 lg:w-16 lg:h-16 md:w-24 md:h-24"
          alt={weatherData?.weather?.description}
        />
        <span className="text-base sm:text-lg md:text-xl lg:text-[24px] text-center">
          {weatherData?.weather?.description} with a high of {isCelsius? Math.round(weatherData?.tempC) : Math.round(weatherData?.tempF)}{unit}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 justify-center">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col items-start p-4 sm:p-6 lg:p-8 bg-[#26303B] w-full lg:max-w-[455px] min-h-[170px] sm:min-h-[190px] rounded-2xl gap-3 sm:gap-4"
          >
            <h4 className="text-lg sm:text-[22px]">{stat.title}</h4>
            <h3 className="text-2xl sm:text-[28px] font-bold leading-tight">{stat.value}</h3>
            <h5 className="text-sm sm:text-[16px] text-[#99ABBD]">{stat.label}</h5>
          </div>
        ))}
      </div>
    </>
  );
}
