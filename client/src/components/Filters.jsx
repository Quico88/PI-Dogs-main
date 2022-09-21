import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsBySource, filterDogsByTemp, removeFilters } from "../actions";
import './stylesheets/Filters.css'

export default function Filters () {
    const dispatch = useDispatch();

    const { temperaments } = useSelector((state) => state);
    
    function handleSrcSelect(e){
        if(e.target.value === "breeds_from_API")
            dispatch(filterDogsBySource(false))
        else if (e.target.value === "breeds_HG")
            dispatch(filterDogsBySource(true))
        else dispatch(removeFilters());
    }

    function handleTempSelect(e){
        if(e.target.value === 'all'){
            dispatch(removeFilters());
        }
        else dispatch(filterDogsByTemp(e.target.value));
    }

    return(
        <div className="filter-container">
            <select name="API vs Homegrown" onChange={(e)=>handleSrcSelect(e)}>
                <option value="breeds_from_API">Breeds from our list</option>
                <option value="breeds_HG">Breeds created by users</option>
                <option value="all_breeds">All breeds</option>
            </select>
            <select name="temperaments" onChange={ e => handleTempSelect(e)}>
                <option value='all' >All</option>
                {   temperaments.map( (temp) => {
                    return(
                    <option key={temp.id} value={temp.name}>{temp.name}</option>)
                    })
                }
            </select>
        </div>
    )
}