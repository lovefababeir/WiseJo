import React from "react";
import { v4 as uuidv4 } from "uuid";
import ResultsAllItemCard from "./ResultsAllItemCard";
import walmartLogo from "../assets/images/walmart.png";
import longosLogo from "../assets/images/longos.png";
import nofrillsLogo from "../assets/images/nofrills.png";
import sobeysLogo from "../assets/images/sobeys.png";

const ResultsAllGrocerySection = ({ store, listOfItems, deleteHandler }) => {
	return (
		<div>
			<img
				className={`store__logo store__logo--${
					store === "Walmart"
						? "0"
						: store === "Longo's"
						? "1"
						: store === "No Frills"
						? "2"
						: store === "Sobeys"
						? "3"
						: "4"
				}`}
				src={
					store === "Walmart"
						? walmartLogo
						: store === "Longo's"
						? longosLogo
						: store === "No Frills"
						? nofrillsLogo
						: store === "Sobeys"
						? sobeysLogo
						: "4"
				}
				alt={`Results from ${store}`}
			/>
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
								key={uuidv4()}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default ResultsAllGrocerySection;
