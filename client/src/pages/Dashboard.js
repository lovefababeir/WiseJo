import React, { useState } from "react";
import "./Dashboard.scss";
import jo from "../assets/images/WiseJo.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Dashboard = () => {
	const { currentUser, logout } = useAuth();
	const { error, setError } = useState("");
	const history = useHistory();
	const signoutHandler = async e => {
		e.preventDefault();
		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Sorry, we could not sign you out");
		}
	};
	const userName = currentUser.displayName.split(" ")[0];
	const pageHandler = page => {
		history.push(`/${page}`);
	};
	const greeting = userName ? `Hello ${userName}!` : "Hello!";
	return (
		<div>
			<section className="home">
				<div className="home__logo-bg">
					<img className="home__logo" src={jo} alt="Home logo" />
				</div>
				<h2 className="home__heading">
					{greeting}
					<br />
					What would you like to do today?
				</h2>

				<div className="home__nav">
					<button className="home__btn" onClick={() => pageHandler("shop")}>
						Shop
					</button>
					<button className="home__btn" onClick={() => pageHandler("compare")}>
						Compare Prices
					</button>
					<button className="home__btn" onClick={() => pageHandler("snap")}>
						Log Shopping
					</button>
					<button onClick={() => pageHandler("track")} className="home__btn">
						Track History
					</button>
				</div>
				{error && <Alert variant="warning">{error}</Alert>}
				<div className="userProfile">
					<h1 className="userProfile__email">{currentUser && currentUser.email}</h1>
					<button onClick={signoutHandler} className="userProfile__signOut">
						Sign Out
					</button>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
