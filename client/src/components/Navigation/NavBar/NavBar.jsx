import React from "react";
import { NavLink } from "react-router-dom";
import s from './NavBar.module.css'

function NavBar() {
    return (
        <div className={s.NavBar}>
            <div className={s.linkContainer}>
                <NavLink to='/home'
                    className={isActive => isActive ? s.navLink : s.navLinkUnselected }>Home
                </NavLink>
                <NavLink to='/create'
                    className={isActive => isActive ? s.navLink : s.navLinkUnselected }>Create Breed
                </NavLink>
            </div>
            <span className={s.pageTitle}>Dogify</span>
        </div>
    )
}

export default NavBar;