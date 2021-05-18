import React from "react";

const ResultsCapacitySelectedStoreDetails = ({
	store,
	price,
	quantity,
	title,
}) => {
	return (
		<>
			<div className="capacity__options">
				<p>{store} </p> -
				<p>
					{price}
					{quantity > 1 ? " for pack of " + quantity : null} ( {title} )
				</p>
			</div>
		</>
	);
};

export default ResultsCapacitySelectedStoreDetails;
