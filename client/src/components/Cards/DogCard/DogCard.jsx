import React from "react";
import { NavLink, Link } from "react-router-dom";
import s from './DogCard.module.css'
import default_dog_pic from '../../../Images/dog.png'
import { deleteBreed, filterDogsByTemp } from "../../../actions";
import { useDispatch } from "react-redux";


export default function DogCard(props) {
    const { id, name, image, weight, temperament, height, hg } = props;
    //let stringOfTemperaments = temperament?.map(temp => temp.name).join(', ');

    const dispatch = useDispatch();

    function handleClick() {
        if(window.confirm("Are you sure you would like to delete this breed?")) dispatch(deleteBreed(id)); 
    }

    function selectTemp (e) {
        let temp = e.target.innerHTML;
        document.getElementById('tempSelector').value = temp;
        document.getElementById('sourceSelector').value = "all_breeds";
        dispatch(filterDogsByTemp(temp));
    }
    
    return (

            <div className={s.dogCardContainer}>
                <div className={s.imgContainer}>
                    <img className={s.dogImage} src={image? image : default_dog_pic} alt="dog"/>
                </div>
                <div className={s.contentContainer}>
                    { hg? <button className={s.deleteBtn} onClick={ () => handleClick()}>X</button> : ''}
                    <div className={s.contentContainerTop}>
                        <NavLink to={`/dog/${id}`} className={s.dogLink}>
                            <h3 className={s.dogTitle}>{name}</h3>
                        </NavLink>  
                    </div >
                    <div className={s.contentContainerBody}>
                        <span className={s.weight}>Weight: {weight} kg</span>
                        <br></br>
                        <span className={s.weight}>Height: {height} cm</span>
                        <br></br>
                    </div>
                    <div className={s.contentContainerTemps}>
                        <span className={s.tempTitle}>Temperaments</span>
                        <div className={s.tempsList}>
                            {temperament?.map(temp => 
                                <span 
                                    key={temp.id} 
                                    className={s.tempItem} 
                                    onClick={(e)=> selectTemp(e)} 
                                    value={temp.name}
                                    >{temp.name}
                                </span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

