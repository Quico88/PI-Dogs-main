import React from "react";
import './stylesheets/paginado.css'

export default function Paginado({paginado, dpp, dogsQnty}){

    let pageQnty = Math.ceil(dogsQnty / dpp);
    const pageNumbers = [];


    for (let i = 1; i <= pageQnty ; i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers &&pageNumbers.map( page =>
                <li className="page_number" key={page}><a onClick={ () => paginado(page)}>{page}</a></li>)}
            </ul>  
        </nav>
    )
}