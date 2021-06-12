import React from "react";
import notavailable from "../assets/images/notavailable.png";

const ResultsCapacityItemCard = ({
	image,
	capacity,
	storeList,
	changeSelected,
	category,
}) => {
	return (
		<div className="capacity__box">
			<div
				className="capacity__size"
				onClick={() => {
					changeSelected(category);
				}}
			>
				<img
					className="capacity__image"
					src={image || notavailable}
					alt={
						image
							? `The item with capacity: ${capacity}`
							: `Image of the item with description ${capacity} is currently not available`
					}
				/>
			</div>
			<h1 className="capacity__size-title">Size: {capacity}</h1>
			<h2 className="capacity__optionsNum">
				{storeList.length} Available {storeList.length > 1 ? "Options" : "Option"}
			</h2>
		</div>
	);
};

export default ResultsCapacityItemCard;
