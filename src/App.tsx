import React, { ChangeEvent, useState } from 'react';
import './App.css';

type optionType = {
  name: string,
  lat: number,
  lon: number,
}

type forecastType = {
  name: string,
  main: {
    temp: number,
  }
  weather: [{
    icon: string
    main: string,
  }]
}

const App = (): JSX.Element => {

  const [options, setOptions] = useState<[]>([]);
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<optionType>();
  const [forecast, setForecast] = useState<forecastType>();

  const getSearchValues = (city: string) => {
    if(city == null || city == '') return;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.trim()},ON,CA&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`)
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if(val == ' ') return;

    setSearch(val);
    getSearchValues(val);
  }

  const onCitySelect = (option: optionType) => {
    setCity(option);
    setSearch(option.name);
  }

  const getWeather = () => {
    if(city == null) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`)
      .then((res) => res.json())
      .then((data) => { setForecast(data) });

    setOptions([]);
  }

  return (
    <div className='relative center'>
      <input
          placeholder='City name'
          type='text'
          value={search}
          onChange={onSearch}
          className='px-1 py-1 rounded-lg border-2 border-black' />

          <button className='cursor-pointer rounded-md border-2'
            onClick={() => getWeather()}>Search</button> 

          <ul className="absolute top-9 bg-grey m1-1 rounded-b-md">
            {options.map((option: optionType, index: number ) => (
              <li key={option.name + index}>
                <button className='cursor-pointer bg-blue-100 p-1 rounded-lg m-1'
                  onClick={() => onCitySelect(option)}>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <h1>{forecast?.name}</h1>
          <h2>{forecast?.main?.temp}</h2>
          <ul>
            {forecast?.weather.map((x) => (
              <li>
                {x.main}
              </li>
            ))}
          </ul>

    </div>
  )
}

export default App;
