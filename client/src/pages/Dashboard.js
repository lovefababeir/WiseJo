import React, { useState } from "react";
import "./Dashboard.scss";
import jo from "../assets/images/WiseJo.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import DashboardNavItems from "../components/DashboardNavItems";
import { v4 as uuidv4 } from "uuid";

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
	const userName = currentUser.displayName?.split(" ")[0];
	const greeting = userName ? `Hello ${userName}!` : "Hello!";

	const dashboardNav = [
		{ page: "about", buttonText: "Learn About WiseJo" },
		{ page: "myprofile", buttonText: "	Check Profile" },
		{ page: "shop", buttonText: "Shop and Compare" },
		{ page: "snap", buttonText: "Snap and Track" },
		{ page: "contact-wisejo", buttonText: "Contact WiseJo" },
	];

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
					{dashboardNav.map(item => {
						return (
							<DashboardNavItems
								page={item.page}
								text={item.buttonText}
								key={uuidv4}
							/>
						);
					})}
					<button onClick={signoutHandler} className="userProfile__signOut">
						Sign Out
					</button>
				</div>

				{error && <Alert variant="warning">{error}</Alert>}
			</section>
		</div>
	);
};

export default Dashboard;
