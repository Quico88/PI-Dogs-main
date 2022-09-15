import React from "react";
import { Link } from 'react-router-dom';
import './stylesheets/LandingPage.css'

export default function LandingPage(){

    return (
        <div className="landingMain">
            <h1>Welcome to Henry Dogs</h1>
            <Link to='/home'>
                <button>Enter site</button>
            </Link>
        </div>
    )
}