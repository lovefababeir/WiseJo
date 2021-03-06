import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import ButtonDashboard from "../components/ButtonDashboard.js";
import AdminAccessOldItems from "../components/AdminAccessOldItems";
import AdminAccessItems from "../components/AdminAccessItems";
import AdminAccessStoreStats from "../components/AdminAccessStoreStats";
import AdminAccessUserStats from "../components/AdminAccessUserStats";
import AdminAccessReceipts from "../components/AdminAccessReceipts";
import axios from "axios";
import "./AdminAccess.scss";
import Alert from "react-bootstrap/Alert";

const AdminAccess = () => {
	const { createToken } = useAuth();
	const [itemList, setItemList] = useState("");
	const [oldItems, setOldItems] = useState("");
	const [errMsg1, setErrMsg1] = useState("");
	const [errMsg2, setErrMsg2] = useState("");
	const [errMsg3, setErrMsg3] = useState("");
	const [errMsg4, setErrMsg4] = useState("");

	useEffect(() => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/items`, token)
				.then(res => {
					setItemList(res.data.items.searchWords);
					setOldItems(res.data.oldItems);
					setErrMsg2("");
				})
				.catch(() => {
					setErrMsg2("Could not get an update on the item stats.");
				});
		});
	}, [createToken]);
	return (
		<>
			<Card>
				<Card.Body>
					<h1 className="signin__appName">WiseJo</h1>
					<h2 className="accountForms__title">Adminstrator</h2>
					{(errMsg1 || errMsg2 || errMsg3 || errMsg4) && (
						<Alert variant="danger" style={{ marginTop: "3rem" }}>
							<Alert.Heading>Sorry, an error occurred</Alert.Heading>
							{errMsg1 && <p>{errMsg1}</p>}
							{errMsg2 && <p>{errMsg2}</p>}
							{errMsg3 && <p>{errMsg3}</p>}
							{errMsg4 && <p>{errMsg4}</p>}

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
							setErrMsg={setErrMsg1}
						/>
						<AdminAccessItems
							createToken={createToken}
							setErrMsg={setErrMsg2}
							itemList={itemList}
							setItemList={setItemList}
						/>
						<AdminAccessStoreStats
							createToken={createToken}
							setErrMsg={setErrMsg3}
							itemList={itemList}
						/>
						<AdminAccessUserStats createToken={createToken} setErrMsg={setErrMsg4} />
						<AdminAccessReceipts createToken={createToken} />
					</div>
					<ButtonDashboard />
				</Card.Body>
			</Card>
		</>
	);
};

export default AdminAccess;
