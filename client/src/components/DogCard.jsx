import React from "react";
import './stylesheets/DogCard.css'

export default function DogCard(props) {
    const { name, image, weight, temperament } = props;
    let stringOfTemperaments = temperament?.map(temp => temp.name).join();
    
    return (
        <div className="dogCardContainer">
            <h3>{name}</h3>
            <img className="dogImage" src={image} alt="image of a dog"/>
            <span>Weight: {weight} kg</span>
            <br></br>
            <span> {stringOfTemperaments} </span>
        </div>
    )
}

