import React from "react";

const SolutionStoreBest = ({
	BESTinLocation,
	notavailable,
	replaceImage,
	capacityDiff,
}) => {
	return (
		<div className="solution">
			<img
				className="solution__picture"
				src={BESTinLocation.image || notavailable}
				alt="Best option in current location"
				onError={replaceImage}
			/>
			<div className="solution__details">
				<p className="solution__advice">
					This is the item with the best unit price from where you are shopping now.{" "}
					{capacityDiff &&
						`It also contains ${capacityDiff}g more than the next option.`}
				</p>
				<h2 className="solution__detail solution__detail--store">
					{BESTinLocation.store}
				</h2>
				<h2 className="solution__detail solution__detail--price">
					{BESTinLocation.price}
				</h2>
				<h2 className="solution__detail solution__detail--capacity">
					{BESTinLocation.capacity}
				</h2>
				<h2 className="solution__detail solution__detail--unitRate">
					Unit Rate: ${BESTinLocation.unitPrice.cost.toFixed(2)}/
					{BESTinLocation.unitPrice.mass}
					{BESTinLocation.unitPrice.units}
				</h2>
			</div>
		</div>
	);
};

export default SolutionStoreBest;
