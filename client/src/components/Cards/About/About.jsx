import React from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import s from './about.module.css'
import logoLkdin from '../../../Images/logo-linkedin.png'

export default function About(){
    return (
        <div className={s.about}>
            <div className={s.pageTop}>
                <NavBar/>
            </div>
            <div className={s.aboutContent}>
                <h1 className={s.title}>About</h1>    
                <p><b>Dogify</b> was built as part as the <b>Henry</b> Fullstack Developer Bootcamp final project in September 2022</p>
                <p>Breeds details are illustrative and were extracted from <a href='https://thedogapi.com'>"The Dog API"</a></p>
                <p>Technologies used:</p>
                <ul>
                    <li>React</li>
                    <li>Redux</li>
                    <li>Express</li>
                    <li>Node.js</li>
                    <li>Sequelize</li>
                    <li>PostgresSQL</li>
                </ul>
                <p>Thanks for visting Dogify!</p>
                <p>Designed and developed by <br></br><br></br> <b>Juan Francisco Drewanz</b> <a href="https://www.linkedin.com/in/juan-francisco-drewanz-7b099226/"><img className={s.logoLkdin} src={logoLkdin}/></a></p>
            </div>
        </div>
    )
}