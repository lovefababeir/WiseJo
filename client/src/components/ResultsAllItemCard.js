import React from "react";
import deleteIcon from "../assets/images/delete.svg";

const ResultsAllItemCard = ({
	image,
	store,
	capacity,
	price,
	title,
	productID,
	deleteHandler,
}) => {
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
						deleteHandler("item", productID);
					}}
					className="item__delete"
				/>
			</div>
		</div>
	);
};

export default ResultsAllItemCard;
