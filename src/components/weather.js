// Full code on https://github.com/codescalper/weather-app-react
// Author [Mayank Singh]

import React from "react";
import "./style.css";

const Weather = () => {
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            autoFocus
            className="searchName"
          />

          <button className="searchButton">Search</button>
        </div>
      </div>
      <div className="widget">
        <div className="weatherIcon">
          <i className={"wi wi-day-sunny"}></i>
        </div>
      </div>
    </>
  );
};

export default Weather;
