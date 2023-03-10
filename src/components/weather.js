// Full code on https://github.com/codescalper/weather-app-react
// Author [Mayank Singh]

import React, { useEffect, useState } from "react";
import "./style.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");
  const [tempInfo, setTempInfo] = useState({});

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

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country
      };
      setTempInfo(myNewWeatherInfo);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  }

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
          <i className={"wi wi-day-sunny"}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <p>32.2&deg;</p>
          </div>
          <div className="description">
            <div className="weatherCondition">Sunny</div>
            <div className="place">Mumbai,india</div>
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
                <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
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
                <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
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
