import React from "react";
import deleteIcon from "../assets/images/delete.svg";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const ResultsAllItemCard = ({
	image,
	store,
	capacity,
	price,
	title,
	productID,
	values,
	setValues,
}) => {
	const { createToken } = useAuth();

	//Handler that deletes the item
	const deleteItemHandler = (store, productID) => {
		const url = `${process.env.REACT_APP_BASE_URL}itemSearch/item/${store}/${productID}`;
		createToken()
			.then(token => {
				axios
					.delete(url, token)
					.then(() => {
						setValues({ ...values, updateList: true });
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(err => console.log("Not authorized to delete", err));
	};

	return (
		<div className="item">
			<img
				className="item__image"
				src={image}
				alt={`The item with capacity: (${capacity}) at ${store}`}
			/>
			<p className="item__title">{title}</p>
			<div className="item__details">
				<div>
					<p className="item__capacity">{capacity}</p>
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
