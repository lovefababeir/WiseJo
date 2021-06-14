import React from "react";
import { Link } from "react-router-dom";
import "./FormAlert.scss";

const FormAlert = ({ page }) => {
	return (
		<>
			{page === "shop" && (
				<div className="submission-msg">
					<h3>Search in Progress</h3> You will be redirected as soon as the results
					from all the stores are retrieved. Some stores can be faster than others so
					feel free to check the results available in the COMPARE page.
					<Link to="/about" className="link-to-page">
						{"  "}
						Learn more
					</Link>
				</div>
			)}
			{page === "snap" && (
				<div className="submission-msg">
					<h3>Reading Receipt</h3> You will be redirected to the TRACK page as soon
					as your receipt has been read and analyzed.
					<Link to="/about" className="link-to-page">
						{"  "}
						Learn more
					</Link>
				</div>
			)}
		</>
	);
};

export default FormAlert;
