import React from "react";
import './stylesheets/paginado.css'

export default function Paginado({paginado, dpp, dogsQnty}){

    let pageQnty = Math.ceil(dogsQnty / dpp);
    const pageNumbers = [];

    for (let i = 1; i <= pageQnty ; i++){
        pageNumbers.push(i)
    }

    // function prevPage(){

    // }

    return (
        <nav>
            <div className="paginado">
                {/* <span><a onClick={ () => prevPage()}>{'<<<'}</a></span> */}
                {pageNumbers &&pageNumbers.map( page =>
                <span className="page_number" key={page}><a onClick={ () => paginado(page)}>{page}</a></span>)}
                {/* <span>{'>>>'}</span> */}
            </div>  
        </nav>
    )
}