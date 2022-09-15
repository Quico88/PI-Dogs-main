const initialState = {
    dogs: [],
    dogs_backup: []
}

export default function rootReducer (state = initialState, action) {
    switch(action.type){
        case "GET_DOGS":
            return ({
                ...state,
                dogs: action.payload,
                dogs_backup: action.payload
            })
        case "FILTER_DOGS_BY_SOURCE":
            console.log(action.payload);
            return ({
                ...state,
                dogs: state.dogs_backup.filter( breed => breed.home_grown_data === action.payload)
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

        default: return {...state};
    }

};