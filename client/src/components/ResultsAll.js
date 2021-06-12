import React from "react";
import "./ResultsAll.scss";
import { useSpring, animated } from "react-spring";
import ResultsAllGrocerySection from "./ResultsAllGrocerySection";
import { v4 as uuidv4 } from "uuid";
import TipsSection from "./TipsSection";

const ResultsAll = ({ list, deleteHandler, values, setValues, updateList }) => {
	var listOfStores = [];
	const storeList = () => {
		if (!list.length) {
			return;
		}
		const orderedList = list.sort((a, b) => {
			return a.store < b.store ? -1 : 1;
		});
		orderedList.forEach(item => {
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
				{values.searchWord &&
					(values.view === "All" || values.view === "Capacity") && (
						<h2 className="results__subtitle">
							Your results for <span>"{values.searchWord}"</span>:
						</h2>
					)}
				{listOfStores?.map((store, i) => {
					return (
						<ResultsAllGrocerySection
							store={store.store}
							listOfItems={store.listOfItems}
							deleteHandler={deleteHandler}
							key={uuidv4()}
							values={values}
							setValues={setValues}
							updateList={updateList}
						/>
					);
				})}
			</section>
			<TipsSection page={"all"} />
		</animated.div>
	);
};

export default ResultsAll;
