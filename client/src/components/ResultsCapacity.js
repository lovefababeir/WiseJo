import React from "react";
import "./ResultsCapacity.scss";
import deleteIcon from "../assets/images/delete.svg";
import { useSpring, animated } from "react-spring";
import ResultsCapacityItemCard from "./ResultsCapacityItemCard";
import ResultsCapacitySelected from "./ResultsCapacitySelected";

const ResultsCapacity = ({ list, deleteHandler, selected, changeSelected }) => {
	var newList = [];
	const capacityList = () => {
		//value refers to the capacity as a number
		list.sort((a, b) => {
			return a.value * a.quantity - b.value * a.quantity;
		});
		list.forEach(item => {
			if (
				!newList.find(i => item.value === i.value && i.quantity === item.quantity)
			) {
				const details = {
					image: item.image,
					value: item.value,
					quantity: item.quantity,
					capacity: item.capacity,
					title: item.title,
					storeList: list.filter(n => {
						return n.value === item.value && n.quantity === item.quantity;
					}),
				};

				newList.push(details);
			}
		});
	};
	capacityList();

	const details = useSpring({
		from: { opacity: 0, marginLeft: 500 },
		to: { opacity: 1, marginLeft: 0 },
	});
	const details2 = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<>
			<section className="capacity">
				<animated.div style={details}>
					<div className="capacity__carousel">
						{newList.map(category => {
							return (
								<ResultsCapacityItemCard
									image={category.image}
									capacity={category.capacity}
									storeList={category.storeList}
									changeSelected={changeSelected}
									category={category}
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
								deleteHandler={deleteHandler}
							/>
						)}
					</div>
				</animated.div>
			</section>
		</>
	);
};

export default ResultsCapacity;
