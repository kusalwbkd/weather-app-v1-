import CurrentWeather from '@/components/CurrentWeather';
import Error from '@/components/Error';
import { FavoriteCities } from '@/components/FavoriteCities';
import HourlyTemperature from '@/components/HourlyTemperature';
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { MapPin, RefreshCw } from 'lucide-react'
import React from 'react'

const WeatherDashboard = () => {
  const {
    coordinates,
    error,
    isLoading,
    getLocation,
  } = useGeolocation();

  //console.log(coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates)


  const locationName = locationQuery.data?.[0];


  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (isLoading) {
    return <WeatherSkeleton />;
  }
  if (error) {
    return <Error errorText={error} fn={getLocation} msg={'Enable Location'} Icon={<MapPin className="mr-2 h-4 w-4" />} />
  }

  if (!coordinates) {
    return <Error errorText={'Please enable location access to see your local weather'} fn={getLocation} msg={'Enable Location'} />

  }

  if (weatherQuery.error || forecastQuery.error) {
    return <Error errorText={'Failed to fetch weather data. Please try again.'} fn={handleRefresh} msg={'Retry'} Icon={<RefreshCw className="mr-2 h-4 w-4" />} />

  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className='space-y-4'>
        <FavoriteCities />
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}

        >
          <RefreshCw className='h-4 w-4' />
        </Button>
      </div>
      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>

    </div>
  )
}

export default WeatherDashboard 