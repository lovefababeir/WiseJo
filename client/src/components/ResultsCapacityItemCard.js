import React from "react";

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
					src={image}
					alt={`The item with capacity: ${capacity}`}
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
