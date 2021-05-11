import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";
import MenuBar from "./components/MenuBar";
import Results from "./pages/Results";
import RecordReceipt from "./pages/RecordReceipt";
import ReceiptsList from "./pages/ReceiptList";

function App() {
	return (
		<div className="App">
			<main className="main">
				<Router>
					<AuthProvider>
						<Switch>
							<Route path="/login" component={SignIn} />
							<Route path="/signup" component={SignUp} />
							<Route path="/forgot-password" component={ForgotPassword} />
							<PrivateRoute exact path="/" component={Dashboard} />
							<PrivateRoute path="/shop" component={Search} />
							<PrivateRoute path="/compare" component={Results} />
							<PrivateRoute path="/snap" component={RecordReceipt} />
							<PrivateRoute path="/track" component={ReceiptsList} />
						</Switch>
					</AuthProvider>
					{(window.location.pathname === "/shop" ||
						"/results" ||
						"/record" ||
						"/log") && <MenuBar />}
				</Router>
			</main>
		</div>
	);
}

export default App;
