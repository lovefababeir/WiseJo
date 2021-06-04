import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./ReceiptListSelected.scss";
import edit from "../assets/images/edit.svg";

const ReceiptListSelected = ({
	purchaseData,
	store,
	date,
	editModeHandler,
	monthNames,
}) => {
	const {
		storeID,
		contact,
		address,
		manager,
		cashier,
		purchases,
		total,
		subtotal,
	} = purchaseData;

	return (
		<div className="receipts-selected">
			<div className="storeDetails">
				<div className="receipt-header">
					<p className="storeDetails__store">{store}</p>
					<button
						className="edit edit--purchaseDetails"
						onClick={() => editModeHandler()}
					>
						<img src={edit} className="edit-icon" />
					</button>
				</div>
				<p className="storeDetails__detail">Store Location: {storeID}</p>
				<p className="storeDetails__detail">
					Purchase Date: {monthNames[date.month - 1]} {date.day} {date.year}
				</p>
				{contact && <p className="storeDetails__detail">Contact: {contact}</p>}
				<p className="storeDetails__detail">{address}</p>

				{manager && <p className="storeDetails__detail">Manager: {manager}</p>}
				{cashier && <p className="storeDetails__detail">Cashier: {cashier}</p>}
			</div>
			<div className="purchaseDetails">
				<div className="receipt-header">
					<p className="purchaseDetails__item-title">Items Purchased:</p>
				</div>
				{purchases.map(item => {
					return (
						<p className="purchaseDetails__item" key={uuidv4()}>
							{item}
						</p>
					);
				})}
				<p className="purchaseDetails__subtotal">Subtotal: ${subtotal}</p>
				<p className="purchaseDetails__total">Total Spent: ${total}</p>
			</div>
		</div>
	);
};

export default ReceiptListSelected;
