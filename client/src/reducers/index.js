const initialState = {
    dogs: [],
    dogs_backup: [],
    temperaments: [],
    dog_details: {},
    loading: false
}

export default function rootReducer (state = initialState, action) {
    switch(action.type){
        case "GET_TEMPERAMENTS":return ({
            ...state,
            temperaments: action.payload,
        })
        case "START_LOADING":return ({
            ...state,
            loading: true,
        })
        case "GET_DOGS":
            return ({
                ...state,
                dogs: action.payload,
                dogs_backup: action.payload,
                loading: false
            })
        case "GET_DOG_DETAILS":
            return ({
                ...state,
                dog_details: action.payload,
                loading: false
            })
        case "CLEAN_DOG_DETAILS":
            return ({
                ...state,
                dog_details: [],
            })
        case "FILTER_DOGS_BY_SOURCE":
            return ({
                ...state,
                dogs: state.dogs_backup.filter( breed => breed.home_grown_data === action.payload)
            })
        case "FILTER_DOGS_BY_TEMP":
            return ({
                ...state,
                dogs: state.dogs_backup.filter( breed => breed.temperaments?.some(temp => temp.name === action.payload))
            })
        case "FILTER_DOGS":
            return ({
                ...state,
                dogs: state.dogs_backup.filter( breed => { return breed.temperaments?.some(temp => temp.name === action.payload.temperament) && breed.home_grown_data === action.payload.HG} )
            })
        case "SEARCH_BREEDS":
            return ({
                ...state,
                dogs: action.payload,
            })
        case "REMOVE_FILTERS":
            return({
                ...state,
                dogs: state.dogs_backup
            })
        case "CREATE_DOG":
            return({
                ...state,
                dogs: [...state.dogs,action.payload],
                dogs_backup: [...state.dogs_backup,action.payload]
            })
        case "UPDATE_DOG":
            let id = action.payload.id;
            return({
                ...state,
                dogs: [...state.dogs.filter(dog => dog.id != id),action.payload],
                dogs_backup: [...state.dogs_backup.filter(dog => dog.id != id),action.payload]
            })
        case "DELETE_DOG":
            return({
                ...state,
                dogs: state.dogs.filter( breed => breed.id !== action.payload),
                dogs_backup: state.dogs_backup.filter( breed => breed.id !== action.payload)
            })
        case "SORT_DOGS_ALPHABETICALLY":
            const sortedDogsABC = [...state.dogs];
            if(action.payload === 'asc'){
                sortedDogsABC.sort( (a,b) => a.name.localeCompare(b.name))
            }
            else {
                sortedDogsABC.sort( (a,b) => b.name.localeCompare(a.name))
            }
            return({
                ...state,
                dogs: sortedDogsABC
            })
        case "SORT_DOGS_BY_WEIGHT":
            const sortedDogsByWeight = [...state.dogs];
            sortedDogsByWeight.forEach( dog => dog.avgWeight = dog.weight.split(' - ').reduce( (a,b) => parseInt(a)+parseInt(b))/2)            
            if(action.payload === 'asc'){
                sortedDogsByWeight.sort( (a,b) => a.avgWeight - b.avgWeight)
            }
            else {
                sortedDogsByWeight.sort( (a,b) => b.avgWeight - a.avgWeight)
            }
            return({
                ...state,
                dogs: sortedDogsByWeight
            })
        default: return {...state};
    }

};

