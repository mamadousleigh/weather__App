import React, { useState } from "react";
import { useEffect } from "react";
import searchBar from "./assets/images/search.png";
import humidity from ".//assets/images/humidity.png";
import cloudWeather from "./assets/images/cloudy-1.png";
import windSpeed from "./assets/images/wind.png";
import feels from "./assets/images/feels_like.png";
const App = () => {
  // f3dfbcaf7537b0ea6f9f9cbf3888880e
  const APIKey = "f3dfbcaf7537b0ea6f9f9cbf3888880e";
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const handleWeatherChange = (e) => {
    setCity(e.target.value);
  };
  const searchCity = () => {
    if (city.trim() !== "") {
      fetchWeatherData(city);
      setCity("");
    }
  };
  const allIcons = {
    cloudWeather: cloudWeather,
    searchBar: searchBar,
    humidity: humidity,
    windSpeed: windSpeed,
    feels: feels,
  };

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchWeatherData("London");
  }, []);
  return (
    <div className=" flex  flex-col w-full justify-center p-4 items-center min-h-screen   bg-blue-100 md:items-center md:w-full ">
      <div className="flex flex-col items-center mt-5 bg-blue-200  w-full max-w-sm md:max-w-md lg:max-w-lg rounded shadow p-6">
        <h1 className="capitalize bold text-3xl">weather app</h1>
        <div className="flex items-center gap-2  mt-4 w-full bg-white p-1 rounded">
          <input
            className="flex-1 border-0 outline-0 rounded-lg  w-70 capitalize"
            type="text"
            placeholder="enter city..."
            onChange={handleWeatherChange}
            value={city}
          />
          <img
            className="h-8 w-8 bg-blue-100 p-1 rounded cursor-pointer"
            src={allIcons.searchBar}
            alt="search"
            onClick={() => searchCity(city)}
          />
        </div>
        <div className="">
          <img className="h-15 w-15 mt-4" src={allIcons.cloudWeather} alt="" />
          <p className="text-3xl mt-2">
            {Math.round(weatherData?.main.temp)}°C
          </p>
          <p>{weatherData?.weather[0]?.description}</p>
          <p>{weatherData?.name}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mt-20  justify-center">
          <div className="w-full md:flex-1 bg-blue-100 p-4 rounded-2xl shadow-2xl text-center hover:bg-blue-50  ">
            <img
              className="w-8 h-8 mx-auto"
              src={allIcons.humidity}
              alt="humidity"
            />
            <p>{weatherData?.main.humidity}%</p>
            <p>Humidity</p>
          </div>

          <div className="w-full md:flex-1 bg-blue-100 p-4 rounded-2xl shadow-2xl text-center hover:bg-blue-50 ">
            <img
              className="w-8 h-8 mx-auto"
              src={allIcons.windSpeed}
              alt="wind speed"
            />
            <p>{weatherData?.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>

          <div className="w-full md:flex-1 bg-blue-100 p-4 rounded-2xl shadow-2xl text-center hover:bg-blue-50">
            <img
              className="w-8 h-8 mx-auto"
              src={allIcons.feels}
              alt="feels like"
            />
            <p>{Math.round(weatherData?.main.feels_like)}°C</p>
            <p>Feels Like</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
