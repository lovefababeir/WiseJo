import React from "react";
import { v4 as uuidv4 } from "uuid";
import ResultsAllItemCard from "./ResultsAllItemCard";
import walmartLogo from "../assets/images/walmart.png";
import longosLogo from "../assets/images/longos.png";
import nofrillsLogo from "../assets/images/nofrills.png";
import sobeysLogo from "../assets/images/sobeys.png";
import loblawsLogo from "../assets/images/loblaws.png";

const ResultsAllGrocerySection = ({
	store,
	listOfItems,
	deleteHandler,
	values,
	setValues,
	updateList,
}) => {
	const storeName = store.split(" ").join("").toLowerCase();
	console.log("storename", store, storeName);
	return (
		<div>
			<img
				className={`store__logo store__logo--${storeName}`}
				src={
					store === "Walmart"
						? walmartLogo
						: store === "Longo's"
						? longosLogo
						: store === "No Frills"
						? nofrillsLogo
						: store === "Sobeys"
						? sobeysLogo
						: store === "Loblaws"
						? loblawsLogo
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
								values={values}
								setValues={setValues}
								updateList={updateList}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default ResultsAllGrocerySection;
