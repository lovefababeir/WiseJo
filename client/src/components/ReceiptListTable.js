import React from "react";
import ReceiptListTableElements from "./ReceiptListTableElements";
import ReceiptListTableSummary from "./ReceiptListTableSummary";
import "./ReceiptListTable.scss";

const ReceiptListTable = ({
	receiptList,
	selectReceiptHandler,
	totalExpenses,
	editMode,
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
					receiptList
						.sort((a, b) => {
							const timestampA = new Date(
								a.date.year,
								a.date.month,
								a.date.day,
							).getTime();
							const timestampB = new Date(
								b.date.year,
								b.date.month,
								b.date.day,
							).getTime();
							return timestampA < timestampB ? -1 : 1;
						})
						.map(receipt => {
							return (
								<ReceiptListTableElements
									receipt={receipt}
									selectReceiptHandler={selectReceiptHandler}
									editMode={editMode}
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
