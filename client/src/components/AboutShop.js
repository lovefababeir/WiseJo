import React from "react";
import Collapse from "react-bootstrap/Collapse";
import shop from "../assets/images/shop.svg";
import success from "../assets/images/success.png";
import fail from "../assets/images/fail.png";

const AboutShop = ({ open, setOpen }) => {
	return (
		<>
			{" "}
			<div
				onClick={() => {
					open !== "shop" ? setOpen("shop") : setOpen("");
				}}
				aria-controls="collapse-text-shop"
				aria-expanded={open === "shop"}
				className="wisejo__pages"
			>
				<img
					src={shop}
					className="wisejo__menu-icons"
					alt="Icon for the shop button on the menu."
				/>{" "}
				Shop
			</div>
			<Collapse in={open === "shop"}>
				<div id="collapse-text-shop" className="wisejo__pages-description">
					When we shop, we want to know where the best place to purchase the things
					we want. On the SHOP page you can submit a search for the item you would
					like to purchase. You simply type what you want to search up and select the
					store you are shopping in or are planning to shop in. WiseJo searches up
					the items for you and retrieves the details of the items available at the
					stores listed. Since WiseJo retrieves the up-to-date prices, the search can
					take up to 30s. <img src={success} className="wisejo-icons" /> means that
					the store successfully returns results and{" "}
					<img src={fail} className="wisejo-icons" /> means that it was unable to and
					that you can try again after. Once completed, you will be redirected to the
					COMPARE page where you will see the search results. If you wish to see
					which results are available before all the searches are complete you may
					choose to go to the COMPARE page. Just remember to refresh to see any
					updates.
				</div>
			</Collapse>
		</>
	);
};

export default AboutShop;
