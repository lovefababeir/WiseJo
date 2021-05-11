import React, { useState } from "react";
import axios from "axios";
import "./RecordReceipt.scss";
import { useHistory } from "react-router-dom";
// import ReceiptsList from "../ReceiptsList/ReceiptsList";
// import { Spring } from "react-spring/renderprops";
import LoadingSpinner from "../components/LoadingSpinner";

const RecordReceipt = () => {
	const history = useHistory();
	const [values, setValues] = useState({
		// view: "form",
		file: null,
		errMsg: "",
		loading: false,
		// update: false,
	});

	const onFormSubmit = e => {
		e.preventDefault();
		const store = e.target.receiptStore.value;
		if (store && values.file) {
			const formData = new FormData();
			formData.append("receipt", values.file);
			const config = {
				headers: {
					"content-type": "multipart/form-data",
				},
			};
			setValues({ ...values, errMsg: "", loading: true });
			console.log(e);
			axios
				.post(
					`http://localhost:5000/receipts/upload?store=${store}`,
					formData,
					config,
				)
				.then(response => {
					console.log(response);
					history.push("/track");
					// setValues({ ...values, update: true, view: "receiptslist" });
					// window.location.replace("/receiptslist");
				})
				.catch(err => {
					console.log(err);
					setValues({
						...values,
						errMsg:
							"Submission failed. Please check to you that you've attached the correct image and that it is in jpeg or png format ",
					});
				});
		} else {
			setValues({
				...values,
				errMsg:
					"Error: Please check to see that you have selected the store from which you made your purchase and that you've uploaded an image in JPEG or PNG form",
			});
		}
	};
	const onFormChange = e => {
		console.log(e.target.files);
		setValues({ ...values, file: e.target.files[0] });
	};

	return (
		<>
			{/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
					{props => (
						<div style={props}> */}
			<section className="receipts">
				<div className="receipt-form">
					<form onSubmit={e => onFormSubmit(e)}>
						<h1 className="form__title">SNAP & TRACK</h1>

						<div className="form__box">
							<label className="form__label">
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
							/>

							<label className="form__label form__label--receipts">
								Select the store from where you made your purchase
							</label>
							<select
								className="receipt-form__storeSelect"
								name="receiptStore"
								id="receiptStore"
							>
								<option value="Longo's">Longo's</option>
								<option value="No Frills">No Frills</option>
								<option value="Walmart">Walmart</option>
							</select>

							<button className="receipt-form__submitBtn" type="submit">
								Track
							</button>
						</div>

						<p className={values.errMsg ? "receipt-form__errMsg" : ""}>
							{values.errMsg}
						</p>
					</form>
					{values.loading && <LoadingSpinner />}
				</div>

				{/* {values.view === "receiptslist" && (
						<ReceiptsList update={values.update} />
					)} */}
			</section>
			{/* </div>
					)}
				</Spring> */}
		</>
	);
};

export default RecordReceipt;
