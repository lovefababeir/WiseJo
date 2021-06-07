import React from "react";
import { useSpring, animated } from "react-spring";
import deleteIcon from "../assets/images/delete.svg";
import ResultsCapacitySelectedStoreDetails from "./ResultsCapacitySelectedStoreDetails";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
const ResultsCapacitySelected = ({
	capacity,
	value,
	quantity,
	storeList,
	values,
	setValues,
}) => {
	const { createToken } = useAuth();
	const deleteCapacityHandler = (value, quantity) => {
		const url = `${process.env.REACT_APP_BASE_URL}itemSearch/items/${value}/${quantity}`;

		createToken()
			.then(token => {
				axios
					.delete(url, token)
					.then(() => {
						setValues({ ...values, updateList: true });
					})
					.catch(function (error) {
						setValues({ ...values, errorMessageAll: "Failed to delete item" });
					});
			})
			.catch(err =>
				setValues({ ...values, errorMessageAll: "Failed to create acces token" }),
			);
	};

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
						deleteCapacityHandler(value, quantity);
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
