import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../actions";
import DogCard from "./DogCard";
import Filters from "./Filters";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import SortSelection from "./SortSelection";
import './stylesheets/CardsContainer.css'


function CardsContainer() {

    const { dogs,temperaments } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const firstDogIndex_nextPage = currentPage * dogsPerPage
    const firstDogIndex_currentPage = firstDogIndex_nextPage - dogsPerPage;
    const dogs_currentPage = dogs.slice(firstDogIndex_currentPage,firstDogIndex_nextPage);

    const paginado = (page) => {
        setCurrentPage(page);
    }

    useEffect(()=> setCurrentPage(1),[dogs]) // Cada vez que cambia dogs, vuelvo a la pág 1
    useEffect( () =>{ if(!dogs.length) dispatch(getDogs())}, [dispatch]);
    useEffect( () => { if(!temperaments.length) dispatch(getTemperaments())},[temperaments] )
    
    return (
        <div className="cards-full-page">
        <NavBar></NavBar>
        <Filters></Filters>
                <div className="CardsContainer">
                    {(dogs_currentPage.length && dogs_currentPage[0])? dogs_currentPage.map( (dog, index) => 
                        <DogCard
                            id={dog.id}
                            name={dog.name}
                            image={dog.image_url}
                            weight={dog.weight}
                            temperament={ dog.temperaments }
                            key={index}
                        />    
                    ) : <span>No breeds were found on your search. Please try again!</span>}
                </div> 
                <div className="page-bottom">
                    <SortSelection/>
                    <Paginado
                        paginado = {paginado}
                        dpp = {dogsPerPage}
                        dogsQnty = {dogs.length}
                    />
                </div>
        </div>
    )
}

export default CardsContainer;