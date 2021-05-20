import React, { Component } from "react";
import "./ReceiptList.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class ReceiptsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			receiptsList: "",
			receiptSelected: "",
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:5000/receipts/history")
			.then(result => {
				this.setState({ receiptsList: result.data });
			})
			.catch(err => console.log("Could not get list", err));
	}

	convertDate = timestamp => {
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

	selectReceiptHandler = (e, ID) => {
		e.preventDefault();
		// const selectedItemID = e.target.value;

		const receiptSelected = this.state.receiptsList.find(item => {
			return item.time === ID;
		});

		this.setState({ receiptSelected: receiptSelected });
	};

	totalExpenses = (list, duration) => {
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

	render() {
		return (
			<>
				<div className="receiptsList">
					<h1 className="results__title results__title--receiptsList">
						SNAP & TRACK
					</h1>
					<div className="receiptsList__box">
						<h2 className="receiptsList__title">Record of Expenses</h2>
						<div className="receipt__record table-headings">
							<p className="receipt__summary">Store:</p>

							<p className="receipt__summary">Date Logged:</p>
							<p className="receipt__summary">Total:</p>
						</div>
						{this.state.receiptsList &&
							this.state.receiptsList.map(receipt => {
								return (
									<div
										className="receipt__record"
										id={receipt.time}
										key={receipt.time}
										onClick={e => this.selectReceiptHandler(e, receipt.time)}
									>
										<p className="receipt__summary">{receipt.store}</p>

										<p className="receipt__summary">{this.convertDate(receipt.time)}</p>
										<p className="receipt__summary">${receipt.purchaseData.total}</p>
									</div>
								);
							})}
						<div className="receipt__record">
							<h3 className="receiptsList__dayTotal">
								Today you spent:{" "}
								<span className="receiptsList__dayTotal--Num">
									{this.state.receiptsList &&
										`$
									${this.totalExpenses(this.state.receiptsList, "day").toFixed(2)}`}
								</span>
							</h3>
							<h3 className="receiptsList__weekTotal">
								This week you spent:{" "}
								<span className="receiptsList__weekTotal--Num">
									{this.state.receiptsList &&
										`$
									${this.totalExpenses(this.state.receiptsList, "week").toFixed(2)}`}
								</span>
							</h3>
						</div>
					</div>
					{this.state.receiptSelected && (
						<div className="receipts-selected">
							<div className="receipts-selected__storeDetails">
								<p className="receipts-selected__store">
									{this.state.receiptSelected.store}
								</p>
								<p className="receipts-selected__receipt">
									Store ID:
									{this.state.receiptSelected.purchaseData.storeID}
								</p>
								<p className="receipts-selected__receipt">
									{this.state.receiptSelected.purchaseData.address}
								</p>
							</div>
							<div className="receipts-selected__itemsList">
								<p className="receipts-selected__item-title">Items Purchased:</p>
								{this.state.receiptSelected.purchaseData.purchases.map(item => {
									return (
										<p className="receipts-selected__item" key={uuidv4()}>
											{item}
										</p>
									);
								})}
								<p className="receipts-selected__total">
									Total Spent: ${this.state.receiptSelected.purchaseData.total}
								</p>
							</div>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default ReceiptsList;
