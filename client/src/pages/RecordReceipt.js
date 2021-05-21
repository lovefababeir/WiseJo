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
		const time = Date.now();
		e.preventDefault();
		const store = e.target.receiptStore.value;
		if (store && values.file) {
			const formData = new FormData();
			formData.append("receipt", values.file);
			setValues({ ...values, errMsg: "", loading: true });

			// //=======================
			const config = {
				headers: {
					"content-type": "application/json",
					"Ocp-Apim-Subscription-Key": process.env.REACT_APP_OCR_API_KEY_1,
				},
			};
			axios
				.post(`${REACT_APP_OCR_ENDPOINT}vision/v3.2/ocr`, formData, config)
				.then(res => {
					console.log(res.data.regions);
					axios
						.post(
							`http://localhost:8080/receipts/convertImage?store=${store}&date=${time}`,
							res,
						)
						.then(result => {
							console.log("result from conversion", result);
						})
						.catch(err => {
							"could not convert";
						});
				})
				.catch(err => console.log(err.response));
			// //=======================
			// const config = {
			// 	headers: {
			// 		"content-type": "multipart/form-data",
			// 	},
			// };

			// 	axios
			// 		.post(
			// 			`http://localhost:8080/receipts/upload?store=${store}&name=${name}`,
			// 			formData,
			// 			config,
			// 		)
			// 		.then(response => {
			// 			console.log(response.data);
			// 			history.push("/track");
			// 			// setValues({ ...values, update: true, view: "receiptslist" });
			// 			// window.location.replace("/receiptslist");
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 			setValues({
			// 				...values,
			// 				errMsg:
			// 					"Submission failed. Please check to you that you've attached the correct image and that it is in jpeg or png format ",
			// 			});
			// 		});
			// } else {
			// 	setValues({
			// 		...values,
			// 		errMsg:
			// 			"Error: Please check to see that you have selected the store from which you made your purchase and that you've uploaded an image in JPEG or PNG form",
			// 	});
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
			<div className="receipt-form">
				<h1 className="form__title">SNAP & TRACK</h1>
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
			{/* </div>
					)}
				</Spring> */}
		</>
	);
};

export default RecordReceipt;
