import React from "react";
import { Link } from "react-router-dom";
import './stylesheets/DogCard.css'
import default_dog_pic from '../Images/dog.png'

//const default_dog_pic = 'client/src/Images/dog.png'

export default function DogCard(props) {
    const { id, name, image, weight, temperament } = props;
    let stringOfTemperaments = temperament?.map(temp => temp.name).join(', ');
    
    return (

            <div className="dogCardContainer">
                <Link to={`/dog/${id}`}>
                    <h3>{name}</h3>
                </Link>
                <img className="dogImage" src={image? image : default_dog_pic} alt="dog"/>
                <span>Weight: {weight} kg</span>
                <br></br>
                <span> {stringOfTemperaments} </span>
            </div>
    )
}

