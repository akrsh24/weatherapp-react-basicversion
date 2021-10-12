import React, { useState, useEffect, useCallback } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast({ coordinates }) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  const load = useCallback(() => {
    const { lat, lon } = coordinates;
    let apiKey = "e744bfafcb3c1411c3f393198d753e28";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((data) => handleResponse(data))
      .catch((err) => console.error(err));
  }, [coordinates]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setLoaded(false);
  }, [coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  return (
    <React.Fragment>
      {loaded ? (
        <div className="WeatherForecast">
          <div className="row">
            {forecast.map(function (dailyForecast, index) {
              if (index < 5) {
                return (
                  <div className="col" key={index}>
                    <WeatherForecastDay data={dailyForecast} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );

  // if (loaded) {
  //   return (
  // <div className="WeatherForecast">
  //   <div className="row">
  //     {forecast.map(function (dailyForecast, index) {
  //       if (index < 5) {
  //         return (
  //           <div className="col" key={index}>
  //             <WeatherForecastDay data={dailyForecast} />
  //           </div>
  //         );
  //       } else {
  //         return null;
  //       }
  //     })}
  //   </div>
  // </div>
  //   );
  // } else {
  //   load();
  //   return null;
  // }
}
