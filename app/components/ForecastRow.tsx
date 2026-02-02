// interface WeatherData {
//   description: string;
//   icon: string;
// }

// interface ForecastDayData {
//   date: string;
//   minTempC: number;
//   minTempF: number;
//   maxTempC: number;
//   maxTempF: number;
//   weather: WeatherData;
// }

// interface ForecastRowProps {
//   day: ForecastDayData;
//   isCelsius: boolean;
// }

// export default function ForecastRow({ day, isCelsius }: ForecastRowProps) {
//   // Format the date to show weekday name
//   const dayName = new Date(day.date).toLocaleDateString("en-US", {
//     weekday: "long",
//   });

//   const unit = isCelsius ? "°C" : "°F";

//   return (
//     <tr className="border-t border-[#E5E8EB]">
//       <td className="p-3 sm:p-3 md:p-4 text-sm sm:text-base">{dayName}</td>
//       <td className="p-3 sm:p-3 md:p-4 text-sm sm:text-base">
//         {isCelsius ? Math.ceil(day.maxTempC) : Math.ceil(day.maxTempF)}{unit} / 
//         {isCelsius ? Math.floor(day.minTempC) : Math.floor(day.minTempF)}{unit}
//       </td>

//       <td className="p-3 sm:p-3 md:p-4 capitalize text-sm sm:text-base">{day.weather.description}</td>

//       <td className="p-3 sm:p-3 md:p-4 hidden sm:table-cell">
//         <img
//           src={day.weather.icon} 
//           alt={day.weather.description}
//           className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
//         />
//       </td>
//     </tr>
//   );
// }
