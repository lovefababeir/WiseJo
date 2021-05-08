import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
						<Route path="/login" component={SignIn}></Route>
						<Route path="/signup" component={SignUp}></Route>
						<Route path="/forgot-password" component={ForgotPassword}></Route>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
