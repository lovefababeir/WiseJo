import React from "react";
import "./StoreChecklist.scss";
import success from "../assets/images/success.png";
import fail from "../assets/images/fail.png";
import box from "../assets/images/loading.png";
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
										: storelist[x] === "fail"
										? fail
										: success
								}
								alt={`Results from ${x} are ${
									storelist[x] === "success" ? "available" : "not available"
								}`}
							/>
							<span>
								{x === "longos" ? "Longo's" : x === "nofrills" ? "No Frills" : x}
							</span>{" "}
							(
							{storelist[x] === "fail"
								? "not available"
								: storelist[x] === "loading"
								? "loading..."
								: `${storelist[x]} items`}
							)
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default StoreChecklist;
