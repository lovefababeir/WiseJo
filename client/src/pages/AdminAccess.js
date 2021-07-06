import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
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
	const [openList, setOpenList] = useState(false);
	const [openOldItemsInfo, setOpenOldItemsInfo] = useState(false);
	const [openStoreData, setOpenStoreData] = useState(false);

	const itemStats = () => {
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
	};

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
	}, [createToken]);

	const deleteOldEntries = () => {
		createToken()
			.then(token => {
				axios.delete(`${process.env.REACT_APP_BASE_URL}admin/olditems`, token);
				setErrMsg("");
			})
			.catch(err => {
				setErrMsg(`Could not delete old items:${err}`);
			});
	};

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
						<div
							onClick={() => {
								setOpenOldItemsInfo(!openOldItemsInfo);
							}}
							aria-controls="appData"
							aria-expanded={openOldItemsInfo}
							className="appData__title"
						>
							<img
								src={arrow}
								className={`collapse-arrow ${
									openOldItemsInfo ? "collapse-arrow--open" : ""
								}`}
								alt=""
							/>
							Outdated Documents of Items
						</div>
						<Collapse in={openOldItemsInfo}>
							<div id="appData" className="appData__stats">
								<h4>Number of outdated docs: {oldItems.num_of_old_docs}</h4>
								<h4>List of outdated items:</h4>
								<ul>
									{oldItems.itemList &&
										oldItems.itemList.map(item => {
											return <li>{item}</li>;
										})}
								</ul>

								<button className="formBtn" onClick={deleteOldEntries}>
									Delete Old Entries{" "}
								</button>
							</div>
						</Collapse>

						<div
							onClick={() => {
								setOpenList(!openList);
							}}
							aria-controls="appData"
							aria-expanded={openList}
							className="appData__title"
						>
							<img
								src={arrow}
								className={`collapse-arrow ${openList ? "collapse-arrow--open" : ""}`}
								alt=""
							/>
							Items Searched
						</div>
						<Collapse in={openList}>
							<div id="appData" className="appData__stats">
								<h4>{itemList?.length} items in search history: </h4>
								<ul>
									{itemList?.length &&
										itemList?.map(item => {
											return <li key={uuidv4()}>{item}</li>;
										})}
								</ul>
								<button className="formBtn" onClick={itemStats}>
									Update item stats{" "}
								</button>
							</div>
						</Collapse>

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
													{item.store}: {item.num_of_results}
												</li>
											);
										})}
								</ul>
								<button className="formBtn" onClick={storeStats}>
									Update store stats{" "}
								</button>
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
