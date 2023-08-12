/* eslint-disable react/prop-types */
const MainInfo = ({ location, description, temperature, main }) => {
  const minTemp = Math.round(main?.temp_min);
  const maxTemp = Math.round(main?.temp_max);
  const feelsLike = Math.round(main?.feels_like);
  const todayDate = new Date().toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="main-info">
      <div className="pic-gradient"></div>
      <div className="today-info">
        <h2>{location}</h2>
        <span>{todayDate}</span>
        <h3>{description}</h3>
      </div>

      <div className="today-weather">
        <h1 className="weather-temp">
          <span>{Math.round(temperature)}</span>
          <span>°</span>
        </h1>
        <div className="summary">
          <h4>Daily Summary</h4>
          <p>
            Now it feels like +{feelsLike}°C, actually {Math.round(temperature)}
            °C <br />
            the temperature is felt in the range from {minTemp}°C to {maxTemp}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
