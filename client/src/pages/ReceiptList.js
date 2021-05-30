import React, { useState, useEffect } from "react";
import "./ReceiptList.scss";
import axios from "axios";
import ReceiptListSelected from "../components/ReceiptListSelected";
import ReceiptListTable from "../components/ReceiptListTable";

const ReceiptList = () => {
	const [receiptList, setReceiptList] = useState("");
	const [receiptSelected, setReceiptSelected] = useState("");

	useEffect(() => {
		let mounted = true;
		console.log("mounted");
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

	const selectReceiptHandler = (e, ID) => {
		e.preventDefault();
		// const selectedItemID = e.target.value;

		const receiptSelected = receiptList.find(item => {
			return item.time === ID;
		});

		setReceiptSelected(receiptSelected);
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
				? receipt.purchaseData.total + total
				: total;
		}, 0);
	};

	return (
		<>
			<div className="receiptsList">
				<h1 className="results__title results__title--receiptList">SNAP & TRACK</h1>
				<ReceiptListTable
					receiptList={receiptList}
					selectReceiptHandler={selectReceiptHandler}
					totalExpenses={totalExpenses}
				/>

				{receiptSelected && (
					<ReceiptListSelected purchaseData={receiptSelected.purchaseData} />
				)}
			</div>
		</>
	);
};

export default ReceiptList;
