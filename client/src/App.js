import './App.css';
import { Route } from 'react-router-dom';
import CardsContainer from './components/Cards/CardsContainer/CardsContainer.jsx'
import LandingPage from './components/Navigation/LandingPage/LandingPage.jsx';
import BreedDetail from './components/Cards/BreedDetail/BreedDetail.jsx';
import CreateBreed from './components/Cards/CreateBreed/CreateBreed.jsx';


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
