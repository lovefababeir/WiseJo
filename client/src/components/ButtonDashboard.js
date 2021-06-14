import React from "react";
import { Link } from "react-router-dom";
import backArrow from "../assets/images/arrow.svg";
import "./ButtonDashboard.scss";

const ButtonDashboard = () => {
	return (
		<div className="button">
			<Link to="/" className="button__toDashboard">
				<img
					src={backArrow}
					className="button__backArrow"
					alt="Click here to go back to the dashboard"
				/>
				Back to Dashboard
			</Link>
		</div>
	);
};

export default ButtonDashboard;
