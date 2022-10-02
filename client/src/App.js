import './App.css';
import { Route } from 'react-router-dom';
import CardsContainer from './components/Cards/CardsContainer/CardsContainer.jsx'
import LandingPage from './components/Navigation/LandingPage/LandingPage.jsx';
import BreedDetail from './components/Cards/BreedDetail/BreedDetail.jsx';
import CreateBreed from './components/Cards/CreateBreed/CreateBreed.jsx';
import About from './components/Cards/About/About';


function App() {

	return (
		<div className="App">
			<Route exact path='/' component={LandingPage}/>
			<Route exact path="/home" component={CardsContainer}/>
			<Route path="/create" component={CreateBreed}/>
			<Route path="/dog/:id" component={BreedDetail}/>
			<Route path="/about" component={About}/>
			<Route path="/edit/:id" component={CreateBreed}/>
		</div>
	);
}

export default App;
