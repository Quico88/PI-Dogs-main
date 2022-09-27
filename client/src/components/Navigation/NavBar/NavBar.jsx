import React from "react";
import { NavLink } from "react-router-dom";
import s from './NavBar.module.css'
import home from '../../../Images/home-3.png';

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
                <NavLink to='/about'
                    className={isActive => isActive ? s.navLink : s.navLinkUnselected }>About
                </NavLink>
            </div>
            {/* <NavLink to='/home' className={s.home}>
                    <img src={home} alt='home'/>
            </NavLink> */}
            <span className={s.pageTitle}>Dogify</span>
        </div>
    )
}

export default NavBar;