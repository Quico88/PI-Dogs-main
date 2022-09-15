import React from "react";
import { NavLink } from "react-router-dom";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import './stylesheets/NavBar.css'

function NavBar() {
    return (
        <div>
            <h1>Henry dogs. Which is your favourite?</h1>
            <SearchBar/>
            <Filters/>
            <div className="link-container">
                <NavLink to='/home'
                    className={isActive =>
                        "nav-link" + (!isActive ? "_unselected" : "")
                    }>Home</NavLink>
                <NavLink to='/home/create'
                    className={isActive =>
                        "nav-link" + (!isActive ? "_unselected" : "")
                    }>Create Breed</NavLink>
            </div>
        </div>
    )
}

export default NavBar;