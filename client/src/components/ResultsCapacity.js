import React from "react";
import "./ResultsCapacity.scss";
import { useSpring, animated } from "react-spring";
import ResultsCapacityItemCard from "./ResultsCapacityItemCard";
import ResultsCapacitySelected from "./ResultsCapacitySelected";
import { v4 as uuidv4 } from "uuid";
import TipsSection from "./TipsSection";

const ResultsCapacity = ({
	list,
	selected,
	changeSelected,
	values,
	setValues,
	updateList,
}) => {
	const sortByCapacity = itemList => {
		if (!itemList.length) {
			return;
		}

		const capacityList = [];
		//value refers to the capacity as a number
		const resultsList = itemList.slice(0).filter(item => {
			return item.capacity && item.value;
		});
		resultsList.sort((a, b) => {
			return a.value * a.quantity - b.value * a.quantity;
		});
		resultsList.forEach(item => {
			if (
				!capacityList.find(
					i => item.value === i.value && i.quantity === item.quantity,
				)
			) {
				const details = {
					image: item.image,
					value: item.value,
					quantity: item.quantity,
					capacity: item.capacity,
					title: item.title,
					storeList: resultsList.filter(n => {
						return n.value === item.value && n.quantity === item.quantity;
					}),
				};

				capacityList.push(details);
			}
		});
		return capacityList;
	};
	const newList = sortByCapacity(list);

	const animationStyle = useSpring({
		from: { opacity: 0, marginLeft: 500 },
		to: { opacity: 1, marginLeft: 0 },
	});

	return (
		<>
			<section className="capacity">
				{values.searchWord &&
					(values.view === "All" || values.view === "Capacity") && (
						<h2 className="results__subtitle--capacity">
							Your results for <span>"{values.searchWord}"</span>:
						</h2>
					)}
				<animated.div style={animationStyle}>
					<div className="capacity__carousel">
						{newList?.map(category => {
							return (
								<ResultsCapacityItemCard
									image={category.image}
									capacity={category.capacity}
									storeList={category.storeList}
									changeSelected={changeSelected}
									category={category}
									key={uuidv4()}
								/>
							);
						})}
					</div>

					<div className="capacity__selected">
						{selected && (
							<ResultsCapacitySelected
								capacity={selected.capacity}
								value={selected.value}
								quantity={selected.quantity}
								storeList={selected.storeList}
								values={values}
								setValues={setValues}
								updateList={updateList}
							/>
						)}
					</div>
				</animated.div>
			</section>
			<TipsSection page={"capacity"} />
		</>
	);
};

export default ResultsCapacity;
