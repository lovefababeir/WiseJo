import React from "react";

const SolutionBest = ({
	BEST,
	notavailable,
	replaceImage,
	bestinStore,
	savings,
	BESTinLocation,
	optionsInStore,
	currentLocation,
}) => {
	return (
		<div className="solution">
			<img
				className="solution__picture"
				src={BEST.image || notavailable}
				alt="Item of overall best choice"
				onError={replaceImage}
			/>
			<div className="solution__details">
				<p className="solution__advice">
					Great news! We found the option that will get you more for your money
					{optionsInStore(currentLocation) &&
						bestinStore &&
						" and you don't have to go to another store to get it!"}
					.
					{!bestinStore &&
						savings > 0 &&
						` You would save $${savings} if you buy this item from ${BEST.store} instead of ${BESTinLocation.store}. However it may take you another 15mins to drive there and make the purchase`}
					{!optionsInStore(currentLocation) &&
						!bestinStore &&
						` Unfortunatey its not there at ${currentLocation}.`}
				</p>
				<h2 className="solution__detail solution__detail--store">{BEST.store}</h2>
				<h2 className="solution__detail solution__detail--price">{BEST.price}</h2>
				<h2 className="solution__detail solution__detail--capacity">
					for {BEST.capacity}
				</h2>
				<h2 className="solution__detail solution__detail--solution">
					Unit Rate: ${BEST.unitPrice.cost.toFixed(2)}/{BEST.unitPrice.mass}
					{BEST.unitPrice.units}
				</h2>
			</div>
		</div>
	);
};

export default SolutionBest;
