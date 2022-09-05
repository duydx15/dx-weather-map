import Head from 'next/head';
import React from 'react'
import cities from "../../lib/city.list.json";
import TodaysWeather from '../../components/Todayweather/TodaysWeather';
import moment from 'moment-timezone';
import Link from "next/link";
import HourlyWeather from '../../components/Hourlyweather/HourlyWeather';
import WeeklyWeather from '../../components/Weeklyweather/Weeklyweather';
import SearchBox from '../../components/SearchBox/SearchBox';
export async function getServerSideProps(context) {
    const city = getCityId(context.params.city);
  
    if (!city) {
      return {
        notFound: true,
      };
    }
  
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=7b26c92417fd3678d52eac12dc870222`
    );
  
    const data = await res.json();
  
    if (!data) {
      return {
        notFound: true,
      };
    }
  
    const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  
    const weeklyWeather = data.daily;
  
    return {
      props: {
        city: city,
        timezone: data.timezone,
        currentWeather: data.current,
        hourlyWeather: hourlyWeather,
        weeklyWeather: weeklyWeather,
      }, // will be passed to the page component as props
    };
  }
  
  const getCityId = (param) => {
    const cityParam = param.trim();
    // get the id of the city
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];
  
    if (!id) {
      return null;
    }
  
    const city = cities.find((city) => city.id.toString() == id);
  
    if (city) {
      return city;
    } else {
      return null;
    }
  };
  
  const getHourlyWeather = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000);
  
    const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  
    return todaysData;
  };
  
  export default function City({
    city,
    weather,
    currentWeather,
    hourlyWeather,
    weeklyWeather,
    timezone,
  }) {
    return (
      <div>
        <Head>
          <title>{city.name} Weather </title>
        </Head>

        <div >
          <div className="container">
            <Link href="/">
              <a className="back-link">&larr; Home</a>
            </Link>
            <SearchBox placeholder="Search for a location" />
            <TodaysWeather
              city={city}
              weather={weeklyWeather[0]}
              timezone={timezone}
            />
            <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
            
          </div>
        </div>
      </div>
    );
  }
  