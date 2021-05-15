import React from "react";
import "./ResultsAll.scss";
import { useSpring, animated } from "react-spring";
import ResultsAllGrocerySection from "./ResultsAllGrocerySection";
import { v4 as uuidv4 } from "uuid";

const ResultsAll = ({ list, deleteHandler }) => {
	var listOfStores = [];
	const storeList = () => {
		list.sort((a, b) => {
			return a.store - b.store;
		});
		list.forEach(item => {
			if (!listOfStores.find(i => item.store === i.store)) {
				const details = {
					store: item.store,
					listOfItems: list.filter(n => {
						return n.store === item.store;
					}),
				};
				listOfStores.push(details);
			}
		});
	};
	storeList();

	const details = useSpring({
		from: { opacity: 0, marginTop: -500 },
		to: { opacity: 1, marginTop: 0 },
		config: { delay: 1000, duration: 2000 },
	});
	return (
		<animated.div style={details}>
			<section className="store">
				{listOfStores.map((store, i) => {
					return (
						<ResultsAllGrocerySection
							store={store.store}
							listOfItems={store.listOfItems}
							deleteHandler={deleteHandler}
							key={uuidv4()}
						/>
					);
				})}
			</section>
		</animated.div>
	);
};

export default ResultsAll;
