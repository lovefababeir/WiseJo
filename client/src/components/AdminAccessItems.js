import React, { useState } from "react";
import axios from "axios";
import arrow from "../assets/images/collapsearrow.png";
import { v4 as uuidv4 } from "uuid";
import Collapse from "react-bootstrap/Collapse";

const AdminAccessItems = ({
	createToken,
	setErrMsg,
	itemList,
	setItemList,
	setOldItems,
}) => {
	const [openList, setOpenList] = useState(false);

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

	return (
		<>
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
		</>
	);
};

export default AdminAccessItems;
