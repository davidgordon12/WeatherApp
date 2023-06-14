import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import './search.css'

const Search = () => {
    return(
        <div className="container">
            <h2 className="text-3xl font-bold underline">Enter your city!</h2>
            <input className="city-input" />
        </div>
    )
}

export default Search;