import React from 'react';
import './App.css';
import Search from './components/search';

function App() {

    const handleSearch = (searchData: any) => {
        console.log(searchData);
    }

  return (
    <div className='container'>
        <Search />
    </div>
  );
}

export default App;
