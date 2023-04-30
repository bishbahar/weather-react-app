import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState({});

  function showTemperature(response) {
    setTemperature({
      temp: response.data.main.temp,
      des: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    console.log(response.data.weather[0].icon);
  }
  function submitCity(event) {
    event.preventDefault();
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }
  return (
    <div>
      <form className="App" onSubmit={submitCity}>
        <input
          type="serach"
          placeholder="type a city name..."
          onChange={changeCity}
        />
        <button type="submit">Search City</button>
      </form>
      <ul>
        <li>Temperature: {Math.round(temperature.temp)}°C</li>
        <li>Description: {temperature.des}</li>
        <li>Humidity:{temperature.humidity} %</li>
        <li>Wind:{temperature.wind} Km/h</li>
        <li>
          <img src={temperature.icon} alt={temperature.des} />
        </li>
      </ul>
    </div>
  );
}
