import React, { useState } from "react";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (e) => {
    if (e.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=987da3f0f3d92a3ddaabac0389fcf193`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data), setCity(""));
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        className="input"
        placeholder="Enter City ..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      {typeof weatherData.main === "undefined" ? (
        <div>
          <p className="information">
            Please enter a city name into search bar to get the information
          </p>
        </div>
      ) : (
        <div className="weatherDataContainer">
          <p className="city">{weatherData.name}</p>
          <div className="mainAndIcon">
            <p className="temp">{Math.round(weatherData.main.temp)} °C </p>
            <img
              className="weatherIcon"
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
            />
          </div>
          <p className="weatherMain">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? (
        <p className="warning">City not founded</p>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
}

export default App;
