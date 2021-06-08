import React from "react";
import save from "../assets/images/save.svg";
import deleteIcon from "../assets/images/delete.svg";
import close from "../assets/images/close.svg";

const ReceiptEditPurchases = ({
	purchaseData,
	changePurchase,
	deleteHandler,
	cancelChangesHandler,
	changePurchaseData,
	receiptID,
}) => {
	const { purchases, total, subtotal } = purchaseData;
	return (
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
					id="subtotal"
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
					id="total"
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
					<img
						src={deleteIcon}
						className="edit-icon"
						alt="Click here to delete the receipt record."
					/>
					Delete
				</button>
				<button type="submit" className="edit edit--purchaseDetails">
					<img
						src={save}
						className="save-icon"
						alt="Click here to save the changes you made to the receipt."
					/>
					Save
				</button>
				<button
					type="button"
					className="edit"
					onClick={() => cancelChangesHandler(receiptID)}
				>
					<img
						src={close}
						className="edit-icon"
						alt="Click here to cancel changes and exit the edit mode."
					/>
					Cancel
				</button>
			</span>
		</div>
	);
};

export default ReceiptEditPurchases;
