import React from "react";
import Collapse from "react-bootstrap/Collapse";
import compare from "../assets/images/compare.svg";
import wisejo from "../assets/images/WiseJo.png";
import stores from "../assets/images/store.svg";
import capacity from "../assets/images/scale.svg";
import trash from "../assets/images/delete.svg";

const AboutCompare = ({ open, setOpen }) => {
	return (
		<>
			{" "}
			<div
				onClick={() => {
					open !== "compare" ? setOpen("compare") : setOpen("");
				}}
				aria-controls="collapse-text-compare"
				aria-expanded={open === "compare" ? true : false}
				className="wisejo__pages"
			>
				<img
					src={compare}
					className="wisejo__menu-icons"
					alt="Icon for the compare button on the menu."
				/>{" "}
				Compare
			</div>
			<Collapse in={open === "compare"}>
				<div id="collapse-text-compare">
					<p className="wisejo__pages-description">
						You'll find the results of your most recent search here. The items listed
						are top 8 items from each store that was able to return some results. This
						page allows you to see the results 3 different ways. There is a submenu
						under the title to help you change views.
					</p>
					<div className="wisejo__subpages">
						<img src={stores} alt="" />
						<p className="subpage__description">
							Results sorted by store. Sometimes some of the items returned by the
							store are not exactly what you want. Use the{" "}
							<img src={trash} className="wisejo-icons" alt="trash can" /> to delete
							the item.
						</p>
					</div>
					<div className="wisejo__subpages">
						<img src={capacity} alt="" />{" "}
						<p className="subpage__description">
							Results sorted by mass and quantity. Are you looking to buy more or to
							buy less? Use the{" "}
							<img src={trash} className="wisejo-icons" alt="trash can" /> to delete
							the category that you don't want.
						</p>
					</div>
					<div className="wisejo__subpages">
						<img src={wisejo} alt="" />{" "}
						<p className="subpage__description">
							Solutions for what would give you the most for your money. This answer is
							not the same for everyone and depends what you've kept from the results
							in the Store and Capacity subpages. If the solution is not something
							you're interested in buying, go back delete the item under the Store its
							from or delete all of them under the Capacity category it is in and come
							back to see the new Solutions.
						</p>
					</div>{" "}
				</div>
			</Collapse>
		</>
	);
};

export default AboutCompare;
