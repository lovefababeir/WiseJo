import React from "react";
import { useSpring, animated } from "react-spring";
import deleteIcon from "../assets/images/delete.svg";
import ResultsCapacitySelectedStoreDetails from "./ResultsCapacitySelectedStoreDetails";
import { v4 as uuidv4 } from "uuid";

const ResultsCapacitySelected = ({
	capacity,
	value,
	quantity,
	storeList,
	deleteHandler,
}) => {
	const animationStyle = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});
	return (
		<animated.div style={animationStyle}>
			<div className="capacity__details">
				<h2 className="capacity__title capacity__title--selected">
					Your options for {capacity}:
				</h2>
				<img
					src={deleteIcon}
					alt="Click here to delete item"
					onClick={e => {
						deleteHandler("items", value, quantity);
					}}
				/>
				<div className="capacity__optionsList">
					{storeList.map(m => {
						return (
							<ResultsCapacitySelectedStoreDetails
								store={m.store}
								price={m.price}
								quantity={m.quantity}
								title={m.title}
								key={uuidv4()}
							/>
						);
					})}
				</div>
			</div>
		</animated.div>
	);
};

export default ResultsCapacitySelected;
