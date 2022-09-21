import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getDogs, getTemperaments } from "../actions";
import './stylesheets/LandingPage.css'

export default function LandingPage(){

    const dispatch = useDispatch();
    const { dogs, temperaments } = useSelector((state) => state);
    useEffect( () =>{ if(!dogs.length) dispatch(getDogs())}, [dogs]);
    useEffect( () => { if(!temperaments.length) dispatch(getTemperaments())},[temperaments] )
    
    
    return (
        <div className="landingMain">
            <div className="rectangle">
                <h1>Welcome to Dogify</h1>
                <div className="button-container">
                    <p>Find your next best friend</p>
                    <Link to='/home'>
                        <button>Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}