import "./App.css";
import { useEffect, useState } from "react";
import MainInfo from "./components/mainInfo/MainInfo";
import DetailsInfo from "./components/detailsInfo/DetailsInfo";
import ErrorPopup from "./components/popups/ErrorPopup";

const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("rabat");
  const [locationToDisplay, setLocationToDisplay] = useState("rabat");
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [description, setDescription] = useState("");

  const fetchWeatherData = async (loc) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`;

    try {
      const resp = await fetch(apiUrl);
      const data = await resp.json();

      setTemperature(data.list[0].main.temp);
      setDescription(data.list[0].weather[0].description);
      setData([...data.list]);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  return (
    <>
      {error && <ErrorPopup setError={setError} />}
      <div className="container">
        <MainInfo
          temperature={temperature}
          description={description}
          location={locationToDisplay}
          main={{ ...data[0]?.main }}
        />

        <DetailsInfo
          location={location}
          fetchWeatherData={fetchWeatherData}
          setLocation={setLocation}
          setLocationToDisplay={setLocationToDisplay}
          data={data}
        />
      </div>
    </>
  );
};

export default App;
