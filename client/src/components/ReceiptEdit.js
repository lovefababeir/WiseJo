import React from "react";
import "./ReceiptSelected.scss";
import ReceiptEditPurchases from "./ReceiptEditPurchases";
import ReceiptEditStoreDetails from "./ReceiptEditStoreDetails";

const ReceiptListSelectedEdit = ({
	purchaseData,
	store,
	date,
	receiptSelected,
	setReceiptSelected,
	receiptFormHandler,
	receiptID,
	dateToString,
	cancelChangesHandler,
	deleteHandler,
}) => {
	const changePurchaseData = e => {
		const { name, value } = e.target;

		setReceiptSelected({
			...receiptSelected,
			purchaseData: { ...receiptSelected.purchaseData, [name]: value },
		});
	};
	const changePurchase = e => {
		const { name, value } = e.target;
		const purchaseList = receiptSelected.purchaseData.purchases;
		purchaseList.splice(parseInt(name), 1, value);

		setReceiptSelected({
			...receiptSelected,
			purchaseData: {
				...receiptSelected.purchaseData,
				purchases: purchaseList,
			},
		});
	};
	const changeDate = e => {
		const newDate = e.target.value.split("-");
		const date = {
			year: parseInt(newDate[0]),
			month: parseInt(newDate[1]),
			day: parseInt(newDate[2]),
		};
		const newTime = new Date(date.year, date.month - 1, date.day).getTime() + 1;
		setReceiptSelected({ ...receiptSelected, date, time: newTime });
	};

	console.log(receiptSelected);
	return (
		<form
			action="submit"
			onSubmit={receiptFormHandler}
			className="receipts-selected"
		>
			<ReceiptEditStoreDetails
				purchaseData={purchaseData}
				changePurchaseData={changePurchaseData}
				dateToString={dateToString}
				changeDate={changeDate}
				store={store}
				date={date}
			/>
			<ReceiptEditPurchases
				purchaseData={purchaseData}
				changePurchase={changePurchase}
				deleteHandler={deleteHandler}
				cancelChangesHandler={cancelChangesHandler}
				receiptID={receiptID}
				changePurchaseData={changePurchaseData}
			/>
		</form>
	);
};

export default ReceiptListSelectedEdit;
