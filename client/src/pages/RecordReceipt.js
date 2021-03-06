import React, { useState } from "react";
import axios from "axios";
import "./RecordReceipt.scss";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import RecordReceiptForm from "../components/RecordReceiptForm";
import FormAlert from "../components/FormAlert";

const RecordReceipt = () => {
	const history = useHistory();
	const [values, setValues] = useState({
		file: null,
		errMsg: "",
		loading: false,
		advice: "",
	});
	const { createToken } = useAuth();

	//FormHandler
	const onFormSubmit = e => {
		const time = Date.now();
		e.preventDefault();

		const store = e.target.receiptStore.value;
		if (!store || !values.file) {
			setValues({
				...values,
				errMsg:
					"Error: Please check to see that you have selected the store from which you made your purchase and that you've uploaded an image in JPG, JPEG or PNG form",
			});
			return;
		}

		const formData = new FormData();
		formData.append("receipt", values.file);
		setValues({ ...values, errMsg: "", loading: true });

		//=======================

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
				// console.log(JSON.stringify(res.data.regions));
				createToken()
					.then(token => {
						axios
							.post(
								`${process.env.REACT_APP_BASE_URL}receipts/convertImage?store=${store}&time=${time}`,
								res,
								token,
							)
							.then(result => {
								// console.log(result)
								history.push("/track");
							})
							.catch(err => {
								setValues({
									...values,
									loading: false,
									errMsg: `Error: The image you uploaded could not be analyzed for ${store}. Please check to see that you've selected the correct store.`,
								});
							});
					})
					.catch(err => {
						setValues({
							...values,
							loading: false,
							errMsg:
								"Could not create authentication token to gain access to backend. Please try again or contact the WiseJo admin.",
						});
					});
			})
			.catch(err => {
				// console.log(err);
				setValues({
					...values,
					loading: false,
					errMsg:
						"We're having some trouble sending the request to the OCR. Please ensure that your reciept is not wrinkled and that the picture is not taken on an angle. Double check to see that your image is in jpg/jpeg format.",
				});
			});
	};

	const onFormChange = e => {
		const store = e.target.receiptStore?.value;
		if (store === "Walmart") {
			setValues({
				...values,
				advice:
					"For best results make sure your picture starts just a little but above the Store # just below the survey ad",
			});
		}
		if (store === "Longos") {
			setValues({
				...values,
				advice:
					"For best results make sure your is focused on the main content of the receipt. Don't include the information after the payment",
			});
		}
		var binaryData = [];
		binaryData.push(e.target.files[0]);
		const imgSrc = URL.createObjectURL(
			new Blob(binaryData, { type: "application/zip" }),
		);

		setValues({ ...values, file: e.target.files[0], imgSrc: imgSrc });
	};

	return (
		<>
			<div className="receipt-form">
				<h1 className="form__title">SNAP & TRACK</h1>
				{!values.loading && (
					<RecordReceiptForm
						onFormChange={onFormChange}
						onFormSubmit={onFormSubmit}
						loading={values.loading}
						errMsg={values.errMsg}
						imgSrc={values.imgSrc}
					/>
				)}
				{values.loading && (
					<div className="form__afterSubmit">
						<FormAlert page="snap" />
						<LoadingSpinner />
					</div>
				)}
			</div>
		</>
	);
};

export default RecordReceipt;
