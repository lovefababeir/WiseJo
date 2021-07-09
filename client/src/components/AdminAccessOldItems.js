import React, { useState } from "react";
import axios from "axios";
import arrow from "../assets/images/collapsearrow.png";
import { v4 as uuidv4 } from "uuid";
import Collapse from "react-bootstrap/Collapse";

const AdminAccessOldItems = ({ oldItems, createToken, setErrMsg }) => {
	const [openOldItemsInfo, setOpenOldItemsInfo] = useState(false);
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
								return <li key={uuidv4()}>{item}</li>;
							})}
					</ul>

					<button className="formBtn" onClick={deleteOldEntries}>
						Delete Old Entries{" "}
					</button>
				</div>
			</Collapse>
		</>
	);
};

export default AdminAccessOldItems;
