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
  wind: number;
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

export async function fetchWeather(city: string, days: number = 5): Promise<WeatherResponse> {
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
        icon: day.day.condition.icon,
      },
    }));

    const current: CurrentWeatherData = {
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      humidity: data.current.humidity,
      wind: data.current.wind_mph,
      feels_like_C: data.current.feelslike_c,
      feels_like_F: data.current.feelslike_f,

      weather: {
        description: data.current.condition.text,
        icon: data.current.condition.icon,
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
