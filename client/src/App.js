import './App.css';
import { Route } from 'react-router-dom';
import CardsContainer from './components/CardsContainer';
import LandingPage from './components/LandingPage';
import BreedDetail from './components/BreedDetail';
import CreateBreed from './components/CreateBreed';


function App() {

	return (
		<div className="App">
			<Route exact path='/' component={LandingPage}/>
			<Route exact path="/home" component={CardsContainer}/>
			<Route path="/create" component={CreateBreed}/>
			<Route path="/dog/:id" component={BreedDetail}/>
		</div>
	);
}

export default App;
