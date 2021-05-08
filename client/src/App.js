import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" component={SignIn}></Route>
					<Route path="/dashboard" component={Dashboard}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
