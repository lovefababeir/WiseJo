import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
import AdminAccessOldItems from "../components/AdminAccessOldItems";
import AdminAccessItems from "../components/AdminAccessItems";
import axios from "axios";
import "./AdminAccess.scss";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";
import arrow from "../assets/images/collapsearrow.png";
import { v4 as uuidv4 } from "uuid";

const AdminAccess = () => {
	const { createToken } = useAuth();
	const [itemList, setItemList] = useState("");
	const [oldItems, setOldItems] = useState("");
	const [storeData, setStoreData] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [openStoreData, setOpenStoreData] = useState(false);
	const [userData, setUserData] = useState("");
	const [openUserData, setOpenUserData] = useState(false);

	const storeStats = () => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items/stores`, token)
				.then(res => {
					setStoreData(res.data.storeResults);
					setErrMsg("");
				})
				.catch(() => {
					setErrMsg("Could not get an update on the store stats.");
				});
		});
	};

	useEffect(() => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items`, token)
				.then(res => {
					setItemList(res.data.items.searchWords);
					setOldItems(res.data.oldItems);
					setErrMsg("");
				})
				.catch(() => {
					setErrMsg("Could not get an update on the item stats.");
				});
		});
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items/stores`, token)
				.then(res => {
					setStoreData(res.data.storeResults);
					setErrMsg("");
				})
				.catch(() => {
					setErrMsg("Could not get an update on the store stats.");
				});
		});
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items/users`, token)
				.then(res => {
					setUserData({
						ids: res.data.users.IDs,
						emails: res.data.users.email.length,
						guests: res.data.users.IDs - res.data.users.email.length,
					});
					setErrMsg("");
				})
				.catch(() => {
					setErrMsg("Could not get an update on the user stats.");
				});
		});
	}, [createToken]);
	return (
		<>
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Adminstrator</h2>
					{errMsg && (
						<Alert variant="danger" style={{ marginTop: "3rem" }}>
							<Alert.Heading>Sorry, an error occurred</Alert.Heading>
							<p>{errMsg}</p>
							<hr />
							<p className="mb-0">
								Please check server and make sure you are signed-in
							</p>
						</Alert>
					)}
					<div className="admin">
						<AdminAccessOldItems
							createToken={createToken}
							oldItems={oldItems}
							setErrMsg={setErrMsg}
						/>
						<AdminAccessItems
							createToken={createToken}
							setErrMsg={setErrMsg}
							itemList={itemList}
							setItemList={setItemList}
						/>
						<div
							onClick={() => {
								setOpenStoreData(!openStoreData);
							}}
							aria-controls="appData"
							aria-expanded={openStoreData}
							className="appData__title"
						>
							<img
								src={arrow}
								className={`collapse-arrow ${
									openStoreData ? "collapse-arrow--open" : ""
								}`}
								alt=""
							/>
							Results on Store Performances
						</div>
						<Collapse in={openStoreData}>
							<div id="appData" className="appData__stats">
								<h4>Number of successful searches from each store:</h4>
								<ul>
									{storeData?.length &&
										storeData.map(item => {
											return (
												<li key={uuidv4()}>
													<span>
														{item.store}: {item.num_of_results}
													</span>{" "}
													({parseInt((item.num_of_results / itemList?.length) * 100)}%)
												</li>
											);
										})}
								</ul>
								<button className="formBtn" onClick={storeStats}>
									Update store stats{" "}
								</button>
							</div>
						</Collapse>

						<div
							onClick={() => {
								setOpenUserData(!openUserData);
							}}
							aria-controls="appData"
							aria-expanded={openUserData}
							className="appData__title"
						>
							<img
								src={arrow}
								className={`collapse-arrow ${
									openUserData ? "collapse-arrow--open" : ""
								}`}
								alt=""
							/>
							SNAP & COMPARE User Data
						</div>
						<Collapse in={openUserData}>
							<div id="appData" className="appData__stats">
								<h4>Number of Users: {userData.ids}</h4>
								<h4>Members: {userData.emails}</h4>
								<h4>Guests: {userData.guests}</h4>
							</div>
						</Collapse>
					</div>
					<ButtonDashboard />
				</Card.Body>
			</Card>
		</>
	);
};

export default AdminAccess;
