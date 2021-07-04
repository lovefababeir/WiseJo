import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
import axios from "axios";
import "./AdminAccess.scss";
import Collapse from "react-bootstrap/Collapse";
import arrow from "../assets/images/collapsearrow.png";

const AdminAccess = () => {
	const { createToken } = useAuth();
	const [itemList, setItemList] = useState("");
	const [oldItems, setOldItems] = useState("");
	const [storeData, setStoreData] = useState("");
	const [openList, setOpenList] = useState(false);
	const [openOldItemsInfo, setOpenOldItemsInfo] = useState(false);
	const [openStoreData, setOpenStoreData] = useState(false);

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
					setItemList(res.data.items.searchWords);
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
					setStoreData(res.data.storeResults);
				})
				.catch(err => {
					console.log(err);
				});
		});
	};
	console.log(itemList);
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
						<div
							onClick={() => {
								setOpenList(!openList);
							}}
							aria-controls="appData"
							aria-expanded={openList === "shop"}
							className="appData__title"
						>
							<img
								src={arrow}
								className={`collapse-arrow ${openList ? "collapse-arrow--open" : ""}`}
							/>
							List of Items Searched
						</div>
						<Collapse in={openList}>
							<div id="appData" className="appData__stats">
								<ul>
									{itemList.length &&
										itemList.map(item => {
											return <li>{item}</li>;
										})}
								</ul>
							</div>
						</Collapse>
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
