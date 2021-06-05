import React from "react";
import "./ReceiptListSelected.scss";
import save from "../assets/images/save.svg";
import deleteIcon from "../assets/images/delete.svg";
import close from "../assets/images/close.svg";

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
	const {
		storeID,
		contact,
		address,
		manager,
		cashier,
		purchases,
		total,
		subtotal,
	} = purchaseData;

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

	const today = new Date();
	const todaysDate = `${today.getFullYear()}-${dateToString(
		today.getMonth() + 1,
	)}-${dateToString(today.getDay())}`;
	console.log(receiptSelected);
	return (
		<form
			action="submit"
			onSubmit={receiptFormHandler}
			className="receipts-selected"
		>
			<div className="storeDetails">
				<div className="receipt-header">
					<p className="storeDetails__store">{store}</p>
				</div>
				<span>
					<label>Store Location: </label>
					<input
						name="storeID"
						type="text"
						placeholder={storeID}
						defaultValue={storeID}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>
				<span>
					<label for="purchaseDate">Purchase Date:</label>
					<input
						type="date"
						id="purchaseDate"
						name="purchaeDate"
						max={todaysDate}
						required
						defaultValue={`${date.year}-${dateToString(date.month)}-${dateToString(
							date.day,
						)}`}
						onChange={e => {
							changeDate(e);
						}}
					/>
				</span>

				<span>
					<label>Contact: </label>
					<input
						name="contact"
						type="text"
						placeholder={contact}
						defaultValue={contact}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>

				<span>
					<label>Address: </label>
					<input
						name="address"
						type="text"
						placeholder={address}
						defaultValue={address}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>

				{manager && (
					<span>
						<label>Manager: </label>
						<input
							name="manager"
							type="text"
							placeholder={manager}
							defaultValue={manager}
							onChange={e => changePurchaseData(e)}
						></input>
					</span>
				)}

				<span>
					<label>Cashier: </label>
					<input
						name="cashier"
						type="text"
						placeholder={cashier}
						defaultValue={cashier}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>
			</div>
			<div className="purchaseDetails">
				<p className="purchaseDetails__item-title">Items Purchased:</p>

				{purchases.map((item, i) => {
					return (
						<input
							name={i}
							type="text"
							placeholder={item}
							defaultValue={item}
							onChange={e => changePurchase(e)}
							key={[`purchases`, receiptID, i].join("_")}
						></input>
					);
				})}
				<span>
					<label>Subtotal: $</label>
					<input
						name="subtotal"
						type="number"
						step="0.01"
						placeholder={subtotal}
						defaultValue={subtotal}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>
				<span>
					<label>Total Spent: $</label>
					<input
						name="total"
						type="number"
						step="0.01"
						placeholder={total}
						defaultValue={total}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>
				<span className="button-container">
					<button
						className="edit"
						type="button"
						onClick={() => deleteHandler(receiptID)}
					>
						<img src={deleteIcon} className="edit-icon" />
						Delete
					</button>
					<button type="submit" className="edit edit--purchaseDetails">
						<img src={save} className="save-icon" />
						Save
					</button>
					<button
						type="button"
						className="edit"
						onClick={() => cancelChangesHandler(receiptID)}
					>
						<img src={close} className="edit-icon" />
						Cancel
					</button>
				</span>
			</div>
		</form>
	);
};

export default ReceiptListSelectedEdit;
