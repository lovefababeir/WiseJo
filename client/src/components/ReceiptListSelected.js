import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./ReceiptListSelected.scss";

const ReceiptListSelected = ({ purchaseData }) => {
	const {
		store,
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
			<div className="receipts-selected__storeDetails">
				<p className="receipts-selected__store">{store}</p>
				<p className="receipts-selected__receipt">Store Location: {storeID}</p>
				<p className="receipts-selected__receipt">
					{contact && <span>Contact: {contact}</span>}
				</p>
				<p className="receipts-selected__receipt">{address}</p>

				{manager && (
					<p className="receipts-selected__receipt">Manager: {manager}</p>
				)}
				{cashier && (
					<p className="receipts-selected__receipt">Cashier: {cashier}</p>
				)}
			</div>
			<div className="receipts-selected__itemsList">
				<p className="receipts-selected__item-title">Items Purchased:</p>
				{purchases.map(item => {
					return (
						<p className="receipts-selected__item" key={uuidv4()}>
							{item}
						</p>
					);
				})}
				<p className="receipts-selected__subtotal">Subtotal: ${subtotal}</p>
				<p className="receipts-selected__total">Total Spent: ${total}</p>
			</div>
		</div>
	);
};

export default ReceiptListSelected;
