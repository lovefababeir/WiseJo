import React from "react";

const SolutionStoreSecond = ({
	curLocationOptions,
	replaceImage,
	notavailable,
}) => {
	return (
		<div className="solution">
			<img
				className="solution__picture"
				src={curLocationOptions.image || notavailable}
				alt="Second best option in current location"
				onError={replaceImage}
			/>
			<div className="solution__details">
				<p className="solution__advice">
					This is the second best option in the store you are currently in. Not bad
					for a back up plan!{" "}
				</p>
				<h2 className="solution__detail solution__detail--store">
					{curLocationOptions.store}
				</h2>
				<h2 className="solution__detail solution__detail--price">
					{curLocationOptions.price}
				</h2>
				<h2 className="solution__detail solution__detail--capacity">
					{curLocationOptions.capacity}
				</h2>
				<h2 className="solution__detail solution__detail--unitRate">
					Unit Rate: ${curLocationOptions.unitPrice.cost.toFixed(2)}/
					{curLocationOptions.unitPrice.mass}
					{curLocationOptions.unitPrice.units}
				</h2>
			</div>
		</div>
	);
};

export default SolutionStoreSecond;
