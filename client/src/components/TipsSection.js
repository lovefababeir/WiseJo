import React from "react";
import "./TipsSection.scss";

const TipsSection = ({ page }) => {
	console.log(page);
	return (
		<section className="tips">
			<h1 className="tips__title">Not the results you want? Here are some tips</h1>
			{page === "solution" && (
				<p className="tips__tip">
					Go back to the first page where you saw all the items available in the
					stores. Delete the items you're not interested in purchasing and come back
					to this page to see what new adice I have for you.
				</p>
			)}
			{page === "all" && (
				<p className="tips__tip">
					The results you see are the top 6 returned from each store according the
					item you submitted in the Shop form. Try changing your search to something
					more specific.
				</p>
			)}
			<p className="tips__tip">
				The server may have had some trouble retrieving data from the store. Try
				searching the item again to see if you can get some new results this time
				and make sure your internet service is strong.
			</p>
		</section>
	);
};

export default TipsSection;
