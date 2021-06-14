import React from "react";
import Collapse from "react-bootstrap/Collapse";
import snap from "../assets/images/snap.svg";
import walmart from "../assets/images/walmart.png";
import longos from "../assets/images/longos.png";
import nofrills from "../assets/images/nofrills.png";

const AboutSnap = ({ open, setOpen }) => {
	return (
		<>
			{" "}
			<div
				onClick={() => {
					open !== "snap" ? setOpen("snap") : setOpen("");
				}}
				aria-controls="collapse-text-snap"
				aria-expanded={open === "snap"}
				className="wisejo__pages"
			>
				<img
					src={snap}
					className="wisejo__menu-icons"
					alt="Icon for the snap button on the menu."
				/>{" "}
				Snap
			</div>
			<Collapse in={open === "snap"}>
				<div id="collapse-text-snap">
					<p className="wisejo__pages-description">
						No one wants to keep their receipts anymore but we always want to be able
						to keep track of what we spend. Sometimes we see our bank statements but
						want to go back to check what we purchased. Wisejo helps you track all
						your grocery expenses using the image of your receipt. On the SNAP page,
						simply select the store where you made your purchase and submit a photo of
						your receipt. If you can't see your photo in the preview that means your
						image is not in jpg format. If you're using your phone, you can take a
						screenshot of your picture and crop it and it will convert to jpg. For
						best results:
					</p>
					<div className="store-receipts">
						<div>
							<img src={longos} alt="Longo's" /> Take your photo just below the top
							logo and just below the payment summary and above "Longo's Thank You
							Rewards".
						</div>
						<div>
							<img src={nofrills} alt="No Frills" /> Take your photo just below the top
							logo and just below the "TRANSACTION RECORD", just after "APPROVED".
						</div>

						<div>
							<img src={walmart} alt="Walmart" /> Take your photo starting at the
							bottom of the top survey ad, but not to close the STORE #####. Include
							everything up to and including purchase summary which includes the total
							and change(if applicable).
						</div>
					</div>
				</div>
			</Collapse>
		</>
	);
};

export default AboutSnap;
