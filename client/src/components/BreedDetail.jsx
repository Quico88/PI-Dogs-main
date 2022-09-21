import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../actions";
import NavBar from "./NavBar";
import './stylesheets/BreedDetail.css'
import default_dog_pic from '../Images/dog.png';

export default function BreedDetail(props){
    
    const { id } = props.match.params;
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(getDogDetails(id));
    }, []);

    const dog_details = useSelector((globalState) => globalState.dog_details);

    const { name, image_url, weight, height, life_span, temperaments } = dog_details;
    let stringOfTemperaments = temperaments?.map(temp => temp.name).join(', ');

    return ( 
        <div className="breed-details">
            <NavBar></NavBar>
            <h3>{name}</h3>
            <img className="dogImage" src={image_url ? image_url : default_dog_pic } alt="dog"/>
            <span>Weight: {weight} kg</span>
            <span>Height: {height} cm</span>
            <span>Life Span: {life_span}</span>
            <span> {stringOfTemperaments} </span>
        </div>
    )
}

