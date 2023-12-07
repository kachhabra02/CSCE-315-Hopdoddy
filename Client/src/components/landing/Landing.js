/**
 * This module provides the Landing page component for the Hopdoddy application. It includes functionality
 * for displaying weather data, location information, and navigation to the order page.
 * @module Landing
 */

import { Box } from '@mui/material';
import { Card, CardHeader, CardContent, Typography, Button} from '@mui/material';
import './Landing.css';
import hopdoddyPic from './hopdoddy.jpg';

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


/**
 * Fetches weather data and sets the result in the state.
 * 
 * @param {Function} setWeatherResult - The setState function to update weather data.
 */
function getWeather(setWeatherResult) {
  const baseURL = "https://api.openweathermap.org/data/2.5/";
  const zipcode = 77840;
  const units = "imperial";

  // FIXME: May need to specify language later when implementing Google Translate API
  fetch(`${baseURL}weather?zip=${zipcode}&units=${units}&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`)
    .then((res) => res.json())
      .then((result) => {
        setWeatherResult(result);
  })
  .catch(error => console.error('Error fetching weather data:', error));
}

/**
 * Renders a weather information card.
 * 
 * @param {Object} weatherData - The weather data to display.
 * @returns {React.Component} A card component showing weather information.
 */
function WeatherCard(weatherData) {
  // Destructuring condition to pass on later
  const condition = weatherData.weather.length > 0 ? weatherData.weather[0].main : "Not available";

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader title="Weather Information" />
      <CardContent>
        <Typography variant="h6">Temperature: {weatherData.main.temp}°F</Typography>
        <Typography variant="body1">Humidity: {weatherData.main.humidity}%</Typography>
        <Typography variant="body1">Wind Speed: {weatherData.wind.speed} mph</Typography>
        <Typography variant="body1">Condition: {condition}</Typography>
      </CardContent>
    </Card>
  );
}

/**
 * Renders an address card for a specific location.
 * 
 * @param {Object} props - Props containing padding information.
 * @returns {React.Component} A card component showing the location address.
 */
function AddressCard({ padding }) {
  const street = "144 Century Ct Suite 103";
  const cityStateZip = "College Station, TX 77840";

  return (
    <Card sx={{ minWidth: 275}}>
      <CardHeader title="Location Information" />
      <CardContent>
        <Typography variant="h6">{street}</Typography>
        <Typography variant="body1">{cityStateZip}</Typography>
      </CardContent>
    </Card>
  );
}

/**
 * Landing component displaying Hopdoddy's location, weather information, and a link to order now.
 * 
 * @returns {React.Component} The Landing page component.
 */
function Landing() {
  const [weatherResult, setWeatherResult] = useState({});

  useEffect(() => {
    getWeather(setWeatherResult); // Making the API call
  }, []); // Empty dependency array for the initial render

  // Simple if statement to wait until weather data is rendered
  const weatherDisplay = weatherResult.main ? (
    WeatherCard(weatherResult)
  ) : (
    <p>Loading weather data...</p>
  );

  return (
    <Box id='landing'>
      <img src={hopdoddyPic} alt="Hopdoddy Location" />
      <Box id='landing-info'>
        <Box id='weather' sx={{ padding: 3 }}>
          {weatherDisplay}
        </Box>
        <Box id='location' sx={{ padding: 3 }}>
          <AddressCard />
        </Box>
        <Box id='order-now'>
          {/* <Button>Order Now</Button> */}
          <Button component={Link} to="/customer">Order Now</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Landing