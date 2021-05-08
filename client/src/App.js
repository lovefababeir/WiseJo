import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<Route path="/" component={SignIn}></Route>
						<Route path="/dashboard" component={Dashboard}></Route>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
