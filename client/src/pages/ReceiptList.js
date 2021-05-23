import React, { useState, useEffect } from "react";
import "./ReceiptList.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

	const convertDate = timestamp => {
		let currentTime = Date.now();
		let timeLapsed = currentTime - timestamp;
		let dateSubmitted = new Date(timestamp);
		let secs = timeLapsed / 1000;
		let mins = secs / 60;
		let hrs = mins / 60;
		let days = hrs / 24;

		if (secs < 1) {
			return `now`;
		} else if (secs < 60) {
			return `${Math.floor(secs)} seconds ago`;
		} else if (mins < 60) {
			return `${Math.floor(mins)} minutes ago`;
		} else if (hrs < 24) {
			return `${Math.floor(hrs)} hours ago`;
		} else if (days < 7) {
			return `${Math.floor(days)} days ago`;
		} else {
			return `${
				dateSubmitted.getMonth() + 1
			}/${dateSubmitted.getUTCDate()}/${dateSubmitted.getFullYear()}`;
		}
	};

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
								<div
									className="receipt__record"
									id={receipt.time}
									key={receipt.time}
									onClick={e => selectReceiptHandler(e, receipt.time)}
								>
									<p className="receipt__summary">{receipt.store}</p>

									<p className="receipt__summary">{convertDate(receipt.time)}</p>
									<p className="receipt__summary">${receipt.purchaseData.total}</p>
								</div>
							);
						})}
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
				</div>
				{receiptSelected && (
					<div className="receipts-selected">
						<div className="receipts-selected__storeDetails">
							<p className="receipts-selected__store">{receiptSelected.store}</p>
							<p className="receipts-selected__receipt">
								Store ID:
								{receiptSelected.purchaseData.storeID}
							</p>
							<p className="receipts-selected__receipt">
								{receiptSelected.purchaseData.address}
							</p>
						</div>
						<div className="receipts-selected__itemsList">
							<p className="receipts-selected__item-title">Items Purchased:</p>
							{receiptSelected.purchaseData.purchases.map(item => {
								return (
									<p className="receipts-selected__item" key={uuidv4()}>
										{item}
									</p>
								);
							})}
							<p className="receipts-selected__total">
								Total Spent: ${receiptSelected.purchaseData.total}
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ReceiptList;
