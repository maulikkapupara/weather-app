import { useEffect, useState } from "react";
import "./Weather.css";
const Weather = () => {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("welcome");

  const search = (e) => {
    e.preventDefault();
    setCity(input);
  };

  const fetchUrl = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      const res = await fetch(url);
      const response = await res.json();
      if (response.cod === 200) {
        // console.log("true")
        const data1 = {
          city: response.name,
          temp: response.main.temp,
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          temp_max: response.main.temp_max,
          temp_min: response.main.temp_min,
          deg: response.wind.deg,
          speed: response.wind.speed,
        };
        setData(data1);
      } else {
        setError("Data not Found");
      }
      // console.log(response);
    } catch (error) {
      // setError(error)
      // console.log(error);
    }
  };
  useEffect(() => {
    if (city !== "") {
      fetchUrl();
      setData("");
    }
    // eslint-disable-next-line
  }, [city]);
  return (
    <>
      <div className="container text-center mt-5">
        <h1>Whether Report</h1>
        <form className="text-center my-5" onSubmit={(e) => search(e)}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
        {data ? (
          <>
            <h1>Today Weather Of {data.city}</h1>
            <div className="data">
              <span>Temp : {data.temp}</span>
              <span>Humidity : {data.humidity}</span>
              <span>Pressure : {data.pressure}</span>
              <span>Temp-Min : {data.temp_min}</span>
              <span>Temp-Max : {data.temp_max}</span>
              <span>Wind-Speed : {data.speed}</span>
              <span>Wind-Deg : {data.deg}</span>
            </div>
          </>
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </>
  );
};
export default Weather;
