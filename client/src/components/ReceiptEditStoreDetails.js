import React from "react";

const ReceiptEditStoreDetails = ({
	purchaseData,
	changePurchaseData,
	dateToString,
	changeDate,
	store,
	date,
}) => {
	const { storeID, contact, address, manager, cashier } = purchaseData;
	const today = new Date();

	//For the max date on the Calendar
	const todaysDate = `${today.getFullYear()}-${dateToString(
		today.getMonth() + 1,
	)}-${dateToString(today.getDate())}`;

	return (
		<div className="storeDetails">
			<div className="receipt-header">
				<p className="storeDetails__store">{store}</p>
			</div>
			<span>
				<label htmlFor="storeID">Store Location: </label>
				<input
					id="storeID"
					name="storeID"
					type="text"
					placeholder={storeID}
					defaultValue={storeID}
					onChange={e => changePurchaseData(e)}
				></input>
			</span>
			<span>
				<label htmlFor="purchaseDate">Purchase Date:</label>
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
				<label htmlFor="contact">Contact: </label>
				<input
					id="contact"
					name="contact"
					type="text"
					placeholder={contact}
					defaultValue={contact}
					onChange={e => changePurchaseData(e)}
				></input>
			</span>

			<span>
				<label htmlFor="address">Address: </label>
				<input
					id="address"
					name="address"
					type="text"
					placeholder={address}
					defaultValue={address}
					onChange={e => changePurchaseData(e)}
				></input>
			</span>

			{manager && (
				<span>
					<label htmlFor="manager">Manager: </label>
					<input
						id="manager"
						name="manager"
						type="text"
						placeholder={manager}
						defaultValue={manager}
						onChange={e => changePurchaseData(e)}
					></input>
				</span>
			)}

			<span>
				<label htmlFor="cashier">Cashier: </label>
				<input
					id="cashier"
					name="cashier"
					type="text"
					placeholder={cashier}
					defaultValue={cashier}
					onChange={e => changePurchaseData(e)}
				></input>
			</span>
		</div>
	);
};

export default ReceiptEditStoreDetails;
