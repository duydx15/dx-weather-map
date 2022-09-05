import moment from "moment-timezone";
import React from "react";
import Image from "next/image";

export default function TodaysWeather({ city, weather, timezone }) {
  return (
    <div className="today">
      <div className="today__inner">
        <div className="today__left-content">
          <h1>
            {city.name} ({city.country})
          </h1>

          <h2>
            <span>{weather.temp.max.toFixed(0)}&deg;C</span>
            <span>{weather.temp.min.toFixed(0)}&deg;C</span>
          </h2>

          
        </div>

        <div className="today__right-content">
          <div className="today__icon-wrapper">
            <div>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                layout="fill"
              />
            </div>
          </div>

          <h3>{weather.weather[0].description}</h3>
        </div>
      </div>
    </div>
  );
}
