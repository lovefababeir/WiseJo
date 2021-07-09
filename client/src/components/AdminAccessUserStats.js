import React, { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../assets/images/collapsearrow.png";
import Collapse from "react-bootstrap/Collapse";

const AdminAccessUserStats = ({ createToken, setErrMsg }) => {
	const [userData, setUserData] = useState("");
	const [openUserData, setOpenUserData] = useState(false);

	useEffect(() => {
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
	}, [createToken, setErrMsg]);

	return (
		<div>
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
					className={`collapse-arrow ${openUserData ? "collapse-arrow--open" : ""}`}
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
	);
};

export default AdminAccessUserStats;
