import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
import axios from "axios";
import "./AdminAccess.scss";

const AdminAccess = () => {
	const { createToken } = useAuth();

	const deleteOldEntries = () => {
		createToken().then(token => {
			axios.delete(`${process.env.REACT_APP_BASE_URL}admin/olditems`, token);
		});
	};

	const itemStats = () => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items`, token)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		});
	};

	const storeStats = () => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items/stores`, token)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		});
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Adminstrator</h2>
					<div className="admin">
						<button className="formBtn" onClick={deleteOldEntries}>
							Delete Old Entries{" "}
						</button>
						<button className="formBtn" onClick={itemStats}>
							Get item stats{" "}
						</button>
						<button className="formBtn" onClick={storeStats}>
							Get store stats{" "}
						</button>
					</div>
					<ButtonDashboard />
				</Card.Body>
			</Card>
		</>
	);
};

export default AdminAccess;
