import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

/**
 * pass props to components
 * instead of writing of "props" as arg, we destructure all the required props
 * as (props) => ({defaultCity})
 */
export default function Weather({ defaultCity }) {
  let [populated, setPopulated] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState(defaultCity);

  /**
   * useCallback is a React Hook which runs only on change in state in dependency array.
   * It's a Higher Order Function (HOF)
   */
  const search = useCallback(() => {
    const apiKey = "e744bfafcb3c1411c3f393198d753e28";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((data) => {
        handleResponse(data?.data);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    search();
  }, [populated, search]);

  function handleResponse(data) {
    const { coord, main, weather, wind, name, dt } = data;
    let responseObject = {
      coordinates: coord,
      temperature: main.temp,
      humidity: main.humidity,
      description: weather[0].description,
      icon: weather[0].icon,
      wind: wind.speed,
      city: name,
      date: new Date(dt * 1000),
    };
    setPopulated(true);
    setWeatherData({ ...responseObject });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  /**
   * Write condition inside return() for better clarity
   */
  return (
    <React.Fragment>
      {populated ? (
        <div className="Weather">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  placeholder="Enter a city.."
                  className="form-control"
                  autoFocus="on"
                  onChange={handleCityChange}
                />
              </div>
              <div className="col-3">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary w-100"
                />
              </div>
            </div>
          </form>
          <WeatherInfo weatherData={weatherData} />
          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );

  // if (populated) {
  //   return (
  // <div className="Weather">
  //   <form onSubmit={handleSubmit}>
  //     <div className="row">
  //       <div className="col-9">
  //         <input
  //           type="search"
  //           placeholder="Enter a city.."
  //           className="form-control"
  //           autoFocus="on"
  //           onChange={handleCityChange}
  //         />
  //       </div>
  //       <div className="col-3">
  //         <input
  //           type="submit"
  //           value="Search"
  //           className="btn btn-primary w-100"
  //         />
  //       </div>
  //     </div>
  //   </form>
  //   <WeatherInfo data={weatherData} />
  //   <WeatherForecast coordinates={weatherData.coordinates} />
  // </div>
  //   );
  // } else {
  //   search();
  //   return "Loading...";
  // }
}
