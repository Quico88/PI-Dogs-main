import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBreeds } from "../actions";
import './stylesheets/SearchBar.css'

export default function SearchBar(){

    const dogs = useSelector((state) => state.dogs);
    const dispatch = useDispatch();

    const [breed, setBreed] = useState("");
    function handleChange(e){
        setBreed(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchBreeds(breed));
        setBreed("");
    };

    return (
        <div className="search-container">
            <form onSubmit={e => handleSubmit(e)}>
                <input 
                    placeholder="Search breeds..."
                    type='text'
                    value={breed}
                    onChange={ e => handleChange(e)}
                    ></input>
                <button>Search</button>
            </form>
        </div>
    )
}