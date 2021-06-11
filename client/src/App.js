import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
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
import { useState, useEffect } from "react";
import Profile from "./pages/Profile";
import About from "./pages/About";

const usePageViews = () => {
	const location = useLocation();
	return location;
};

function App() {
	const [viewMenu, setViewMenu] = useState(false);

	const onPage = usePageViews().pathname;
	useEffect(() => {
		let mounted = true;

		if (
			(onPage === "/shop" ||
				onPage === "/compare" ||
				onPage === "/snap" ||
				onPage === "/track") &&
			mounted === true
		) {
			setViewMenu(true);
		} else {
			setViewMenu(false);
		}
		return () => {
			mounted = false;
		};
	}, [onPage]);

	return (
		<div
			className={`App${
				onPage === "/shop" || onPage === "/snap" || onPage === "/login"
					? " gradientBG"
					: ""
			}`}
		>
			<main className="main">
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
						<PrivateRoute path="/myprofile" component={Profile} />
						<PrivateRoute path="/about" component={About} />
					</Switch>
				</AuthProvider>
				{viewMenu && <MenuBar />}
			</main>
		</div>
	);
}

export default App;
