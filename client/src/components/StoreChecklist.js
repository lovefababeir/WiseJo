import React from "react";
import "./StoreChecklist.scss";
import success from "../assets/images/success.png";
import fail from "../assets/images/fail.png";
import box from "../assets/images/box.png";
import { v4 as uuidv4 } from "uuid";

const StoreChecklist = ({ storelist }) => {
	const stores = Object.keys(storelist);

	return (
		<div className="loadinglist">
			<ul className="loadinglist__list">
				{stores?.map(x => {
					return (
						<li className="loadinglist__item" key={uuidv4()}>
							<img
								className="loadinglist__icon"
								src={
									storelist[x] === "loading"
										? box
										: storelist[x] === "success"
										? success
										: fail
								}
								alt={`Results from ${x} are ${
									storelist[x] === "success" ? "available" : "not available"
								}`}
							/>
							{x === "longos" ? "Longo's" : x === "nofrills" ? "No Frills" : x}{" "}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default StoreChecklist;
