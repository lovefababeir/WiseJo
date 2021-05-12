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
			console.log("Sorry, we could not sign you out");
			setError("Sorry, we could not sign you out");
		}
	};

	const pageHandler = page => {
		history.push(`/${page}`);
	};
	return (
		<div>
			<section className="home">
				<div className="home__logo-bg">
					<img className="home__logo" src={jo} alt="Home logo" />
				</div>
				<h2 className="home__heading">
					Hello Love!
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
				<h1 className="home__userEmail">{currentUser && currentUser.email}</h1>
				<button onClick={signoutHandler} className="home__signOut">
					Sign Out
				</button>
			</section>
		</div>
	);
};

export default Dashboard;
