interface WeatherData {
  description: string;
  icon: string;
}

interface LocationData {
  name: string;
  region: string;
  country: string;
}

interface CurrentWeatherData {
  tempC: number;
  tempF: number;
  humidity: number;
  windmph: number;
  windkph: number;
  feels_like_C: number;
  feels_like_F: number;
  weather: WeatherData;
  location: LocationData;
}

interface ForecastDayData {
  date: string;
  minTempC: number;
  minTempF: number;
  maxTempC: number;
  maxTempF: number;
  weather: WeatherData;
}

interface WeatherResponse {
  forecast: ForecastDayData[];
  current: CurrentWeatherData;
}

function getWeatherImage(condition: string): string {
  const lowerCaseCondition = condition.toLowerCase();
  
  if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
    return '/images/weatherState/sunny.png';
  } else if (lowerCaseCondition.includes('partly cloudy') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('cloudy')) {
    return '/images/weatherState/cloud.png';
  } else if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle') || lowerCaseCondition.includes('shower')) {
    return '/images/weatherState/rainy.png';
  } else if (lowerCaseCondition.includes('Heavy') && lowerCaseCondition.includes('rain')) {
    return '/images/weatherState/heavyRain.png';
  } else if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet')) {
    return '/images/weatherState/snowy.png';
  } else if (lowerCaseCondition.includes('thunder') || lowerCaseCondition.includes('lightning')) {
    return '/images/weatherState/thunder.png';
  } else if (lowerCaseCondition.includes('clear')) {
    return '/images/weatherState/clear.png';
  }
  else {
    // Default to clear if condition not recognized
    return '/images/weatherState/clear.png';
  }
}

export async function fetchWeather(city: string, days: number = 6): Promise<WeatherResponse> {
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/api/weather?city=${city}&days=${days}`;
    console.log('Fetching weather from:', url);
    
    const res = await fetch(url);
    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(`Failed to fetch weather data: ${res.status} - ${errorData.error}`);
    }

    const data = await res.json();
    console.log('Weather data received:', data);

    const forecast = data.forecast.forecastday.map((day: any): ForecastDayData => ({
      date: day.date,
      minTempC: day.day.mintemp_c,
      minTempF: day.day.mintemp_f,
      maxTempC: day.day.maxtemp_c,
      maxTempF: day.day.maxtemp_f,

      weather: {
        description: day.day.condition.text,
        icon: getWeatherImage(day.day.condition.text),
      },
    }));

    const current: CurrentWeatherData = {
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      humidity: data.current.humidity,
      windmph: data.current.wind_mph,
      windkph: data.current.wind_kph,
      feels_like_C: data.current.feelslike_c,
      feels_like_F: data.current.feelslike_f,

      weather: {
        description: data.current.condition.text,
        icon: getWeatherImage(data.current.condition.text),
      },
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
      }
    };

    return { forecast, current };
  } catch (err: any) {
    console.error('Weather service error:', err);
    throw err;
  }
}
