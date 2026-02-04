// Geolocation service to get user's current location coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
} //this means that any object of type coordiantes must have this shape

export async function getUserLocation(): Promise<Coordinates> {
  console.log("getUserLocation function called");
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    console.log("Navigator geolocation available, requesting current position...");
    navigator.geolocation.getCurrentPosition(
      (position) => { //sucess callback
        console.log("Position obtained successfully:", position);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Failed to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

//Format coordinates for WeatherAPI (latitude,longitude format)
export function formatCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}`; ///4 decimals
}
