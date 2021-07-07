import React from "react";
import deleteIcon from "../assets/images/delete.svg";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import notavailable from "../assets/images/notavailable.png";

const ResultsAllItemCard = ({
	image,
	store,
	capacity,
	price,
	title,
	productID,
	values,
	setValues,
	updateList,
}) => {
	const { createToken } = useAuth();

	//Handler that deletes the item
	const deleteItemHandler = (store, productID) => {
		let storeName;
		switch (store) {
			case "Loblaws":
				storeName = "loblaws";
				break;
			case "Longo's":
				storeName = "longos";
				break;
			case "No Frills":
				storeName = "nofrills";
				break;
			case "Sobeys":
				storeName = "sobeys";
				break;
			case "Superstore":
				storeName = "superstore";
				break;
			case "Walmart":
				storeName = "walmart";
				break;
			default:
				break;
		}

		const url = `${process.env.REACT_APP_BASE_URL}items/item/${storeName}/${productID}`;
		createToken()
			.then(token => {
				axios
					.delete(url, token)
					.then(res => {
						updateList();
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(err =>
				setValues({ ...values, errorMessageAll: "Failed to delete item" }),
			);
	};

	const replaceImage = e => {
		e.target.src = notavailable;
	};

	return (
		<div className="item">
			<img
				className="item__image"
				src={image || notavailable}
				alt={`The item with capacity: (${capacity}) at ${store}`}
				onError={replaceImage}
			/>
			<p className="item__title">{title}</p>
			<div className="item__details">
				<div>
					<p className="item__capacity">{capacity || "est. each"}</p>
					<p className="item__price">{price}</p>
				</div>
				<img
					src={deleteIcon}
					alt="Click here to delete item"
					onClick={e => {
						deleteItemHandler(store, productID);
					}}
					className="item__delete"
				/>
			</div>
		</div>
	);
};

export default ResultsAllItemCard;
