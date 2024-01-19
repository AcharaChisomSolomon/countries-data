import axios from "axios";
import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_API_KEY

// to run on your terminal with your personal API KEY
// export VITE_SOME_KEY=54l41n3n4v41m34rv0 && npm run dev // For Linux/macOS Bash
// ($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // For Windows PowerShell
// set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev // For Windows cmd.exe

const Country = props => {
    const { countryData } = props;
    const [data, setData] = useState(countryData)
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        if (data.toShow) {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${data.latlng[0]}&lon=${data.latlng[1]}&appid=${api_key}&units=metric`
              )
              .then((response) => {
                setWeatherData(response.data)
              });
        }
    }, [data])

    const handleShowing = () => {
        const newData = {
            ...data
        }
        newData.toShow = !newData.toShow
        setData(newData)
    }

    if (!data.toShow) {
        return (
          <>
            <span> {data.name.common}</span>
            <button onClick={handleShowing}>show</button>
            <br />
          </>
        );
    }

    return (
      <div>
        <h1>
          {data.name.common} <button onClick={handleShowing}>hide info</button>
        </h1>
        <p>
          capital {data.capital[0]} <br />
          area {data.area}
        </p>
        <h3>languages</h3>
        <ul>
          {Object.values(data.languages).map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
        <img src={data.flags.png} alt={data.flags.alt} />
        {weatherData ? (
          <>
            <h2>Weather in {data.name.common}</h2>
            <p>temperature {weatherData.main.temp} Celcius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={`${weatherData.weather[0].description}`}
            />
            <p>wind {weatherData.wind.speed} m/s</p>
          </>
        ) : null}
      </div>
    );
}

export default Country