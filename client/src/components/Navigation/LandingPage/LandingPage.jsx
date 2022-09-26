import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getDogs, getTemperaments } from "../../../actions";
import s from './LandingPage.module.css'

export default function LandingPage(){

    const dispatch = useDispatch();
    const { dogs, temperaments } = useSelector((state) => state);
    useEffect( () =>{ if(!dogs.length) dispatch(getDogs())}, [dogs]);
    useEffect( () => { if(!temperaments.length) dispatch(getTemperaments())},[temperaments] )
    
    
    return (
        <div className={s.landingMain}>
            <div className={s.rectangle}>
                <h1>Welcome to Dogify</h1>
                <div className={s.buttonContainer}>
                    <p>Find your next best friend</p>
                    <Link to='/home'>
                        <button className={s.exploreButton}>Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}