import React from "react";

export default function WeatherTemperature({ temperature }) {
  const tempInIntType = parseFloat(temperature);
  return (
    <div className="WeatherTemperature">
      <span className="temperature">{Math.round(tempInIntType)}</span>
      <span className="unit">°C</span>
    </div>
  );
}
