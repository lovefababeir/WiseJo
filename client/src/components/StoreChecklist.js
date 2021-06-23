import React from "react";
import "./StoreChecklist.scss";
import success from "../assets/images/success.png";
import fail from "../assets/images/fail.png";
import box from "../assets/images/box.png";

const StoreChecklist = ({ storelist }) => {
	console.log(storelist);
	const stores = Object.keys(storelist);

	return (
		<div className="loadinglist">
			<ul className="loadinglist__list">
				{stores?.map(x => {
					return (
						<li className="loadinglist__item">
							<img
								className="loadinglist__icon"
								src={
									storelist[x] === "loading"
										? box
										: storelist[x] === "success"
										? success
										: fail
								}
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
