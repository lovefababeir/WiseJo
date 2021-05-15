import React from "react";
import { useSpring, animated } from "react-spring";
import deleteIcon from "../assets/images/delete.svg";

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
				<h2 className="capacity__title">{capacity}</h2>
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
							<>
								<p className="capacity__options">
									<em>{m.store}</em> - {m.price}
									{m.quantity > 1 ? " for pack of " + m.quantity : null} ( {m.title} )
								</p>
							</>
						);
					})}
				</div>
			</div>
		</animated.div>
	);
};

export default ResultsCapacitySelected;
