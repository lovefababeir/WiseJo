import React, { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../assets/images/collapsearrow.png";
import { v4 as uuidv4 } from "uuid";
import Collapse from "react-bootstrap/Collapse";

const AdminAccessReceipts = ({ createToken }) => {
	const [openReceiptsData, setOpenReceiptsData] = useState(false);
	const [receiptsData, setReceiptsData] = useState("");

	useEffect(() => {
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}admin/receipts`, token)
				.then(res => {
					setReceiptsData(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		});
	}, [createToken]);
	return (
		<>
			<div
				onClick={() => {
					setOpenReceiptsData(!openReceiptsData);
				}}
				aria-controls="appData"
				aria-expanded={openReceiptsData}
				className="appData__title"
			>
				<img
					src={arrow}
					className={`collapse-arrow ${
						openReceiptsData ? "collapse-arrow--open" : ""
					}`}
					alt=""
				/>
				Stores Receipts Tracked
			</div>
			<Collapse in={openReceiptsData}>
				<div id="appData" className="appData__stats">
					<h4>Number of users tracking their receipts: {receiptsData.IDs}</h4>
					<h4>Receipts user's are tracking:</h4>
					<ul>
						{receiptsData.receiptData.length &&
							receiptsData.receiptData.map(x => {
								return (
									<li key={uuidv4()}>
										<span>
											{x.store}: {x.receiptQty}
										</span>{" "}
									</li>
								);
							})}
					</ul>
					{/* <button className="formBtn" onClick={storeStats}>
						Update store stats{" "}
					</button> */}
				</div>
			</Collapse>
		</>
	);
};

export default AdminAccessReceipts;
