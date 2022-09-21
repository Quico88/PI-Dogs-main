import React from "react";
import { useDispatch } from "react-redux";
import { sortAlphabetically, sortByWeight } from "../actions";
import './stylesheets/SortSelection.css'


export default function SortSelection (){

    const dispatch = useDispatch();
    function handleChange(e){
        if(e.target.name === 'alphabetical')
            dispatch(sortAlphabetically(e.target.value));
        if(e.target.name === 'weight')
            dispatch(sortByWeight(e.target.value));
    }

    return (
        <div className="sort-container">
            <select name='alphabetical' defaultValue='title' onChange={e => handleChange(e)}>
                <option disabled value='title'>Alphabetically</option>
                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
            </select>
            <select name='weight' defaultValue='title' onChange={e => handleChange(e)}>
                <option disabled  value='title'>By weight</option>
                <option value='asc'>From Lighter</option>
                <option value='des'>From heaviest</option>
            </select>
        </div>
    )
        
    
}
