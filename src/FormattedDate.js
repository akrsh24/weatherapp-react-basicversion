import React, { useEffect, useState } from "react";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function FormattedDate({ date }) {
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    let day, hours, minutes;
    if (date) {
      day = days[date.getDay()];
      if (hours < 10) hours = `0${hours}`;
      else hours = date.getHours();

      if (minutes < 10) minutes = `0${minutes}`;
      else minutes = date.getMinutes();

      setDay(day);
      setMinutes(minutes);
      setHours(hours);
    }
  }, [date]);

  return (
    <div>
      {day} {hours}:{minutes}
    </div>
  );
}
