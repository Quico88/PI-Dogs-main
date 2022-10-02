import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsBySource, filterDogsByTemp, removeFilters, filterDogs } from "../../../actions";
import s from './Filters.module.css';
import clear from '../../../Images/cleaning_services.png';
import { useEffect } from "react";

var source = 'all_breeds';
var temperament = 'all';

export default function Filters () {
    const dispatch = useDispatch();

    const { temperaments, dogs, dogs_backup } = useSelector((state) => state);

    useEffect( ()=> {
        if (dogs.length !== dogs_backup.length){
            document.getElementById('sourceSelector').value = source;
            document.getElementById('tempSelector').value = temperament;
        }
    } , [] );
    
    function handleSelect(e){
        source = document.getElementById('sourceSelector').value;
        temperament = document.getElementById('tempSelector').value;
        let HG='';

        if (source === 'breeds_from_API') HG = false;
        else if (source === 'breeds_HG') HG = true;

        document.getElementById('weightSort').value='title';
        document.getElementById('alphabeticalSort').value='title';
        
        if(source === "all_breeds" && temperament==='all') return dispatch(removeFilters());
        if (source === "all_breeds") return dispatch(filterDogsByTemp(temperament));
        if (temperament === "all") return dispatch(filterDogsBySource(HG));
        
        dispatch(filterDogs({HG, temperament}));
    }

    function handleClick(){
        document.getElementById('sourceSelector').value='all_breeds';
        document.getElementById('tempSelector').value='all';
        dispatch(removeFilters());
    }

    return(
        <div className={s.filterContainer}>
            <select className={s.source} id='sourceSelector' name="API vs Homegrown" defaultValue='all_breeds' onChange={(e)=>handleSelect(e)}>
                <option disabled value='title'>Filter by Source</option>
                <option value="all_breeds">All breeds</option>
                <option value="breeds_from_API">Breeds from our list</option>
                <option value="breeds_HG">Breeds created by users</option>
            </select>
            <select className={s.temperaments} id='tempSelector' name="temperaments" defaultValue='all' onChange={ e => handleSelect(e)}>
                <option disabled value='title'>Filter by Temperament</option>
                <option value='all' >All</option>
                {   temperaments.map( (temp) => {
                    return(
                    <option key={temp.id} value={temp.name}>{temp.name}</option>)
                    })
                }
            </select>
            <img src={clear} alt='remove_filter' className={s.cleanFilter} onClick={handleClick}/>
        </div>
    )
}