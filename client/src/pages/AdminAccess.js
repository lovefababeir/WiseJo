import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
import axios from "axios";
import "./AdminAccess.scss";

const AdminAccess = () => {
	const { createToken } = useAuth();
	const [itemList, setItemList] = useState("");
	const [oldItems, setOldItems] = useState("");
	const [storeInfo, setStoreInfo] = useState("");

	useEffect(() => {
		itemStats();
		storeStats();
	}, [createToken]);

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
					setItemList(res.data.items);
					setOldItems(res.data.oldItems);
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
					setStoreInfo(res.data.storeResults);
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
