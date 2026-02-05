# Weather App

## Tech Stack
- (Next.js)

## API Used 
- WeatherAPI
- I chose this API because it provides clear and well-structured endpoints, easy-to-follow documentation and accurate, reliable weather data.

## Environment variables 
- WEATHER_API_KEY 
- This app requires an API key to fetch weather data from the WeatherAPI service. To keep they key secure and avoid exposing it in the code it was stored in an environment variable.


## Setup
1. Install deps: `npm install`
2. Create a `.env.local` file in the project root and add:
- `WEATHER_API_KEY=your_api_key`
- `GEOAPIFY_API_KEY=your_api_key`
3. Run:
   - `npm run dev`

## Features
- City search
- Current weather (temp, humidity, wind, feels like)
- 5-day forecast
- Loading & error states
- Responsive UI

## Bonus
- Unit toggle (°C ↔ °F)
- skeleton loaders
- Accessibility: keyboard search
- Search bar suggestions
- Detect live location

## Live Demo
- https://weather-app-ts-cyan.vercel.app/

## Notes
- What we’d improve with more time:
- Change UI based on the weather state