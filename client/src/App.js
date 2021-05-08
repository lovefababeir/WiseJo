import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" component={SignIn}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
