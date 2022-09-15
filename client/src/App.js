import './App.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CardsContainer from './components/CardsContainer';
import LandingPage from './components/LandingPage';


function App() {
	return (
		<div className="App">
			<Route exact path='/'>
				<LandingPage/>
			</Route>
			<Route path="/home">
				<NavBar/>
			</Route>
			<Route exact path="/home">
				<CardsContainer/>
			</Route>

			<Route path="/home/create">
			</Route>
			<Route path="/home/details">
			</Route>
		</div>
	);
}

export default App;
