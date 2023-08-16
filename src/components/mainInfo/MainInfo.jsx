import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
const MainInfo = ({ location, description, temperature, main }) => {
  const imageRef = useRef();

  const minTemp = Math.round(main?.temp_min);
  const maxTemp = Math.round(main?.temp_max);
  const feelsLike = Math.round(main?.feels_like);
  const todayDate = new Date().toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const fetchImage = async (tag) => {
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      import.meta.env.VITE_FLIKR_API_KEY
    }&tags=${tag}city&per_page=1&page=1&format=json&nojsoncallback=1`;

    try {
      const response = await fetch(flickrUrl);
      const data = await response.json();

      const { server, id, secret } = data.photos.photo[0];
      const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;

      imageRef.current.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage(location);
  }, [location]);

  return (
    <div className="main-info" ref={imageRef}>
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
