import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import './stylesheets/NavBar.css'

function NavBar() {
    return (
        <div className="NavBar">
            <div className="link-container">
                <NavLink to='/home'
                    className={isActive =>
                        "nav-link" + (!isActive ? "_unselected" : "")
                    }>Home</NavLink>
                <NavLink to='/create'
                    className={isActive =>
                        "nav-link" + (!isActive ? "_unselected" : "")
                    }>Create Breed</NavLink>
            </div>
            <span className="page-title">Henry dogs. Which is your favourite?</span>
            <SearchBar/>
        </div>
    )
}

export default NavBar;