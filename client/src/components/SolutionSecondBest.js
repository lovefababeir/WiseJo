import React from "react";

const SolutionSecondBest = ({ unitRates, replaceImage }) => {
	return (
		<div className="solution">
			<img
				className="solution__picture"
				src={unitRates.image}
				alt="Second best option in current location"
				onError={replaceImage}
			/>
			<div className="solution__details">
				<p className="solution__advice">This is the second best option.</p>
				<h2 className="solution__detail solution__detail--store">
					{unitRates.store}
				</h2>
				<h2 className="solution__detail solution__detail--price">
					{unitRates.price}
				</h2>
				<h2 className="solution__detail solution__detail--capacity">
					{unitRates.capacity}
				</h2>
				<h2 className="solution__detail solution__detail--unitRate">
					Unit Rate: ${unitRates.unitPrice.cost.toFixed(2)}/
					{unitRates.unitPrice.mass}
					{unitRates.unitPrice.units}
				</h2>
			</div>
		</div>
	);
};

export default SolutionSecondBest;
