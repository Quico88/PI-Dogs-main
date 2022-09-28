import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';

//GET ACTIONS

export function getDogs () {
    return async function(dispatch) {
        dispatch({ type: "START_LOADING"});
        const dogs = await axios.get(`${SERVER_URL}/dogs`);
        return (
            dispatch({
                    type: "GET_DOGS",
                    payload: dogs.data
            })
        )
    }
    
}

export function getDogDetails (id) {
    return async function(dispatch) {
        dispatch({ type: "START_LOADING"});
        try {    
            const details = await axios.get(`${SERVER_URL}/dogs/${id}`);
            return (
                dispatch({
                        type: "GET_DOG_DETAILS",
                        payload: details.data
                })
            )
        }
        catch (e) {
            return (
                dispatch({
                    type: "GET_DOG_DETAILS",
                    payload: []
            })
            )
        }
    }
    
}

export function cleanDogDetails () {
    return { type: "CLEAN_DOG_DETAILS"}
}

export function getTemperaments () {
    return async function(dispatch) {
        // dispatch({ type: "START_LOADING"});
        const temperaments = await axios.get(`${SERVER_URL}/temperaments`);
        return (
            dispatch({
                    type: "GET_TEMPERAMENTS",
                    payload: temperaments.data
            })
        )
    }
    
}

//SEARCH ACTION

export function searchBreeds (breed) {
    return async function(dispatch) {
        try{
            const dogs = await axios.get(`${SERVER_URL}/dogs?name=${breed}`);
            return (
                dispatch({
                        type: "SEARCH_BREEDS",
                        payload: dogs.data
                })
            )
        }
        catch(e){
            return (
                dispatch({
                        type: "SEARCH_BREEDS",
                        payload: [null]
                })
            )
        }
        
    }
    
}

//FILTER ACTIONS

export function filterDogsBySource (payload) {
    return { type: "FILTER_DOGS_BY_SOURCE", payload }
}

export function filterDogsByTemp (payload) {
    return { type: "FILTER_DOGS_BY_TEMP", payload }
}

export function filterDogs (payload){
    return { type: "FILTER_DOGS", payload }
}

export function removeFilters(){
    return { type: "REMOVE_FILTERS" , payload: null}
}

//SORT ACTIONS

export function sortByWeight (payload) {
    return { type: "SORT_DOGS_BY_WEIGHT", payload }
}

export function sortAlphabetically (payload) {
    return { type: "SORT_DOGS_ALPHABETICALLY", payload }
}

//POST ACTION

export function createBreed (payload) {
    return async function() {
        try {
            const response = await axios.post(`${SERVER_URL}/dogs`,payload);
        }
        catch (e) {
            alert(e.response.data)
        }
    }
    
}

//DELETE ACTIONS

export function deleteBreed(id) {
    return async function(dispatch){
        try{
            await axios.delete(`${SERVER_URL}/dogs/${id}`) 
            return (
                dispatch({
                        type: "DELETE_DOG",
                        payload: id
                })
            )       
        }
        catch (e){
            console.log(e.message);
        }
    }
}

//LOADING

export default function startLoading (){
    return({
        type: 'START_LOADING'
    })
}