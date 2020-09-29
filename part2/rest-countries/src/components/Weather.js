import React, { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then((response) => response.json())
      .then((json) => setWeather(json.current));
  }, []);

  return (
    <div>
      <div>temperature: {weather.temperature}C</div>
      {/* make sure the weather is loaded, otherwise we'll access undefined[0] */}
      <img src={weather.weather_icons && weather.weather_icons[0]} />
      <div>
        wind: {weather.wind_speed}km/h direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
