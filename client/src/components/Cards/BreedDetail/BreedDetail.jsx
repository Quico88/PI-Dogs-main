import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDogDetails, getDogDetails } from "../../../actions"
import NavBar from "../../Navigation/NavBar/NavBar"
import s from './BreedDetail.module.css'
import default_dog_pic from '../../../Images/dog.png'
import Loading from "../../Navigation/Loading/Loading";
import { Link } from "react-router-dom";
import pen from "../../../Images/pen.png";

 export default function BreedDetail(props){
    
    const { id } = props.match.params;
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(getDogDetails(id));
        return () => dispatch(cleanDogDetails())
    }, []);

    const {dog_details, loading} = useSelector((globalState) => globalState);

    const { name, image_url, weight, height, life_span, temperaments, home_grown_data, bred_for } = dog_details;
    let stringOfTemperaments = temperaments?.map(temp => temp.name).join(', ');

    return ( 
        <div className={s.breedDetails}>
            <div className={s.pageTop}>
                <NavBar></NavBar>
            </div>
            <div className={s.mainPage}>
                { loading? <Loading/> :
                    <div className={s.detailContainer}>
                        <Link to='/home'><button className={s.closeBtn}>x</button></Link>
                        <div className={s.titleCont}>
                            <h3 className={s.breedTitle}>{name}</h3>{ home_grown_data && <Link to={`/edit/${id}`}><img className={s.pen} src={pen} alt='pen' /></Link>}
                        </div>
                        <div className={s.breedInfo}>
                            <img className={s.dogImage} src={image_url ? image_url : default_dog_pic } alt="dog"/>
                            <div className={s.breedInfoTxt}> 
                                <span className={s.desc}><b>Weight: </b>{weight} kg</span>
                                <span className={s.desc}><b>Height: </b>{height} cm</span>
                                <span className={s.desc}><b>Life Span: </b>{life_span}</span>
                                <span className={s.desc}><b>Bred for: </b>{bred_for}</span>
                                <br></br>
                                <span><b>Temperaments:</b></span>
                                <span> {stringOfTemperaments} </span>
                                <br></br>
                            </div>
                        </div>
                    </div>
                }    
            </div>    
        </div>
    )
}

