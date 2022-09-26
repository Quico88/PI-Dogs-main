import React from "react";
import { useDispatch } from "react-redux";
import { sortAlphabetically, sortByWeight } from "../../../actions";
import s from './SortSelection.module.css'


export default function SortSelection (){

    const dispatch = useDispatch();
    function handleChange(e){
        if(e.target.name === 'alphabetical'){
            dispatch(sortAlphabetically(e.target.value));
            document.getElementById('weightSort').value='title';
        }
            
        if(e.target.name === 'weight'){
            dispatch(sortByWeight(e.target.value));
            document.getElementById('alphabeticalSort').value='title';
        }
    }

    return (
        <div className={s.sortContainer}>
            {/* <span>Sort:</span> */}
            <select className={s.alphabetical} id='alphabeticalSort' name='alphabetical' defaultValue='title' onChange={e => handleChange(e)}>
                <option disabled value='title'>Alphabetically</option>
                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
            </select>
            <select className={s.weight} id='weightSort' name='weight' defaultValue='title' onChange={e => handleChange(e)}>
                <option disabled  value='title'>By weight</option>
                <option value='asc'>From lightest</option>
                <option value='des'>From heaviest</option>
            </select>
        </div>
    )
        
    
}
