import React from "react";

const ReceiptListTableElements = ({ receipt, selectReceiptHandler }) => {
	const { time, store, date, purchaseData } = receipt;
	return (
		<div
			className="receipt__record"
			id={time}
			key={time}
			onClick={e => selectReceiptHandler(e, time)}
		>
			<p className="receipt__summary">{store}</p>

			<p className="receipt__summary">
				{date.month}/{date.day}/{date.year}
			</p>
			<p className="receipt__summary">${purchaseData.total}</p>
		</div>
	);
};

export default ReceiptListTableElements;
