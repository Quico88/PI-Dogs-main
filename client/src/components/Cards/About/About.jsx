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
                <p><b>Dogify</b> is a Single Page Application that was built as part as the <b>Henry</b> Fullstack Developer Bootcamp final project in September 2022.</p>
                <p>The site is entirely built with JavaScript and HTML, and formatted with Vanilla CSS through CSS Modules. It permits the user to find information about 172 dog breeds, which are illustrative and were extracted from <a href='https://thedogapi.com'>"The Dog API"</a></p>
                <p>Addittionally, users are able to go thorugh a complete CRUD cycle while creating, reading, updating and deleting their own dog breeds. These breeds are storaged in a SQL database which was created with PostgresSQL and is manipulated through Sequelize.</p>
               <p>All dog breeds -from the API and created by users - are rendered in pages up to 9 dogs, and they can be filtered in a combined way by source and by Temperaments.
                In addition, the desired selection of dogs can be sorted either by weigth or alphabetically, in both ascendent and descendent ways.
                Breeds can also be searched by name.</p>
                <p>The Front-End was built using React functional components and hooks. Global states were managed using Redux.</p>
               

                <p>Technologies used:</p>
                <ul>
                    <li>React</li>
                    <li>React-Router</li>
                    <li>Redux</li>
                    <li>Express</li>
                    <li>Node.js</li>
                    <li>Sequelize</li>
                    <li>PostgresSQL</li>
                </ul>
                <p>Thanks for visting Dogify!</p>
                <p>Designed and developed by <br></br><br></br> <b>Juan Francisco Drewanz</b> <a href="https://www.linkedin.com/in/juan-francisco-drewanz-7b099226/"><img className={s.logoLkdin} src={logoLkdin} alt='Logo Linkedin'/></a><a href="https://github.com/Quico88"><img className={s.logoLkdin} src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Logo GitHub'/></a></p>
            </div>
        </div>
    )
}