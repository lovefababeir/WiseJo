import React from "react";
import Collapse from "react-bootstrap/Collapse";
import track from "../assets/images/track.svg";
import edit from "../assets/images/edit.svg";

const AboutTrack = ({ open, setOpen }) => {
	return (
		<>
			{" "}
			<div
				onClick={() => {
					open !== "track" ? setOpen("track") : setOpen("");
				}}
				aria-controls="collapse-text-track"
				aria-expanded={open === "track"}
				className="wisejo__pages"
			>
				<img
					src={track}
					className="wisejo__menu-icons"
					alt="Icon for the track button on the menu."
				/>{" "}
				Track
			</div>
			<Collapse in={open === "track"}>
				<p id="collapse-text-track" className="wisejo__pages-description">
					WiseJo keeps a collection of your receipts and constructs a table that
					summarizes a list of all your expenses. You can select a receipt on the
					table to see the breakdown of everything within the purchase and the
					details on the store. Click{" "}
					<img src={edit} className="wisejo-icons" alt="edit icon" /> to edit the
					receipt and save the changes or to delete the receipt.
				</p>
			</Collapse>
		</>
	);
};

export default AboutTrack;
