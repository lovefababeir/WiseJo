import React from "react";
import { Link } from "react-router-dom";
import "./FormAlert.scss";

const FormAlert = ({ page }) => {
	return (
		<>
			{page === "shop" && (
				<div className="submission-msg">
					<h3>Search in Progress</h3> You will be redirected as soon as the results
					from all the stores are retrieved. Some stores may take up to 30s so we
					thank you for your patience. Feel free to jump ahead to the COMPARE page to
					see the results that are already available. If you do, don't forget to
					refresh the page to see the updates.
					<Link to="/about" className="link-to-page" target="_blank">
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
