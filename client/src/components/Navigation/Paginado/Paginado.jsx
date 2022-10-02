import React, { useEffect } from "react";
import s from './paginado.module.css'

export default function Paginado({paginado, dpp, dogsQnty, currentPage}){

    let pageQnty = Math.ceil(dogsQnty / dpp);
    const pageNumbers = [];

    for (let i = 1; i <= pageQnty ; i++){
        pageNumbers.push(i)
    }

    function prevPage(page){
        if(page!==1) paginado(page-1)
    }

    function nextPage(page){
        if(page!== pageQnty) paginado(page+1)
    }
    
    useEffect(()=> {window.addEventListener("keydown",handleKeyDown);
    return () => window.removeEventListener('keydown',handleKeyDown)},[paginado])

   function handleKeyDown(key){
        let {keyCode} = key;
        if (keyCode === 37) prevPage(currentPage);
        if (keyCode === 39) nextPage(currentPage);
    }

    return (
        <nav>
            <div className={s.paginado}>
                <span className={s.page_number}><a onClick={ () => paginado(1)}>{'<<'}</a></span>
                <span className={s.page_number}><a onClick={ () => prevPage(currentPage)}>{'<'}</a></span>
                {pageNumbers &&pageNumbers.map( page =>
                    <span className={page!==currentPage? s.page_number : s.page_number_current} key={page}><a onClick={ () => paginado(page)}>{page}</a></span>
                )}
                <span className={s.page_number}><a onClick={ () => nextPage(currentPage)}>{'>'}</a></span>
                <span className={s.page_number}><a onClick={ () => paginado(pageQnty)}>{'>>'}</a></span>
            </div>  
        </nav>
    )
}