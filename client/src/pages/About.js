import React, { useState } from "react";
import wisejo from "../assets/images/WiseJo.png";
import "./About.scss";
import stores from "../assets/images/store.svg";
import capacity from "../assets/images/scale.svg";
import trash from "../assets/images/delete.svg";
import edit from "../assets/images/edit.svg";
import walmart from "../assets/images/walmart.png";
import longos from "../assets/images/longos.png";
import nofrills from "../assets/images/nofrills.png";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

const About = () => {
	const [open, setOpen] = useState("");

	const shop = () => {
		return (
			<svg
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				width="1280.000000pt"
				height="1225.000000pt"
				viewBox="0 0 1280.000000 1225.000000"
				preserveAspectRatio="xMidYMid meet"
			>
				<metadata>
					Created by potrace 1.15, written by Peter Selinger 2001-2017
				</metadata>
				<g
					transform="translate(0.000000,1225.000000) scale(0.100000,-0.100000)"
					fill="#f1aa6b"
					stroke="none"
				>
					<path
						d="M11390 12078 c-547 -94 -1018 -179 -1047 -190 -28 -10 -70 -34 -93
-52 -80 -63 -75 -53 -318 -676 -55 -140 -236 -605 -403 -1032 l-303 -778 -77
0 c-42 0 -702 -16 -1466 -35 -763 -19 -2117 -53 -3008 -75 -4532 -113 -4369
-108 -4421 -126 -65 -21 -100 -44 -151 -96 -51 -53 -93 -140 -100 -210 -3 -34
27 -317 86 -798 50 -410 149 -1231 221 -1825 203 -1679 185 -1546 216 -1615
27 -61 103 -144 160 -173 70 -36 -96 -21 2374 -217 487 -39 1281 -102 1765
-140 484 -39 1205 -96 1603 -128 l722 -57 660 -518 c362 -285 684 -545 714
-578 65 -70 132 -198 147 -284 29 -161 -37 -291 -177 -346 l-59 -23 -945 -8
c-520 -4 -2297 -12 -3950 -16 l-3005 -8 -58 -23 c-81 -32 -166 -113 -203 -193
-24 -53 -28 -75 -28 -143 1 -49 7 -97 18 -124 22 -59 79 -133 132 -171 87 -62
100 -64 441 -70 l313 -5 -54 -42 c-114 -88 -213 -238 -254 -386 -12 -45 -17
-98 -16 -192 0 -113 4 -141 27 -210 99 -295 351 -492 657 -512 278 -17 557
139 688 385 120 226 113 502 -17 722 -40 67 -125 161 -196 217 l-40 32 851 0
c468 1 1865 4 3105 7 l2254 6 -45 -29 c-215 -142 -343 -396 -327 -653 20 -330
262 -607 589 -674 162 -33 304 -14 467 66 91 43 116 62 191 137 70 70 94 103
133 181 64 128 81 200 81 335 0 131 -17 206 -73 320 -48 97 -116 183 -196 248
-67 53 -197 123 -251 133 -50 9 -50 19 2 39 68 26 178 89 254 145 191 142 377
419 411 612 15 90 15 270 0 358 -19 103 -67 248 -113 340 -129 255 -245 370
-850 844 -252 197 -458 363 -458 368 0 5 72 195 161 421 89 227 196 502 239
612 43 110 160 409 260 665 100 256 218 557 262 670 99 255 317 811 648 1660
38 96 150 384 250 640 194 497 220 562 500 1280 182 466 298 763 392 1005 28
72 52 131 53 133 2 2 409 72 905 157 999 170 967 162 1054 255 73 78 100 147
100 250 0 96 -25 166 -82 231 -68 78 -180 130 -276 128 -28 0 -499 -77 -1046
-171z m-2460 -3360 c-269 -694 -462 -1188 -473 -1208 l-13 -25 -329 0 -330 0
0 640 0 640 405 11 c223 6 487 11 587 12 l181 2 -28 -72z m-1402 -595 l-3
-638 -612 -3 -613 -2 0 625 0 625 118 1 c64 1 313 7 552 13 239 7 463 14 498
14 l62 2 -2 -637z m-1485 -20 l-3 -618 -612 0 -613 0 -3 603 -2 602 42 1 c24
1 239 7 478 13 239 7 498 14 575 14 l140 2 -2 -617z m-1483 -23 l0 -600 -612
2 -613 3 -3 583 c-1 320 -1 583 0 583 7 3 873 26 1041 27 l187 2 0 -600z
m-1485 -15 l0 -580 -612 -2 -613 -3 0 570 0 570 138 1 c75 1 335 7 577 14 242
7 456 12 475 11 l35 -1 0 -580z m-1485 -20 l0 -565 -444 0 c-290 0 -447 4
-451 10 -10 16 -136 1082 -129 1089 5 5 611 25 917 29 l107 2 0 -565z m0
-1390 l0 -575 -365 0 c-201 0 -365 2 -365 4 0 7 -129 1077 -134 1114 l-5 32
435 0 434 0 0 -575z m1490 0 l0 -575 -615 0 -615 0 0 575 0 575 615 0 615 0 0
-575z m1480 0 l0 -575 -615 0 -615 0 0 575 0 575 615 0 615 0 0 -575z m1483 3
l-3 -573 -612 0 -613 0 -3 573 -2 572 617 0 618 0 -2 -572z m1487 -3 l0 -575
-615 0 -615 0 0 575 0 575 615 0 615 0 0 -575z m796 513 c-31 -81 -381 -976
-417 -1065 -7 -20 -16 -23 -69 -23 l-60 0 0 575 0 575 285 0 285 0 -24 -62z
m-6736 -1751 l0 -413 -297 24 c-164 13 -301 26 -304 30 -4 4 -25 167 -48 362
-23 195 -44 367 -47 383 l-6 27 351 0 351 0 0 -413z m1490 -57 l0 -470 -29 0
c-15 0 -281 20 -590 45 -309 25 -573 45 -586 45 l-25 0 0 425 0 425 615 0 615
0 0 -470z m1480 -60 c0 -291 -3 -530 -7 -530 -23 -1 -1200 92 -1210 96 -10 3
-13 108 -13 484 l0 480 615 0 615 0 0 -530z m1483 -64 l2 -588 -60 6 c-33 3
-296 24 -585 46 -289 22 -538 43 -555 45 l-30 5 2 537 c2 296 3 539 3 541 0 1
275 1 610 0 l610 -3 3 -589z m1487 244 l0 -349 -109 -278 c-59 -153 -112 -288
-116 -301 -5 -17 -11 -22 -23 -17 -44 19 -115 27 -482 55 -217 17 -419 33
-447 36 l-53 6 0 599 0 599 615 0 615 0 0 -350z m270 343 c0 -5 -5 -15 -10
-23 -8 -12 -10 -11 -10 8 0 12 5 22 10 22 6 0 10 -3 10 -7z m-6066 -4698 c109
-52 199 -156 231 -269 27 -94 18 -223 -23 -307 -38 -79 -128 -169 -204 -204
-262 -119 -561 39 -610 324 -31 179 68 369 235 451 110 54 263 56 371 5z
m6971 -6 c80 -39 167 -128 201 -204 164 -371 -214 -737 -583 -565 -163 75
-264 270 -235 448 48 287 358 449 617 321z"
					/>
					<path
						d="M1455 937 c-60 -29 -87 -57 -114 -117 -81 -178 86 -370 274 -316 105
31 168 114 168 221 1 131 -86 223 -218 232 -49 3 -69 0 -110 -20z"
					/>
					<path
						d="M8439 946 c-56 -20 -96 -53 -126 -104 -24 -39 -28 -58 -28 -117 1
-78 14 -113 66 -163 48 -46 95 -66 164 -65 74 0 128 25 178 84 150 175 -36
443 -254 365z"
					/>
				</g>
			</svg>
		);
	};
	const compare = () => {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="tags"
				className="svg-inline--fa fa-tags fa-w-20"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 640 512"
			>
				<path
					fill="#f1aa6b"
					d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
				></path>
			</svg>
		);
	};
	const snap = () => {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="camera"
				className="svg-inline--fa fa-camera fa-w-16"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="#f1aa6b"
					d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
				></path>
			</svg>
		);
	};
	const track = () => {
		return (
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="receipt"
				className="svg-inline--fa fa-receipt fa-w-12"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
			>
				<path
					fill="#f1aa6b"
					d="M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"
				></path>
			</svg>
		);
	};
	return (
		<section className="wisejo">
			<h1 className="signin__appName">WiseJo</h1>
			<p className="wisejo__about">
				WiseJo is an application designed to help users make smart choices when
				shopping at the grocery store and to help them track their expenses.
			</p>
			<div
				onClick={() => {
					open !== "shop" ? setOpen("shop") : setOpen("");
				}}
				aria-controls="example-collapse-text"
				aria-expanded={open === "shop" ? true : false}
				className="wisejo__pages"
			>
				{shop()} Shop
			</div>
			<Collapse in={open === "shop" ? true : false}>
				<div id="example-collapse-text" className="wisejo__pages-description">
					When we shop, we want to know where the best place to purchase the things
					we want. On the SHOP page you can submit a search for the item you would
					like to purchase. You simply type what you want to search up and the store
					you are shopping in or are planning to shop in. WiseJo searches up the
					items for you and retrieves the details of the items available at the
					stores listed. The search can take up to 30s to get the results from most
					stores but might take up to 2-3mins to complete for stores like Walmart.
					Once completed, you will be redirected to the COMPARE page where you will
					see the search results. You may choose to go to the results page before you
					are redirected to see which results are available. Just remember to refresh
					to see any updates.
				</div>
			</Collapse>
			<div
				onClick={() => {
					open !== "compare" ? setOpen("compare") : setOpen("");
				}}
				aria-controls="example-collapse-text"
				aria-expanded={open === "compare" ? true : false}
				className="wisejo__pages"
			>
				{compare()} Compare
			</div>
			<Collapse in={open === "compare" ? true : false}>
				<div id="example-collapse-text">
					<p className="wisejo__pages-description">
						This page allows you to see the results 3 different ways. There is a
						submenu under the title to help you change views.
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
			<div
				onClick={() => {
					open !== "snap" ? setOpen("snap") : setOpen("");
				}}
				aria-controls="example-collapse-text"
				aria-expanded={open === "snap" ? true : false}
				className="wisejo__pages"
			>
				{snap()} Snap
			</div>
			<Collapse in={open === "snap" ? true : false}>
				<div id="example-collapse-text">
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
			<div
				onClick={() => {
					open !== "track" ? setOpen("track") : setOpen("");
				}}
				aria-controls="example-collapse-text"
				aria-expanded={open === "track" ? true : false}
				className="wisejo__pages"
			>
				{track()} Track
			</div>
			<Collapse in={open === "track" ? true : false}>
				<p id="example-collapse-text" className="wisejo__pages-description">
					You'll find a table that summarizes a list of all your expenses. You can
					select a receipt to see the breakdown of everything within the purchase the
					details on the store. Click{" "}
					<img src={edit} className="wisejo-icons" alt="edit icon" /> to edit the
					receipt and save the changes or to delete the receipt.
				</p>
			</Collapse>
			<h4 className="wisejo__message">Any questions or concerns?</h4>
			<p>Go to your profile and complete the form to contact the WiseJo admin.</p>
			<Link to="/" className="returnBtn">
				Back to Dashboard
			</Link>
		</section>
	);
};

export default About;
