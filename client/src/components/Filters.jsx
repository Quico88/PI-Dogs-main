import React from "react";
import { useDispatch } from "react-redux";
import { filterDogsBySource, removeFilters } from "../actions";

export default function Filters () {
    const dispatch = useDispatch();
    
    function handleSelect(e){
        if(e.target.value === "breeds_from_API")
            dispatch(filterDogsBySource(false))
        else if (e.target.value === "breeds_HG")
            dispatch(filterDogsBySource(true))
        else dispatch(removeFilters());
    }

    return(
        <div>
            <select name="API vs Homegrown" onChange={(e)=>handleSelect(e)}>
                <option value="breeds_from_API">Breeds from our list</option>
                <option value="breeds_HG">Breeds created by users</option>
                <option value="all_breeds">All breeds</option>
            </select>
            <select name="temperaments">
                <option>???</option>
            </select>
        </div>
    )
}