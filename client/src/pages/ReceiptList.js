import React, { useState, useEffect } from "react";
import "./ReceiptList.scss";
import axios from "axios";
import ReceiptSelected from "../components/ReceiptSelected";
import ReceiptEdit from "../components/ReceiptEdit";
import ReceiptListTable from "../components/ReceiptListTable";
import { useAuth } from "../contexts/AuthContext";

const ReceiptList = () => {
	const [receiptList, setReceiptList] = useState("");
	const [receiptSelected, setReceiptSelected] = useState("");
	const [editMode, setEditMode] = useState(false);
	const { createToken } = useAuth();

	useEffect(() => {
		let mounted = true;
		createToken().then(headers => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}receipts/history`, headers)
				.then(result => {
					if (mounted) {
						setReceiptList(result.data);
					}
				})
				.catch(err => console.log("Could not get list", err));
		});
		return () => {
			mounted = false;
		};
	}, [createToken]);

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
		if (receiptSelected.receiptID === ID) {
			setReceiptSelected("");
			return;
		}
		const receipt = receiptList.find(item => {
			return item.receiptID === ID;
		});

		setReceiptSelected(receipt);
	};
	const totalExpenses = (list, duration) => {
		const timeNow = new Date();
		const todayDay = timeNow.getDay();
		const today = new Date(
			timeNow.getFullYear(),
			timeNow.getMonth(),
			timeNow.getDate(),
		);
		const sundayMidnightTime = today - todayDay * 86400000;

		return list.reduce((total, receipt) => {
			const timeofLast = duration === "today" ? today : sundayMidnightTime;
			return timeofLast < receipt.time
				? parseFloat(receipt.purchaseData.total || 0) + total
				: total;
		}, 0);
	};
	const editModeHandler = () => {
		setEditMode(!editMode);
	};

	const deleteHandler = id => {
		createToken()
			.then(token => {
				axios
					.delete(`${process.env.REACT_APP_BASE_URL}receipts/receipt/${id}`, token)
					.then(result => {
						const newList = result.data;
						setEditMode(!editMode);
						setReceiptList(newList);
						setReceiptSelected("");
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(error => {
				console.log("Could not create Token:", error);
			});
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

		createToken()
			.then(token => {
				axios
					.patch(
						`${process.env.REACT_APP_BASE_URL}receipts/receiptData`,
						{
							receiptData: newReceipt,
						},
						token,
					)
					.then(result => {
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
			})
			.catch(error => {
				console.log("Could not create Token:", error);
			});
	};

	const cancelChangesHandler = async id => {
		const unchangedReceipt = receiptList.find(r => {
			return r.receiptID === id;
		});
		await setReceiptSelected(unchangedReceipt);
		await console.log("receipt selected", unchangedReceipt);
		await setEditMode(!editMode);
	};

	const dateToString = number => {
		return number < 10 ? `0${number}` : number.toString();
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
					selectedReceiptID={receiptSelected.receiptID}
				/>

				{receiptSelected && !editMode && (
					<ReceiptSelected
						store={receiptSelected.store}
						date={receiptSelected.date}
						purchaseData={receiptSelected.purchaseData}
						editMode={editMode}
						editModeHandler={editModeHandler}
						monthNames={monthNames}
					/>
				)}
				{receiptSelected && editMode && (
					<ReceiptEdit
						purchaseData={receiptSelected.purchaseData}
						store={receiptSelected.store}
						date={receiptSelected.date}
						receiptSelected={receiptSelected}
						setReceiptSelected={setReceiptSelected}
						receiptFormHandler={receiptFormHandler}
						receiptID={receiptSelected.receiptID}
						dateToString={dateToString}
						cancelChangesHandler={cancelChangesHandler}
						deleteHandler={deleteHandler}
					/>
				)}
			</div>
		</>
	);
};

export default ReceiptList;
