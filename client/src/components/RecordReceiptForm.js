import React from "react";

const RecordReceiptForm = ({ onFormSubmit, onFormChange, loading, errMsg }) => {
	return (
		<form onSubmit={e => onFormSubmit(e)}>
			<div className="form__box">
				<label className="form__label form__label--receipts">
					Take a picture of your receipt and upload it here
				</label>
				<input
					className="receipt-form__fileUpload"
					accept="image/*"
					type="file"
					name="receipt"
					onChange={e => {
						onFormChange(e);
					}}
					disabled={loading}
				/>
				<label className="form__label form__label--receipts">
					Select the store from where you made your purchase
				</label>
				<select
					className="receipt-form__storeSelect"
					name="receiptStore"
					id="receiptStore"
					disabled={loading}
				>
					<option value="Longo's">Longo's</option>
					<option value="No Frills">No Frills</option>
					<option value="Walmart">Walmart</option>
				</select>
				<button
					className="receipt-form__submitBtn"
					type="submit"
					disabled={loading}
				>
					Track
				</button>
			</div>

			<p className={errMsg ? "receipt-form__errMsg" : ""}>{errMsg}</p>
		</form>
	);
};

export default RecordReceiptForm;
