import React from "react";
import "./ResultsSolutions.scss";
import { useSpring, animated } from "react-spring";
import TipsSection from "./TipsSection";
import notavailable from "../assets/images/notavailable.png";
import SolutionBest from "./SolutionBest";
import SolutionStoreBest from "./SolutionStoreBest";
import SolutionStoreSecond from "./SolutionStoreSecond";
import SolutionSecondBest from "./SolutionSecondBest";

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
			return unitRates?.filter(item => {
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
	let inStoreResults =
		optionsInStore(currentLocation)?.length > 0 ? true : false;

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

	const replaceImage = e => {
		e.target.src = notavailable;
	};
	return (
		<>
			{optionsInStore(currentLocation) && (
				<>
					<animated.div style={details}>
						<SolutionBest
							BEST={BEST}
							notavailable={notavailable}
							replaceImage={replaceImage}
							bestinStore={bestinStore}
							savings={savings}
							BESTinLocation={BESTinLocation}
							optionsInStore={optionsInStore}
							currentLocation={currentLocation}
						/>
					</animated.div>
					{currentLocation && inStoreResults && !bestinStore && (
						<animated.div style={details2}>
							<SolutionStoreBest
								BESTinLocation={BESTinLocation}
								notavailable={notavailable}
								replaceImage={replaceImage}
								capacityDiff={capacityDiff}
							/>
						</animated.div>
					)}

					{inStoreResults && curLocationOptions[1] && (
						<animated.div style={details3} className="last-solution">
							<SolutionStoreSecond
								curLocationOptions={curLocationOptions[1]}
								replaceImage={replaceImage}
								notavailable={notavailable}
							/>
						</animated.div>
					)}
					{!inStoreResults && (
						<animated.div style={details3} className="last-solution">
							<SolutionSecondBest
								unitRates={unitRates[1]}
								replaceImage={replaceImage}
							/>
						</animated.div>
					)}
				</>
			)}
			<TipsSection page={"solutions"} />
		</>
	);
};

export default ResultsSolutions;
