import React from "react";
import "./ResultsSolutions.scss";
import { Spring } from "react-spring";

const ResultsSolutions = props => {
	const { list, currentLocation } = props;

	//RETURNS AN ALTERED LIST: adds unit rates for all stores
	const unitRates = list
		.map(item => {
			const cost = Number(item.price.replace(/[^0-9.-]+/g, ""));
			const perUnit = item.value < 20 ? 1 : 100;
			const ans = (cost / ((item.value * item.quantity) / perUnit)).toFixed(2);
			return {
				...item,
				cost: cost,
				unitRate: ans,
				perUnit: perUnit,
				totalCapacity: item.value * item.quantity,
			};
		})
		.sort((a, b) => {
			return a.unitRate - b.unitRate;
		});

	//RETURNS STORE'S OPTIONS BEST TO WORST: gets all the options in store passed
	const optionsInStore = store => {
		if (store) {
			return unitRates
				.filter(item => {
					return item.store.toLowerCase() === store;
				})
				.sort((a, b) => {
					return a.unitRate - b.unitRate;
				});
		}
	};

	//////DATA FOR RENDERING PAGE:
	//CHECK TO SEE IF THE BEST IN THE STORE IS NOT TIED WITH BEST OVERALL
	const curLocationOptions = optionsInStore(currentLocation);
	const BESTinLocation = curLocationOptions[0];
	const BEST =
		BESTinLocation.cost === unitRates[0] ? BESTinLocation : unitRates[0];

	const savings = (
		curLocationOptions.find(option => {
			return option.value === BEST.value && option.quantity === BEST.quantity;
		}).cost - BEST.cost
	).toFixed(2);

	const diffStoreFromCur = currentLocation !== BEST.store.toLowerCase();

	const capacityDiff =
		BESTinLocation.totalCapacity > curLocationOptions[1].totalCapacity
			? BESTinLocation.totalCapacity - curLocationOptions[1].totalCapacity
			: "";

	return (
		<>
			<Spring
				from={{ opacity: 0, marginLeft: 500 }}
				to={{ opacity: 1, marginLeft: 0 }}
				config={{ duration: 1000 }}
			>
				{props => (
					<div style={props}>
						<div className="solution">
							<img
								className="solution__picture"
								src={BEST.image}
								alt="Item of overall best choice"
							/>
							<div class="solution__details">
								<p className="solution__advice">
									Great news! We found the option that will get you more for your money{" "}
									{!diffStoreFromCur &&
										"and you don't have to go to another store to get it!"}
									.
									{diffStoreFromCur &&
										savings > 0 &&
										` You would save $${savings} if you buy this item from ${BEST.store} instead of ${BESTinLocation.store}. However it may take you another 15mins to drive there and make the purchase`}
								</p>
								<h2 className="solution__detail solution__detail--store">
									{BEST.store}
								</h2>
								<h2 className="solution__detail solution__detail--price">
									{BEST.price}
								</h2>
								<h2 className="solution__detail solution__detail--capacity">
									for {BEST.capacity}
								</h2>
								<h2 className="solution__detail solution__detail--solution">
									Unit Rate: ${BEST.unitRate}/100g
								</h2>
							</div>
						</div>
					</div>
				)}
			</Spring>

			<Spring
				from={{ opacity: 0, marginLeft: 500 }}
				to={{ opacity: 1, marginLeft: 0 }}
				config={{ delay: 300, duration: 1000 }}
			>
				{props => (
					<div style={props}>
						{currentLocation && diffStoreFromCur && (
							<div className="solution">
								<img
									className="solution__picture"
									src={BESTinLocation.image}
									alt="Best option in current location"
								/>
								<div class="solution__details">
									<p className="solution__advice">
										This is the item with the best unit price from where you are shopping
										now.{" "}
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
										Unit Rate: ${BESTinLocation.unitRate}/100g
									</h2>
								</div>
							</div>
						)}
					</div>
				)}
			</Spring>

			<Spring
				from={{ opacity: 0, marginLeft: 500 }}
				to={{ opacity: 1, marginLeft: 0 }}
				config={{ delay: 600, duration: 1000 }}
			>
				{props => (
					<div style={props}>
						{curLocationOptions[1] && (
							<div className="solution">
								<img
									className="solution__picture"
									src={curLocationOptions[1].image}
									alt="Second best option in current lcoation"
								/>
								<div className="solution__details">
									<p className="solution__advice">
										This is the second best option in the store you are currently in. Not
										bad for a back up plan!{" "}
									</p>
									<h2 className="solution__detail solution__detail--store">
										{curLocationOptions[1].store}
									</h2>
									<h2 className="solution__detail solution__detail--price">
										{curLocationOptions[1].price}
									</h2>
									<h2 className="solution__detail solution__detail--capacity">
										{curLocationOptions[1].capacity}
									</h2>
									<h2 className="solution__detail solution__detail--unitRate">
										Unit Rate: ${curLocationOptions[1].unitRate}/100g
									</h2>
								</div>
							</div>
						)}
					</div>
				)}
			</Spring>
		</>
	);
};

export default ResultsSolutions;
