import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    // The 'weather' function takes a 'coords' object (representing coordinates)
// and returns a tuple with the string "weather" and the provided 'coords' object.
// The 'as const' assertion ensures the return type is a literal tuple with exact values
// instead of a general array type, providing type safety and immutability.
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (query: string) => ["location-search", query] as const,
  } as const;

export function useWeatherQuery(coordinates: Coordinates | null){
    

  return  useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn:()=>coordinates ?weatherAPI.getCurrentWeather(coordinates):null,
        enabled:!!coordinates


       
    })
}
export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
      enabled: !!coordinates,

 } )
  }
  
  export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () =>
        coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
      enabled: !!coordinates,
    });
  }

  export function useLocationSearch(query:string) {
    return useQuery({
      queryKey: WEATHER_KEYS.search(query),
      queryFn: () =>
         weatherAPI.searchLocations(query),
      enabled: query.length >= 3,
    });
  }
  
