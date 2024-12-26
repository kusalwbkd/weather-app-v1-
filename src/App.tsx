import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Pages/Layout"
import WeatherDashboard from "./Pages/WeatherDashboard "
import CityPage from "./Pages/CityPage"
import { ThemeProvider } from "./context/ThemeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "./components/ui/sonner"
export default function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: The duration (in milliseconds) for which the cached data is considered fresh.
      // If a query is made during this time, no API call is triggered, and fresh data from the cache is used.
      // After staleTime has passed, data becomes stale, and a background API call will fetch fresh data
      // while showing the stale data immediately to the user.
      staleTime: 5 * 60 * 1000, // 5 minutes

      // cacheTime (gcTime): The total duration (in milliseconds) for which unused cached data remains in memory.
      // Once this time expires, the cached data is garbage collected and removed.
      // If an API call is made after cacheTime has passed, the UI shows a loading state until fresh data is fetched.
      gcTime: 10 * 60 * 1000, // 10 minutes

        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={true} />
 <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<WeatherDashboard />} />
      <Route path="city/:cityName" element={<CityPage/>} />

      </Route>
    </Routes>
    <Toaster richColors />
    </ThemeProvider>
   
      
    </BrowserRouter>
    </QueryClientProvider>
   
  )
}
//VITE_OPENWEATHER_API_KEY=b2c71de276e79249660685d0d577325b
