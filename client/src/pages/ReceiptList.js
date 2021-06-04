import React, { useState, useEffect } from "react";
import "./ReceiptList.scss";
import axios from "axios";
import ReceiptListSelected from "../components/ReceiptListSelected";
import ReceiptListSelectedEdit from "../components/ReceiptListSelectedEdit";
import ReceiptListTable from "../components/ReceiptListTable";

const ReceiptList = () => {
	const [receiptList, setReceiptList] = useState("");
	const [receiptSelected, setReceiptSelected] = useState("");
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		let mounted = true;
		axios
			.get(`${process.env.REACT_APP_BASE_URL}receipts/history`)
			.then(result => {
				if (mounted) {
					console.log(result);
					setReceiptList(result.data);
					console.log("receiptList:", result.data);
				}
			})
			.catch(err => console.log("Could not get list", err));
		return () => {
			mounted = false;
		};
	}, []);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const selectReceiptHandler = (e, ID) => {
		e.preventDefault();

		//check if in edit mode. If so, exit handler so that the selected receipt is not changed
		if (editMode) {
			return;
		}
		const receipt = receiptList.find(item => {
			return item.time === ID;
		});
		console.log("Selected Receipt===>", receipt);
		setReceiptSelected(receipt);
	};
	const totalExpenses = (list, duration) => {
		return list.reduce((total, receipt) => {
			//first is day in ms second is week in ms
			const timeDiff = duration === "day" ? 86400000 : 604800000;

			//timestamps are in UTC start from thursday Jan 1 1970
			const timeFix = duration === "week" ? 259200000 + 14400000 : 14400000;

			const timeNow = Date.now();

			//calculations the time since sunday if week or since midnight if day
			const timeofLast = timeNow - (timeNow % timeDiff) - timeFix;

			return timeofLast < receipt.time
				? parseFloat(receipt.purchaseData.total) + total
				: total;
		}, 0);
	};
	const editModeHandler = () => {
		setEditMode(!editMode);
	};
	const receiptFormHandler = e => {
		e.preventDefault();
		const purchaseList = receiptSelected.purchaseData.purchases
			.slice(0)
			.filter(item => {
				return item;
			});

		const newReceipt = {
			...receiptSelected,
			purchaseData: { ...receiptSelected.purchaseData, purchases: purchaseList },
		};

		axios
			.patch(`${process.env.REACT_APP_BASE_URL}receipts/receiptData`, {
				receiptData: newReceipt,
			})
			.then(result => {
				console.log(result.data);
				const newReceiptSelected = result.data.find(receipt => {
					return receipt.receiptID === receiptSelected.receiptID;
				});
				setReceiptList(result.data);
				setReceiptSelected(newReceiptSelected);
				setTimeout(() => {
					setEditMode(!editMode);
				}, 300);
			})
			.catch(err => console.log(err));
	};
	const dateToString = number => {
		return number < 10 ? number.toString() : `0${number}`;
	};

	return (
		<>
			<div className="receiptsList">
				<h1 className="results__title results__title--receiptList">SNAP & TRACK</h1>
				<ReceiptListTable
					receiptList={receiptList}
					selectReceiptHandler={selectReceiptHandler}
					totalExpenses={totalExpenses}
					editMode={editMode}
					dateToString={dateToString}
				/>

				{receiptSelected && !editMode && (
					<ReceiptListSelected
						store={receiptSelected.store}
						date={receiptSelected.date}
						purchaseData={receiptSelected.purchaseData}
						editMode={editMode}
						editModeHandler={editModeHandler}
						monthNames={monthNames}
					/>
				)}
				{receiptSelected && editMode && (
					<ReceiptListSelectedEdit
						purchaseData={receiptSelected.purchaseData}
						store={receiptSelected.store}
						date={receiptSelected.date}
						receiptSelected={receiptSelected}
						setReceiptSelected={setReceiptSelected}
						receiptFormHandler={receiptFormHandler}
						receiptID={receiptSelected.receiptID}
					/>
				)}
			</div>
		</>
	);
};

export default ReceiptList;
