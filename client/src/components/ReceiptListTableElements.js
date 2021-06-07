import React from "react";
import { v4 as uuidv4 } from "uuid";

const ReceiptListTableElements = ({
	receipt,
	selectReceiptHandler,
	dateToString,
	selectedReceiptID,
}) => {
	const { receiptID, store, date, purchaseData } = receipt;
	const { day, month, year } = date;
	return (
		<div
			className={`receipt__record${
				selectedReceiptID === receiptID ? " receipt__record--active" : ""
			}`}
			id={receiptID}
			key={uuidv4()}
			onClick={e => selectReceiptHandler(e, receiptID)}
		>
			<div>
				<p className="receipt__summary">{store}</p>
				<p className="receipt__summary">
					{dateToString(month)} / {dateToString(day)} / {year}
				</p>
				<p className="receipt__summary">${purchaseData.total}</p>
			</div>
		</div>
	);
};

export default ReceiptListTableElements;
