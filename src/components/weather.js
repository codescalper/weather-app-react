// Full code on https://github.com/codescalper/weather-app-react
// Author [Mayank Singh]

import React, { useEffect, useState } from "react";
import "./style.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");
  const [tempInfo, setTempInfo] = useState({});
  const [timeStr, setTimeStr] = useState("");

  async function getWeatherInfo() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7508fdcdd46fd4e4050a5e8cbbdb3722`;
      let response = await fetch(url);
      let data = await response.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      if (sunset) {
        let date = new Date(sunset * 1000);
        setTimeStr(`${date.getHours()}:${date.getMinutes()}`);
      }

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }
  const [weatherState, setWeatheState] = React.useState("");
  useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weathermood]);

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            autoFocus
            className="searchName"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <div className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <p>{tempInfo.temp}&deg;</p>
          </div>
          <div className="description">
            <div className="weatherCondition">{tempInfo.weathermood}</div>
            <div className="place">
              {tempInfo.name}, {tempInfo.country}
            </div>
          </div>
        </div>

        <div className="date">{new Date().toLocaleString()}</div>
        {/* Four column section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} PM
                <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.humidity}
                <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.pressure}
                <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.speed}
                <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
S