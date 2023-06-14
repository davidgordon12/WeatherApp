import React, { ChangeEvent, useState } from 'react';
import './App.css';

const App = (): JSX.Element => {

  const [options, setOptions] = useState<[]>([]);
  const [search, setSearch] = useState<string>("");

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

  const getWeather = (city: string) => {
    
  }

  return (
    <div className='relative center'>
      <input
          placeholder='City name'
          type='text'
          value={search}
          onChange={onSearch}
          className='px-1 py-1 rounded-lg border-2 border-black' />

          <button className='cursor-pointer rounded-md border-2'>Search</button> 

          <ul className="absolute top-9 bg-grey m1-1 rounded-b-md">
            {options.map((option: { name: string } ) => (
              <p className='cursor-pointer bg-blue-100 p-1 rounded-lg m-1'>{option.name}</p>
            ))}
          </ul>
    </div>
  )
}

export default App;
