import React from "react";
import "./TipsSection.scss";

const TipsSection = ({ page, item }) => {
	return (
		<section className="tips">
			<h1 className="tips__title">Tips for best results:</h1>
			{page === "solutions" && (
				<p className="tips__tip">
					Go back to the first page where you saw all the items available in the
					stores. Delete the items you're not interested in purchasing and come back
					to this page to see what new adice I have for you.
				</p>
			)}
			{page === "all" && (
				<p className="tips__tip">
					Missing the results from a store? Sometimes the search for items doesn't
					work the first time around. Try submitting a search for {item} again.
				</p>
			)}
			{page === "all" && (
				<p className="tips__tip">
					Not the item you're looking for? The results you see are the top 8 returned
					from each store for "{item}". Try changing your search to something more
					specific.
				</p>
			)}
			{(page === "all" || page === "capacity" || page === "solutions") && (
				<p className="tips__tip">
					Not seeing any results? Make sure you have a strong internet service and
					try the search again.
				</p>
			)}
			{page === "receiptList" && (
				<p className="tips__tip">
					For best results, make sure that the picture of your receipt is not blurry
					and that starts at the first line and the it ends just above the
					"Transaction Record" section of the receipt. You can click on the edit icon
					on the top right of the receipt preview to edit the receipt details
					manually and save or delete using the buttons at the bottom of the receipt.
				</p>
			)}
		</section>
	);
};

export default TipsSection;
