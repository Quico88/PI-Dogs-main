import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreeds } from "../../../actions";
import s from './SearchBar.module.css';

export default function SearchBar(){

    const dispatch = useDispatch();

    const [breed, setBreed] = useState("");
    function handleChange(e){
        setBreed(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchBreeds(breed.toLowerCase()));
        setBreed("");
        document.getElementById('sourceSelector').value = "all_breeds";
        document.getElementById('tempSelector').value = "all";
    };

    return (
        <div className={s.searchContainer}>
            <form onSubmit={e => handleSubmit(e)}>
                <input className={s.searchBar}
                    placeholder="Search for breeds..."
                    type='text'
                    value={breed}
                    onChange={ e => handleChange(e)}
                    ></input>
                <button className={s.searchButton}>Search</button>
            </form>
        </div>
    )
}