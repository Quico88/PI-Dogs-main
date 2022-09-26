import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../../actions";
import DogCard from "../DogCard/DogCard";
import Filters from "../../Navigation/Filters/Filters"
import NavBar from "../../Navigation/NavBar/NavBar";
import Paginado from "../../Navigation/Paginado/Paginado";
import SortSelection from "../../Navigation/SortSelection/SortSelection"
import Loading from '../../Navigation/Loading/Loading';
import SearchBar from "../../Navigation/SearchBar/SearchBar";
import s from './CardsContainer.module.css';

function CardsContainer() {

    const { dogs,temperaments, loading } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 9;
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
        <div className={s.cardsFullPage}>
                <div className={s.pageTop}>
                    <NavBar></NavBar>
                </div>
                <div className={s.searchContainer}>
                        <div className={s.blank}></div>
                        <SearchBar/>
                        <Filters/>
                </div>
                { loading? <Loading/> :
                    <div className={s.CardsContainer}>
                        {(dogs_currentPage.length && dogs_currentPage[0])? dogs_currentPage.map( (dog, index) => 
                            <DogCard
                                id={dog.id}
                                name={dog.name}
                                image={dog.image_url}
                                weight={dog.weight}
                                height={dog.height}
                                temperament={ dog.temperaments }
                                key={index}
                                hg = {dog.home_grown_data}
                            />    
                        ) : <span className={s.notFound}>No breeds were found on your search. Please try again!</span>}
                    </div> }
                <div className={s.pageBottom}>
                    <SortSelection/>
                    <Paginado
                        paginado = {paginado}
                        dpp = {dogsPerPage}
                        dogsQnty = {dogs.length}
                        currentPage = {currentPage}
                    />
                </div>
        </div>
    )
}

export default CardsContainer;