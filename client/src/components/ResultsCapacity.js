import React from "react";
import "./ResultsCapacity.scss";
import deleteIcon from "../assets/images/delete.svg";
import { useSpring, animated } from "react-spring";

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
								<>
									<div className="capacity__box">
										<div
											className="capacity__size"
											onClick={() => {
												changeSelected(category);
											}}
										>
											<img
												className="capacity__image"
												src={category.image}
												alt={`The item with capacity: ${category.capacity}`}
											/>
										</div>
										<h1 className="capacity__size-title">Size: {category.capacity}</h1>
										<h2 className="capacity__optionsNum">
											{category.storeList.length} Available{" "}
											{category.storeList.length > 1 ? "Options" : "Option"}
										</h2>
									</div>
								</>
							);
						})}
					</div>

					<div className="capacity__selected">
						{selected && (
							<animated.div style={details2}>
								{" "}
								<div className="capacity__details">
									<h2 className="capacity__title">{selected.capacity}</h2>
									<img
										src={deleteIcon}
										alt="Click here to delete item"
										onClick={e => {
											deleteHandler("items", selected.value, selected.quantity);
										}}
									/>
									<div className="capacity__optionsList">
										{selected.storeList.map(m => {
											return (
												<>
													<p className="capacity__options">
														<em>{m.store}</em> - {m.price}
														{m.quantity > 1 ? " for pack of " + m.quantity : null} ( {m.title}{" "}
														)
													</p>
												</>
											);
										})}
									</div>
								</div>
							</animated.div>
						)}
					</div>
				</animated.div>
			</section>
		</>
	);
};

export default ResultsCapacity;
