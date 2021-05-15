import React from "react";
import { v4 as uuidv4 } from "uuid";
import ResultsAllItemCard from "./ResultsAllItemCard";

const ResultsAllGrocerySection = ({ store, listOfItems, deleteHandler }) => {
	return (
		<div key={uuidv4()}>
			<div
				className={`store__logo store__logo--${
					store === "Walmart" ? "0" : store === "Longo's" ? "1" : "2"
				}`}
			></div>
			<div className={`store__box store__box--${store}`}>
				{listOfItems
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
};

export default ResultsAllGrocerySection;
