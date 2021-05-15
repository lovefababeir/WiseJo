import React from "react";

const ResultsCapacitySelectedStoreDetails = ({
	store,
	price,
	quantity,
	title,
}) => {
	return (
		<>
			<p className="capacity__options">
				<em>{store}</em> - {price}
				{quantity > 1 ? " for pack of " + quantity : null} ( {title} )
			</p>
		</>
	);
};

export default ResultsCapacitySelectedStoreDetails;
