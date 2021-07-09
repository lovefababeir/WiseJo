import React, { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../assets/images/collapsearrow.png";
import { v4 as uuidv4 } from "uuid";
import Collapse from "react-bootstrap/Collapse";

const AdminAccessStoreStats = ({ createToken, setErrMsg, itemList }) => {
	const [openStoreData, setOpenStoreData] = useState(false);
	const [storeData, setStoreData] = useState("");

	useEffect(() => {
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
	}, [createToken, setErrMsg]);

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

	return (
		<div>
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
					className={`collapse-arrow ${openStoreData ? "collapse-arrow--open" : ""}`}
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
		</div>
	);
};

export default AdminAccessStoreStats;
