import './App.css';
import ClassDetail from './components/ClassDetail';

import Login from './components/Login';
import { useAppSelector } from './store/hooks';

function App() {
	//CMNT
	console.log('APP');
	const { isLoggedIn } = useAppSelector((state) => state.project);

	return (
		<div className="App">{!isLoggedIn ? <Login /> : <ClassDetail />}</div>
	);
}

export default App;
