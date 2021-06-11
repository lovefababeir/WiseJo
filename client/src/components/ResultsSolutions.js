import React from "react";
import "./ResultsSolutions.scss";
import { useSpring, animated } from "react-spring";
import TipsSection from "./TipsSection";

const ResultsSolutions = props => {
	const { list, currentLocation } = props;

	//RETURNS AN ALTERED LIST: adds unit rates for all stores
	const unitRates = list
		?.slice(0)
		.filter(item => {
			return item.unitPrice && item.unitPrice.cost && item.unitPrice.mass;
		})
		.sort((a, b) => {
			return a.store.toLowerCase() === currentLocation.toLowerCase() ? -1 : 1;
		})
		.sort((a, b) => {
			return a.unitPrice.cost - b.unitPrice.cost;
		});

	//RETURNS STORE'S OPTIONS BEST TO WORST: gets all the options in store passed
	const optionsInStore = store => {
		if (store) {
			return unitRates.filter(item => {
				return item.store.toLowerCase() === store.toLowerCase();
			});
		}
	};
	//////DATA FOR RENDERING PAGE:
	//CHECK TO SEE IF THE BEST IN THE STORE IS NOT TIED WITH BEST OVERALL

	const BEST = unitRates[0];
	let bestinStore;
	let savings;
	let BESTinLocation;
	let capacityDiff;
	let curLocationOptions;
	let inStoreResults = optionsInStore(currentLocation).length > 0 ? true : false;

	if (inStoreResults) {
		BESTinLocation = optionsInStore(currentLocation).reduce((best, item) => {
			if (best.unitPrice.cost > item.unitPrice.cost) {
				return item;
			} else {
				return best;
			}
		});

		curLocationOptions = optionsInStore(currentLocation);

		if (currentLocation !== BEST.store) {
			let sameItem = curLocationOptions.find(option => {
				return option.value === BEST.value && option.quantity === BEST.quantity;
			});
			savings = (
				sameItem
					? parseFloat(sameItem.price.slice(1)) - parseFloat(BEST.price.slice(1))
					: 0
			).toFixed(2);
		}

		bestinStore = currentLocation === BEST.store.toLowerCase();

		//This is the capacity difference between the two best options inStore
		capacityDiff =
			BESTinLocation.value * BESTinLocation.quantity >
			curLocationOptions[1].value * curLocationOptions[1].quantity
				? BESTinLocation.value * BESTinLocation.quantity -
				  curLocationOptions[1].value * curLocationOptions[1].quantity
				: "";
	}

	const details = useSpring({
		from: { opacity: 0, marginLeft: 500 },
		to: { opacity: 1, marginLeft: 0 },
		config: { duration: 1000 },
	});
	const details2 = useSpring({
		from: { opacity: 0, marginLeft: 500 },
		to: { opacity: 1, marginLeft: 0 },
		config: { delay: 300, duration: 1000 },
	});
	const details3 = useSpring({
		from: { opacity: 0, marginLeft: 500 },
		to: { opacity: 1, marginLeft: 0 },
		config: { delay: 600, duration: 1000 },
	});

	return (
		<>
			<animated.div style={details}>
				<div className="solution">
					<img
						className="solution__picture"
						src={BEST.image}
						alt="Item of overall best choice"
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
			</animated.div>

			{currentLocation && inStoreResults && !bestinStore && (
				<animated.div style={details2}>
					<div className="solution">
						<img
							className="solution__picture"
							src={BESTinLocation.image}
							alt="Best option in current location"
						/>
						<div className="solution__details">
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
								Unit Rate: ${BESTinLocation.unitPrice.cost.toFixed(2)}/
								{BESTinLocation.unitPrice.mass}
								{BESTinLocation.unitPrice.units}
							</h2>
						</div>
					</div>
				</animated.div>
			)}

			{inStoreResults && curLocationOptions[1] && (
				<animated.div style={details3} className="last-solution">
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
								Unit Rate: ${curLocationOptions[1].unitPrice.cost.toFixed(2)}/
								{curLocationOptions[1].unitPrice.mass}
								{curLocationOptions[1].unitPrice.units}
							</h2>
						</div>
					</div>
				</animated.div>
			)}
			{!inStoreResults && (
				<animated.div style={details3} className="last-solution">
					<div className="solution">
						<img
							className="solution__picture"
							src={unitRates[1].image}
							alt="Second best option in current lcoation"
						/>
						<div className="solution__details">
							<p className="solution__advice">This is the second best option.</p>
							<h2 className="solution__detail solution__detail--store">
								{unitRates[1].store}
							</h2>
							<h2 className="solution__detail solution__detail--price">
								{unitRates[1].price}
							</h2>
							<h2 className="solution__detail solution__detail--capacity">
								{unitRates[1].capacity}
							</h2>
							<h2 className="solution__detail solution__detail--unitRate">
								Unit Rate: ${unitRates[1].unitPrice.cost.toFixed(2)}/
								{unitRates[1].unitPrice.mass}
								{unitRates[1].unitPrice.units}
							</h2>
						</div>
					</div>
				</animated.div>
			)}
			<TipsSection page={"solutions"} />
		</>
	);
};

export default ResultsSolutions;
