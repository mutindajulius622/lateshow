import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Clear', 'Partly Cloudy'];
      const mockWeather = {
        temperature: Math.floor(Math.random() * 30) + 15,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 50) + 30,
        wind: Math.floor(Math.random() * 20) + 5,
        forecast: [
          { day: 'Today', high: 28, low: 18, condition: 'Sunny' },
          { day: 'Tomorrow', high: 26, low: 17, condition: 'Partly Cloudy' },
          { day: 'Next Day', high: 24, low: 16, condition: 'Rainy' }
        ]
      };
      
      setWeather(mockWeather);
      setLoading(false);
    };

    fetchWeather();
  }, [location]);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Clear': '🌤️',
      'Partly Cloudy': '⛅'
    };
    return icons[condition] || '🌈';
  };

  if (loading) return <div className="weather-widget loading">Loading weather...</div>;

  return (
    <div className="weather-widget">
      <h3>Weather in {location}</h3>
      <div className="current-weather">
        <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
        <div className="weather-details">
          <div className="temperature">{weather.temperature}°C</div>
          <div className="condition">{weather.condition}</div>
          <div className="weather-meta">
            <span>💧 {weather.humidity}%</span>
            <span>💨 {weather.wind} km/h</span>
          </div>
        </div>
      </div>
      <div className="weather-forecast">
        {weather.forecast.map(day => (
          <div key={day.day} className="forecast-day">
            <div className="day">{day.day}</div>
            <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
            <div className="forecast-temp">
              {day.high}° / {day.low}°
            </div>
            <div className="forecast-condition">{day.condition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;