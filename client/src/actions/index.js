import axios from 'axios';

const SERVER_URL = 'http://localhost:3001/dogs';

export function getDogs () {
    return async function(dispatch) {
        const dogs = await axios.get(SERVER_URL);
        return (
            dispatch({
                    type: "GET_DOGS",
                    payload: dogs.data
            })
        )
    }
    
}

export function filterDogsBySource (payload) {
    return { type: "FILTER_DOGS_BY_SOURCE", payload }
}

export function searchBreeds (breed) {
    return async function(dispatch) {
        try{
            const dogs = await axios.get(`${SERVER_URL}?name=${breed}`);
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

export function removeFilters(){
    return { type: "REMOVE_FILTERS" , payload: null}
}
