import React from "react";

const ReceiptListTableSummary = ({ receiptList, totalExpenses }) => {
	return (
		<div className="receipt__record">
			<h3 className="receiptsList__dayTotal">
				Today you spent:{" "}
				<span className="receiptsList__dayTotal--Num">
					{receiptList &&
						`$
									${totalExpenses(receiptList, "day").toFixed(2)}`}
				</span>
			</h3>
			<h3 className="receiptsList__weekTotal">
				This week you spent:{" "}
				<span className="receiptsList__weekTotal--Num">
					{receiptList &&
						`$
									${totalExpenses(receiptList, "week").toFixed(2)}`}
				</span>
			</h3>
		</div>
	);
};

export default ReceiptListTableSummary;
