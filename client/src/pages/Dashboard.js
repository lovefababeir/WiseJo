import React, { useState } from "react";
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
	return (
		<div>
			{error && <Alert variant="warning">{error}</Alert>}
			<h1>{currentUser && currentUser.email}</h1>
			<button onClick={signoutHandler}>Sign Out</button>
		</div>
	);
};

export default Dashboard;
