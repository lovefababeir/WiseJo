import React from "react";
import "./ResultsAll.scss";
import deleteIcon from "../assets/images/delete.svg";
import { useSpring, animated } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import ResultsAllItemCard from "./ResultsAllItemCard";

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
						<div key={uuidv4()}>
							<div
								className={`store__logo store__logo--${
									store.store === "Walmart" ? "0" : store.store === "Longo's" ? "1" : "2"
								}`}
							></div>
							<div className={`store__box store__box--${store.store}`}>
								{store.listOfItems
									.sort((a, b) => {
										return a.value * a.quantity - b.value * b.quantity;
									})
									.map(item => {
										return (
											<ResultsAllItemCard
												image={item.image}
												store={item.store}
												capacity={item.capacity}
												price={item.price}
												title={item.title}
												productID={item.productID}
												deleteHandler={deleteHandler}
											/>
										);
									})}
							</div>
						</div>
					);
				})}
			</section>
		</animated.div>
	);
};

export default ResultsAll;
