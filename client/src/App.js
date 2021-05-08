import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<Route exact path="/" component={SignIn}></Route>
						<Route path="/dashboard" component={Dashboard}></Route>
						<Route path="/signup" component={SignUp}></Route>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
