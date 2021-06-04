import React from "react";
import { v4 as uuidv4 } from "uuid";

const ReceiptListTableElements = ({
	receipt,
	selectReceiptHandler,
	dateToString,
}) => {
	const { receiptID, store, date, purchaseData } = receipt;
	const { day, month, year } = date;
	return (
		<div
			className="receipt__record"
			id={receiptID}
			key={uuidv4()}
			onClick={e => selectReceiptHandler(e, receiptID)}
		>
			<p className="receipt__summary">{store}</p>

			<p className="receipt__summary">
				{dateToString(month)} / {dateToString(day)} / {year}
			</p>
			<p className="receipt__summary">${purchaseData.total}</p>
		</div>
	);
};

export default ReceiptListTableElements;
