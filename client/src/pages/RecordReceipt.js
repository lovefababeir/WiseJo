import React, { useState } from "react";
import axios from "axios";
import "./RecordReceipt.scss";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const RecordReceipt = () => {
	const history = useHistory();
	const [values, setValues] = useState({
		file: null,
		errMsg: "",
		loading: false,
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
				.post(
					`${process.env.REACT_APP_OCR_ENDPOINT}vision/v3.2/ocr`,
					formData,
					config,
				)
				.then(res => {
					const dataRes = res.data.regions;
					console.log(JSON.stringify(dataRes));
					axios
						.post(
							`${process.env.REACT_APP_BASE_URL}receipts/convertImage?store=${store}&time=${time}`,
							res,
						)
						.then(result => {
							console.log("result from conversion", result);
							history.push("/track");
						})
						.catch(err => {
							console.log("could not convert");
						});
				})
				.catch(err => {
					console.log(err.response);
					setValues({
						...values,
						errMsg:
							"Sorry, the OCR had trouble reading your image. Try increasing the contrast and brightness and to make the image as black and white as possible.",
					});
				});
		} else {
			setValues({
				...values,
				errMsg:
					"Error: Please check to see that you have selected the store from which you made your purchase and that you've uploaded an image in JPG, JPEG or PNG form",
			});
		}
	};
	const onFormChange = e => {
		console.log(e.target.files);
		setValues({ ...values, file: e.target.files[0] });
	};

	return (
		<>
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
							disabled={values.loading}
						/>
						<label className="form__label form__label--receipts">
							Select the store from where you made your purchase
						</label>
						<select
							className="receipt-form__storeSelect"
							name="receiptStore"
							id="receiptStore"
							disabled={values.loading}
						>
							<option value="Longo's">Longo's</option>
							<option value="No Frills">No Frills</option>
							<option value="Walmart">Walmart</option>
						</select>
						<button
							className="receipt-form__submitBtn"
							type="submit"
							disabled={values.loading}
						>
							Track
						</button>
					</div>

					<p className={values.errMsg ? "receipt-form__errMsg" : ""}>
						{values.errMsg}
					</p>
				</form>
				{values.loading && <LoadingSpinner />}
			</div>
		</>
	);
};

export default RecordReceipt;
