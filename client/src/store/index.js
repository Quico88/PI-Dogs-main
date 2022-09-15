import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "../reducers";

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));
export default store;