import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import DogCard from "./DogCard";
import Paginado from "./Paginado";
import './stylesheets/CardsContainer.css'


function CardsContainer() {

    const dispatch = useDispatch();
    const { dogs } = useSelector((state) => state);
    useEffect( () =>{ if(!dogs.length) dispatch(getDogs())}, [dogs]);
    

    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const firstDogIndex_nextPage = currentPage * dogsPerPage
    const firstDogIndex_currentPage = firstDogIndex_nextPage - dogsPerPage;
    const dogs_currentPage = dogs.slice(firstDogIndex_currentPage,firstDogIndex_nextPage);

    const paginado = (page) => {
        setCurrentPage(page);
    }
    
    return (
        <div className="cards-full-page">
                <div className="CardsContainer">
                    {(dogs_currentPage.length && dogs_currentPage[0])? dogs_currentPage.map( (dog, index) => 
                        <DogCard
                            name={dog.name}
                            image={dog.image_url}
                            weight={dog.weight}
                            temperament={ dog.temperaments }
                            key={index}
                        />    
                    ) : <span>No breeds were found on your search. Please try again!</span>}
                </div> 
                <Paginado
                    paginado = {paginado}
                    dpp = {dogsPerPage}
                    dogsQnty = {dogs.length}
                />
        </div>
    )
}

export default CardsContainer;