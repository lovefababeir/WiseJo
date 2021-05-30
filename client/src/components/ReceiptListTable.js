import React from "react";
import ReceiptListTableElements from "./ReceiptListTableElements";
import ReceiptListTableSummary from "./ReceiptListTableSummary";
import "./ReceiptListTable.scss";

const ReceiptListTable = ({
	receiptList,
	selectReceiptHandler,
	totalExpenses,
}) => {
	return (
		<>
			<div className="receiptsList__box">
				<h2 className="receiptsList__title">Record of Expenses</h2>
				<div className="receipt__record table-headings">
					<p className="receipt__summary">Store:</p>
					<p className="receipt__summary">Date Logged:</p>
					<p className="receipt__summary">Total:</p>
				</div>
				{receiptList &&
					receiptList.map(receipt => {
						return (
							<ReceiptListTableElements
								receipt={receipt}
								selectReceiptHandler={selectReceiptHandler}
							/>
						);
					})}
				<ReceiptListTableSummary
					receiptList={receiptList}
					totalExpenses={totalExpenses}
				/>
			</div>
		</>
	);
};

export default ReceiptListTable;
