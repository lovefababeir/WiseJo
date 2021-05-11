import React from "react";
import "./ResultsAll.scss";
import deleteIcon from "../assets/images/delete.svg";
// import { Spring } from "react-spring";

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
	return (
		// <Spring
		// 	from={{ opacity: 0, marginTop: -500 }}
		// 	to={{ opacity: 1, marginTop: 0 }}
		// 	config={{ delay: 1000, duration: 2000 }}
		// >
		// 	{props => (
		// 		<div style={props}>
		<section className="store">
			{listOfStores.map((store, i) => {
				return (
					<>
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
										<div className="item">
											<img
												className="item__image"
												src={item.image}
												alt={`The item with capacity: (${item.capacity}) at ${item.store}`}
											/>
											<p className="item__title">{item.title}</p>
											<div className="item__details">
												<div>
													<p className="item__price">{item.price}</p>
													<p className="item__capacity">{item.capacity}</p>
												</div>
												<img
													src={deleteIcon}
													alt="Click here to delete item"
													onClick={e => {
														deleteHandler("item", item.productID);
													}}
													className="item__delete"
												/>
											</div>
										</div>
									);
								})}
						</div>
					</>
				);
			})}
		</section>
		// 		</div>
		// 	)}
		// </Spring>
	);
};

export default ResultsAll;
