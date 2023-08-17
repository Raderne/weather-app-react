/* eslint-disable react/prop-types */
import { BsDroplet, BsEye, BsSearch, BsWind } from "react-icons/bs";

import { weatherIconMap } from "../../weatherIcons";

const DetailsInfo = ({
  location,
  fetchWeatherData,
  setLocationToDisplay,
  setLocation,
  data,
}) => {
  const uniqueDays = new Set();
  const today = new Date();

  const handleClick = () => {
    if (location === "") return;
    setLocationToDisplay(location.trim());
    fetchWeatherData(location.trim());
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="detailed-info">
      <div className="search-container">
        <input
          type="text"
          value={location}
          onChange={handleChange}
          onKeyDown={(e) => (e.keyCode === 13 ? handleClick() : "")}
        />
        <button className="loc-button" onClick={handleClick}>
          <BsSearch />
        </button>
      </div>

      <ul className="days-list">
        {data.slice(1).map((item, index) => {
          const forecastData = new Date(item.dt_txt);
          const dayAbbreviation = forecastData.toLocaleDateString("en", {
            weekday: "short",
          });
          const hour = forecastData.toLocaleTimeString("en", {
            hour: "2-digit",
          });
          const dayTemp = `${Math.round(item?.main?.temp)}°C`;
          const iconCode = item?.weather[0]?.icon;

          if (
            forecastData.getDate() !== today.getDate() &&
            !uniqueDays.has(dayAbbreviation) &&
            hour === "12 PM"
          ) {
            uniqueDays.add(dayAbbreviation);
            return (
              <li key={index}>
                {weatherIconMap[iconCode]}
                <span>{dayAbbreviation}</span>
                <span className="day-temp">{dayTemp}</span>
              </li>
            );
          }
        })}
      </ul>

      <div className="day-info">
        <div>
          <BsWind />
          <span className="value">{Math.round(data[0]?.wind?.speed)}Km/h</span>
          <span className="title">Wind</span>
        </div>
        <div>
          <BsDroplet />
          <span className="value">{data[0]?.main?.humidity}%</span>
          <span className="title">Humidity</span>
        </div>
        <div>
          <BsEye />
          <span className="value">{data[0]?.visibility / 1000}Km</span>
          <span className="title">Visibility</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsInfo;
