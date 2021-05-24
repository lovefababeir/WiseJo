const { text } = require("express");

// console.log(receipt(receiptResults));

//======================================
const resultWalmart = [
	{
		boundingBox: "115,44,983,1733",
		lines: [
			{
				boundingBox: "475,44,256,43",
				words: [
					{ boundingBox: "475,46,125,41", text: "STOFE" },
					{ boundingBox: "629,44,102,38", text: "3186" },
				],
			},
			{
				boundingBox: "294,83,514,46",
				words: [
					{ boundingBox: "294,83,100,42", text: "1899" },
					{ boundingBox: "423,88,126,41", text: "BROCK" },
					{ boundingBox: "577,86,102,41", text: "ROAD" },
					{ boundingBox: "707,85,101,42", text: "UNIT" },
				],
			},
			{
				boundingBox: "422,128,335,43",
				words: [
					{ boundingBox: "422,128,249,43", text: "PICKEFING," },
					{ boundingBox: "708,128,49,42", text: "ON" },
				],
			},
			{
				boundingBox: "500,169,180,45",
				words: [
					{ boundingBox: "500,172,76,42", text: "LIV" },
					{ boundingBox: "604,169,76,43", text: "4H7" },
				],
			},
			{
				boundingBox: "580,214,176,43",
				words: [{ boundingBox: "580,214,176,43", text: "19-9588" }],
			},
			{
				boundingBox: "219,256,853,43",
				words: [
					{ boundingBox: "219,256,125,40", text: "03186" },
					{ boundingBox: "474,258,154,40", text: "009C53" },
					{ boundingBox: "759,258,50,40", text: "53" },
					{ boundingBox: "943,258,129,41", text: "06985" },
				],
			},
			{
				boundingBox: "116,299,641,45",
				words: [
					{ boundingBox: "116,299,50,39", text: "GV" },
					{ boundingBox: "194,300,202,40", text: "24XSOOHL" },
					{ boundingBox: "449,301,308,43", text: "060538887928" },
				],
			},
			{
				boundingBox: "917,302,181,42",
				words: [
					{ boundingBox: "917,302,41,42", text: "$1" },
					{ boundingBox: "977,303,68,41", text: ".57" },
					{ boundingBox: "1074,304,24,40", text: "D" },
				],
			},
			{
				boundingBox: "194,342,562,47",
				words: [
					{ boundingBox: "194,342,204,43", text: "24X500HL" },
					{ boundingBox: "450,344,306,45", text: "060538887928" },
				],
			},
			{
				boundingBox: "917,348,180,41",
				words: [
					{ boundingBox: "917,348,41,41", text: "$1" },
					{ boundingBox: "977,348,68,41", text: ".97" },
					{ boundingBox: "1073,348,24,41", text: "D" },
				],
			},
			{
				boundingBox: "115,384,642,50",
				words: [
					{ boundingBox: "115,384,50,40", text: "GU" },
					{ boundingBox: "194,385,206,45", text: "24X500ML" },
					{ boundingBox: "449,389,308,45", text: "060538887928" },
				],
			},
			{
				boundingBox: "917,393,41,41",
				words: [{ boundingBox: "917,393,41,41", text: "$1" }],
			},
			{
				boundingBox: "195,430,562,45",
				words: [
					{ boundingBox: "195,430,205,43", text: "24XSOOML" },
					{ boundingBox: "428,433,329,42", text: "1060538887928" },
				],
			},
			{
				boundingBox: "917,437,178,41",
				words: [
					{ boundingBox: "917,437,126,40", text: "$1.97" },
					{ boundingBox: "1072,438,23,40", text: "D" },
				],
			},
			{
				boundingBox: "117,471,283,45",
				words: [
					{ boundingBox: "117,471,52,40", text: "GU" },
					{ boundingBox: "197,472,203,44", text: "24X500HL" },
				],
			},
			{
				boundingBox: "896,1178,153,40",
				words: [{ boundingBox: "896,1178,153,40", text: "$48.22" }],
			},
			{
				boundingBox: "923,1740,126,37",
				words: [{ boundingBox: "923,1740,126,37", text: "$0.00" }],
			},
		],
	},
	{
		boundingBox: "120,515,205,171",
		lines: [
			{
				boundingBox: "120,515,151,42",
				words: [{ boundingBox: "120,515,151,42", text: "SPRITE" }],
			},
			{
				boundingBox: "121,559,202,42",
				words: [
					{ boundingBox: "121,559,126,41", text: "HJLTI" },
					{ boundingBox: "276,560,47,41", text: "18" },
				],
			},
			{
				boundingBox: "121,602,153,41",
				words: [{ boundingBox: "121,602,153,41", text: "SPRITE" }],
			},
			{
				boundingBox: "120,643,205,43",
				words: [
					{ boundingBox: "120,643,127,42", text: "MULTI" },
					{ boundingBox: "279,646,46,40", text: "18" },
				],
			},
		],
	},
	{
		boundingBox: "453,523,330,127",
		lines: [
			{
				boundingBox: "657,523,125,41",
				words: [{ boundingBox: "657,523,125,41", text: "0485L" }],
			},
			{
				boundingBox: "453,607,330,43",
				words: [{ boundingBox: "453,607,330,43", text: "0067C0010485L" }],
			},
		],
	},
	{
		boundingBox: "120,688,670,529",
		lines: [
			{
				boundingBox: "198,688,559,46",
				words: [
					{ boundingBox: "198,688,52,40", text: "HN" },
					{ boundingBox: "277,689,49,39", text: "VP" },
					{ boundingBox: "352,690,75,39", text: "283" },
					{ boundingBox: "454,692,303,42", text: "068113154893" },
				],
			},
			{
				boundingBox: "120,729,637,48",
				words: [
					{ boundingBox: "120,729,50,41", text: "OR" },
					{ boundingBox: "198,730,52,42", text: "HN" },
					{ boundingBox: "277,732,50,40", text: "VP" },
					{ boundingBox: "354,733,73,41", text: "283" },
					{ boundingBox: "455,734,302,43", text: "068113154893" },
				],
			},
			{
				boundingBox: "583,779,201,42",
				words: [{ boundingBox: "583,779,201,42", text: "SUBTOTAL" }],
			},
			{
				boundingBox: "481,820,303,42",
				words: [
					{ boundingBox: "481,820,74,40", text: "HST" },
					{ boundingBox: "584,821,200,41", text: "13.0000%" },
				],
			},
			{
				boundingBox: "660,864,125,42",
				words: [{ boundingBox: "660,864,125,42", text: "TOTAL" }],
			},
			{
				boundingBox: "430,950,241,41",
				words: [
					{ boundingBox: "430,950,122,40", text: "MULTI" },
					{ boundingBox: "584,952,87,39", text: "DISI" },
				],
			},
			{
				boundingBox: "124,1032,458,51",
				words: [
					{ boundingBox: "124,1032,248,46", text: "Coke-Pepsi" },
					{ boundingBox: "404,1038,145,45", text: "2for$1" },
					{ boundingBox: "558,1040,24,40", text: "C" },
				],
			},
			{
				boundingBox: "687,1041,101,42",
				words: [{ boundingBox: "687,1041,101,42", text: "018L" }],
			},
			{
				boundingBox: "585,1129,204,44",
				words: [{ boundingBox: "585,1129,204,44", text: "SUBTOTAL" }],
			},
			{
				boundingBox: "689,1173,101,44",
				words: [{ boundingBox: "689,1173,101,44", text: "TEND" }],
			},
		],
	},
	{
		boundingBox: "888,525,214,651",
		lines: [
			{
				boundingBox: "915,525,50,40",
				words: [{ boundingBox: "915,525,50,40", text: "$5" }],
			},
			{
				boundingBox: "914,613,50,38",
				words: [{ boundingBox: "914,613,50,38", text: "$5" }],
			},
			{
				boundingBox: "888,697,68,40",
				words: [{ boundingBox: "888,697,68,40", text: "$11" }],
			},
			{
				boundingBox: "975,698,67,40",
				words: [
					{ boundingBox: "975,727,6,10", text: "c" },
					{ boundingBox: "992,698,50,40", text: "98" },
				],
			},
			{
				boundingBox: "889,740,67,40",
				words: [{ boundingBox: "889,740,67,40", text: "$11" }],
			},
			{
				boundingBox: "993,741,49,41",
				words: [{ boundingBox: "993,741,49,41", text: "98" }],
			},
			{
				boundingBox: "889,783,146,42",
				words: [{ boundingBox: "889,783,146,42", text: "$43.81" }],
			},
			{
				boundingBox: "891,868,153,42",
				words: [
					{ boundingBox: "891,868,75,41", text: "$48" },
					{ boundingBox: "994,869,50,41", text: "22" },
				],
			},
			{
				boundingBox: "921,1046,181,42",
				words: [{ boundingBox: "921,1046,181,42", text: "$0.94—J" }],
			},
			{
				boundingBox: "895,1134,146,42",
				words: [
					{ boundingBox: "895,1134,76,41", text: "$43" },
					{ boundingBox: "1000,1136,41,40", text: "81" },
				],
			},
		],
	},
	{
		boundingBox: "122,1251,850,605",
		lines: [
			{
				boundingBox: "123,1251,849,57",
				words: [
					{ boundingBox: "123,1251,179,43", text: "CAPITAL" },
					{ boundingBox: "329,1253,76,40", text: "ONE" },
					{ boundingBox: "871,1266,101,42", text: "3060" },
				],
			},
			{
				boundingBox: "122,1295,436,45",
				words: [
					{ boundingBox: "122,1295,205,41", text: "APPROVAL" },
					{ boundingBox: "355,1297,24,41", text: "#" },
					{ boundingBox: "407,1297,151,43", text: "02142E" },
				],
			},
			{
				boundingBox: "227,1339,358,46",
				words: [
					{ boundingBox: "227,1339,24,37", text: "#" },
					{ boundingBox: "281,1339,304,46", text: "111400595576" },
				],
			},
			{
				boundingBox: "124,1368,487,60",
				words: [
					{ boundingBox: "124,1368,177,54", text: "PÄYMENT" },
					{ boundingBox: "330,1383,178,42", text: "SERVICE" },
					{ boundingBox: "537,1402,23,9", text: "-" },
					{ boundingBox: "588,1389,23,39", text: "a" },
				],
			},
			{
				boundingBox: "126,1421,75,40",
				words: [{ boundingBox: "126,1421,75,40", text: "RID" }],
			},
			{
				boundingBox: "203,1464,409,50",
				words: [{ boundingBox: "203,1464,409,50", text: "fiCFE943DB8248CCF" }],
			},
			{
				boundingBox: "154,1505,534,57",
				words: [
					{ boundingBox: "154,1505,174,47", text: "ERHINAL" },
					{ boundingBox: "408,1515,280,47", text: "UMTKP012846" },
				],
			},
			{
				boundingBox: "230,1552,458,52",
				words: [
					{ boundingBox: "230,1552,227,46", text: "SIGNATURE" },
					{ boundingBox: "485,1559,203,45", text: "REQUIRED" },
				],
			},
			{
				boundingBox: "331,1643,197,43",
				words: [{ boundingBox: "331,1643,197,43", text: "04/24/21" }],
			},
			{
				boundingBox: "539,1730,253,43",
				words: [
					{ boundingBox: "539,1730,150,41", text: "CHANGE" },
					{ boundingBox: "717,1735,75,38", text: "DUE" },
				],
			},
			{
				boundingBox: "129,1766,629,49",
				words: [
					{ boundingBox: "129,1766,176,44", text: "GST/HST" },
					{ boundingBox: "335,1773,227,42", text: "137466199" },
					{ boundingBox: "589,1770,48,41", text: "RT" },
					{ boundingBox: "666,1774,92,39", text: "0001" },
				],
			},
			{
				boundingBox: "129,1809,553,47",
				words: [
					{ boundingBox: "129,1809,73,41", text: "QST" },
					{ boundingBox: "233,1812,252,44", text: "1016661356" },
					{ boundingBox: "515,1815,48,41", text: "TQ" },
					{ boundingBox: "590,1814,92,42", text: "0001" },
				],
			},
		],
	},
	{
		boundingBox: "1080,1267,13,41",
		lines: [
			{
				boundingBox: "1080,1267,13,41",
				words: [{ boundingBox: "1080,1267,13,41", text: "1" }],
			},
		],
	},
];

const resultLongos = [
	{
		boundingBox: "65,223,949,1180",
		lines: [
			{
				boundingBox: "269,223,744,54",
				words: [
					{ boundingBox: "269,226,157,50", text: "Longos" },
					{ boundingBox: "699,223,314,54", text: "905-209-7655" },
				],
			},
			{
				boundingBox: "267,284,720,56",
				words: [
					{ boundingBox: "267,285,102,44", text: "Your" },
					{ boundingBox: "402,288,131,42", text: "Store" },
					{ boundingBox: "564,286,186,47", text: "Manager" },
					{ boundingBox: "786,284,46,47", text: "is" },
					{ boundingBox: "860,288,75,49", text: "Joe" },
					{ boundingBox: "964,294,23,46", text: "B" },
				],
			},
			{
				boundingBox: "66,345,588,54",
				words: [
					{ boundingBox: "66,349,214,50", text: "#017-004" },
					{ boundingBox: "309,345,264,53", text: "05/19/2021" },
					{ boundingBox: "615,347,39,44", text: "Il" },
				],
			},
			{
				boundingBox: "65,407,805,59",
				words: [
					{ boundingBox: "65,417,104,49", text: "Your" },
					{ boundingBox: "199,410,188,52", text: "Cashier" },
					{ boundingBox: "419,407,133,56", text: "Today" },
					{ boundingBox: "582,419,80,38", text: "was" },
					{ boundingBox: "692,409,178,54", text: "Thevakl" },
				],
			},
			{
				boundingBox: "69,544,401,62",
				words: [
					{ boundingBox: "69,553,103,53", text: "HST#" },
					{ boundingBox: "200,544,270,56", text: "R103382529" },
				],
			},
			{
				boundingBox: "102,689,184,54",
				words: [{ boundingBox: "102,689,184,54", text: "PRODUCE" }],
			},
			{
				boundingBox: "745,748,132,52",
				words: [
					{ boundingBox: "745,748,51,52", text: "$2" },
					{ boundingBox: "809,748,68,47", text: ".99" },
				],
			},
			{
				boundingBox: "77,753,449,56",
				words: [
					{ boundingBox: "77,759,182,50", text: "ORGANIC" },
					{ boundingBox: "288,756,130,50", text: "BASIL" },
					{ boundingBox: "448,753,78,50", text: "20G" },
				],
			},
			{
				boundingBox: "103,825,185,48",
				words: [{ boundingBox: "103,825,185,48", text: "GROCERY" }],
			},
			{
				boundingBox: "744,881,131,54",
				words: [{ boundingBox: "744,881,131,54", text: "$2.99" }],
			},
			{
				boundingBox: "78,886,527,53",
				words: [
					{ boundingBox: "78,891,235,48", text: "ITALPASTA" },
					{ boundingBox: "343,889,129,48", text: "JUMBO" },
					{ boundingBox: "502,886,103,49", text: "SHEL" },
				],
			},
			{
				boundingBox: "743,948,133,53",
				words: [{ boundingBox: "743,948,133,53", text: "$2.99" }],
			},
			{
				boundingBox: "78,953,526,51",
				words: [
					{ boundingBox: "78,956,235,48", text: "ITALPASTA" },
					{ boundingBox: "343,955,129,47", text: "JUMBO" },
					{ boundingBox: "502,953,102,48", text: "SHEL" },
				],
			},
			{
				boundingBox: "879,1081,133,53",
				words: [{ boundingBox: "879,1081,133,53", text: "$8.97" }],
			},
			{
				boundingBox: "79,1084,360,53",
				words: [
					{ boundingBox: "79,1090,128,47", text: "Items" },
					{ boundingBox: "237,1084,202,50", text: "Subtotal" },
				],
			},
			{
				boundingBox: "878,1149,135,52",
				words: [{ boundingBox: "878,1149,135,52", text: "$8.97" }],
			},
			{
				boundingBox: "77,1152,203,50",
				words: [{ boundingBox: "77,1152,203,50", text: "Subtotal" }],
			},
			{
				boundingBox: "877,1216,135,53",
				words: [{ boundingBox: "877,1216,135,53", text: "$8.97" }],
			},
			{
				boundingBox: "76,1218,123,50",
				words: [
					{ boundingBox: "76,1221,102,47", text: "Tota" },
					{ boundingBox: "188,1218,11,48", text: "I" },
				],
			},
			{
				boundingBox: "75,1281,551,57",
				words: [
					{ boundingBox: "75,1287,130,47", text: "TOTAL" },
					{ boundingBox: "240,1284,126,54", text: "[Item" },
					{ boundingBox: "394,1284,129,47", text: "count" },
					{ boundingBox: "580,1281,46,54", text: "3]" },
				],
			},
			{
				boundingBox: "877,1284,137,52",
				words: [{ boundingBox: "877,1284,137,52", text: "$8.97" }],
			},
			{
				boundingBox: "71,1349,265,51",
				words: [
					{ boundingBox: "71,1352,128,48", text: "Debit" },
					{ boundingBox: "232,1349,104,50", text: "card" },
				],
			},
			{
				boundingBox: "877,1350,134,53",
				words: [{ boundingBox: "877,1350,134,53", text: "$8.97" }],
			},
		],
	},
	{
		boundingBox: "66,1482,674,460",
		lines: [
			{
				boundingBox: "69,1482,671,59",
				words: [
					{ boundingBox: "69,1484,186,57", text: "Longo's" },
					{ boundingBox: "284,1482,132,52", text: "Thank" },
					{ boundingBox: "446,1483,78,49", text: "You" },
					{ boundingBox: "553,1482,187,50", text: "Rewards" },
				],
			},
			{
				boundingBox: "150,1552,291,50",
				words: [
					{ boundingBox: "150,1553,75,48", text: "TYC" },
					{ boundingBox: "256,1552,185,50", text: "#316179" },
				],
			},
			{
				boundingBox: "66,1618,476,57",
				words: [
					{ boundingBox: "66,1619,105,51", text: "Week" },
					{ boundingBox: "201,1619,48,49", text: "of" },
					{ boundingBox: "281,1618,261,57", text: "05/17/2021" },
				],
			},
			{
				boundingBox: "69,1683,479,57",
				words: [
					{ boundingBox: "69,1685,101,50", text: "Base" },
					{ boundingBox: "201,1686,158,54", text: "points" },
					{ boundingBox: "390,1683,158,50", text: "earned" },
				],
			},
			{
				boundingBox: "71,1748,504,59",
				words: [
					{ boundingBox: "71,1748,125,55", text: "Bonus" },
					{ boundingBox: "227,1752,159,55", text: "points" },
					{ boundingBox: "416,1748,159,51", text: "earned" },
				],
			},
			{
				boundingBox: "73,1813,283,61",
				words: [
					{ boundingBox: "73,1813,117,54", text: "Total" },
					{ boundingBox: "227,1819,129,55", text: "spent" },
				],
			},
			{
				boundingBox: "76,1874,580,68",
				words: [
					{ boundingBox: "76,1874,117,58", text: "Total" },
					{ boundingBox: "226,1886,160,56", text: "points" },
					{ boundingBox: "416,1881,240,51", text: "available" },
				],
			},
		],
	},
	{
		boundingBox: "980,1746,157,184",
		lines: [
			{
				boundingBox: "1112,1746,24,47",
				words: [{ boundingBox: "1112,1746,24,47", text: "0" }],
			},
			{
				boundingBox: "980,1813,155,55",
				words: [{ boundingBox: "980,1813,155,55", text: "$64.38" }],
			},
			{
				boundingBox: "1060,1879,77,51",
				words: [{ boundingBox: "1060,1879,77,51", text: "975" }],
			},
		],
	},
];
const decodeText = result => {
	const convert = list => {
		const newList = [];
		list.map(section => {
			section.lines.map(line => {
				const coord = [];
				line.boundingBox.split(",").map(num => coord.push(parseInt(num)));
				const item = [];
				line.words.map(word => {
					item.push(word.text);
				});
				newList.push({
					position: coord,
					line: item.join(" "),
				});
			});
		});
		return newList;
	};

	const converted = convert(result);
	const sorted = converted.sort((a, b) => {
		return a.position[1] - b.position[1];
	});
	console.log(sorted);

	//==========================
	const organized = list => {
		const lastItem = list.length - 1;
		const lastItemPositionY = Math.floor(list[lastItem].position[1] / 100);
		const heightY = lastItemPositionY > 15 ? 30 : 50;
		//FINAL ORDERED LIST
		const orderedList = [];

		//Check through all rows in the sorted and assess which are ready to add
		for (let i = 0; i < lastItemPositionY + 1; i++) {
			//list of items with the same Y/row number
			const ithRow = list.filter(item => {
				return Math.floor(item.position[1] / 100) === i;
			});

			//if there is just 1 item then just add it to the orderedList
			if (ithRow.length === 1) {
				orderedList.push(ithRow[0].line);
			} else if (ithRow.length > 1) {
				//index of the item that is the first of line 2
				const indexLine2 = ithRow.findIndex((item, k, ithRow) => {
					if (ithRow[k - 1]) {
						return ithRow[k].position[1] - ithRow[k - 1].position[1] > heightY;
					}
					return false;
				});

				if (indexLine2 + 1 > 0) {
					const line1 = ithRow.slice(0, indexLine2).sort((a, b) => {
						return a.position[0] - b.position[0];
					});
					const line2 = ithRow.slice(indexLine2).sort((a, b) => {
						return a.position[0] - b.position[0];
					});

					orderedList.push(
						line1
							.map(item => {
								return item.line;
							})
							.join("  "),
						line2
							.map(item => {
								return item.line;
							})
							.join("  "),
					);
				} else {
					const line1 = ithRow.sort((a, b) => {
						return a.position[0] - b.position[0];
					});

					orderedList.push(
						line1
							.map(item => {
								return item.line;
							})
							.join("  "),
					);
				}
			}
		}
		return orderedList;
	};
	return organized(sorted);
};

const longosReceiptData = receiptResults => {
	//To get store details ID
	const storeDetailsIndex = receiptResults.findIndex(text => {
		return text.includes("Cashier");
	});

	//store details
	const storeDetails = receiptResults.slice(0, storeDetailsIndex + 1);

	let contact;
	let storeLocation;
	let manager;
	let cashier;
	//=====Store location and contact details:
	if (storeDetails) {
		const locationDetails = storeDetails
			? storeDetails
					.find(line => {
						return line.includes("Longos") && line.includes("-");
					})
					.split(" ")
			: [];

		if (locationDetails.length) {
			const contactIndex = locationDetails.findIndex(word => {
				return word.includes("-");
			});
			contact = locationDetails.splice(contactIndex)[0];
			storeLocation = locationDetails.join(" ");
		} else {
			contact = "No info detected";
			storeLocation = "No info detected";
		}
		//store Manager:
		const lineWithManager =
			storeDetails
				.find(line => {
					return line.includes("Manager");
				})
				.split(" ") || "";
		manager = lineWithManager
			.slice(
				lineWithManager.findIndex(word => {
					return word.includes("is");
				}) + 1,
			)
			.join(" ");

		//Cashier details:
		const cashierLine = storeDetails
			.find(line => {
				return line.includes("Cashier");
			})
			.split(" ");

		const cashierIndex = cashierLine.findIndex(word => {
			return word.includes("was");
		});
		cashier = cashierLine[cashierIndex + 1];
	}

	//To find the index of where List of items starts
	const firstItemsIndex =
		receiptResults.findIndex(line => {
			return line.includes("$");
		}) - 1;
	const lastItemIndex = receiptResults.findIndex(line => {
		return (
			(line.includes("Items") && line.includes("Subtotal")) ||
			(line.includes("$") && line.includes("Items"))
		);
	});
	let itemsList;
	if (firstItemsIndex + 1 > 0 && lastItemIndex + 1 > 0) {
		itemsList = receiptResults.slice(firstItemsIndex, lastItemIndex);
	}

	const testAmount = amount => {
		const digits = amount.split("");
		const numDigits = amount.length;
		const decimalIndex = digits.indexOf(".");
		if (decimalIndex + 1 > 0) {
			if (numDigits - decimalIndex === 3) {
				return digits.join("");
			} else {
				digits.push("0", "0");

				digits.splice(decimalIndex + 3);
				return digits.join("");
			}
		} else {
			digits.splice(numDigits - 2, 0, ".");
			return digits.join("");
		}
	};

	//SUBTOTAL
	let subtotal;
	const subtotalLine = receiptResults
		.find(text => {
			return text.includes("Subtotal");
		})
		.split(" ");

	if (subtotalLine.length > 0) {
		const subtotalStr = subtotalLine.pop();
		subtotal = Number(testAmount(subtotalStr).replace(/[^0-9.-]+/g, ""));
	}

	//TOTAL
	let total;
	const totalLine = receiptResults
		.find(line => {
			return line.includes("TOTAL") || line.includes("Item count");
		})
		.split(" ");
	if (totalLine) {
		const totalStr = totalLine.pop();

		// const totalStr = withTotal[totalIndex];
		total = Number(testAmount(totalStr).replace(/[^0-9.-]+/g, ""));
	}

	const storeData = {
		storeID: storeLocation || "No info detected",
		manager: manager || "No info detected",
		cashier: cashier || "No info detected",
		contact: contact || "No info detected",
		purchases: itemsList || "No info detected",
		subtotal: subtotal || "No info detected",
		total: total || "No info detected",
	};

	return storeData;
};

const walmartReceiptData = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE") || text.includes("STO") || text.includes("ORE");
	});

	const storeID = receiptResults[storeIDindex].split(" ").pop();

	//To get address
	const address = git;
	receiptResults[storeIDindex + 1] +
		" " +
		receiptResults[storeIDindex + 2] +
		" " +
		receiptResults[storeIDindex + 3];

	//To get the number
	const contact = receiptResults[storeIDindex + 4];
	//To index of where List of items starts
	const itemsIndex =
		receiptResults.findIndex(text => {
			return text.includes("-");
		}) > -1
			? receiptResults.findIndex(text => {
					return text.includes("-");
			  }) + 2
			: receiptResults.findIndex(text => {
					return text.includes("$");
			  });

	const testAmount = amount => {
		const digits = amount.split("");
		const numDigits = amount.length;
		const decimalIndex = digits.indexOf(".");
		if (decimalIndex + 1 > 0) {
			if (numDigits - decimalIndex === 3) {
				return digits.join("");
			} else {
				digits.push("0", "0");

				digits.splice(decimalIndex + 3);
				return digits.join("");
			}
		} else {
			digits.splice(numDigits - 2, 0, ".");
			return digits.join("");
		}
	};
	//SUBTOTAL
	const subtotalIndex = receiptResults.findIndex(line => {
		return line.includes("SUBTOTAL") || line.includes("SUB");
	});

	const subtotalStr = receiptResults[subtotalIndex];
	const subtotal = Number(testAmount(subtotalStr.replace(/[^0-9.-]+/g, "")));

	//LIST OF ITEMS PURCHASED
	const purchases = receiptResults.slice(itemsIndex, subtotalIndex);

	//TOTAL
	const withTotal = receiptResults.slice(subtotalIndex + 1);
	const totalIndex = withTotal.findIndex(text => {
		return text.includes("TOTAL") || text.includes("TAL");
	});

	// const totalStr = withTotal[totalIndex];
	const total = Number(
		testAmount(withTotal[totalIndex]).replace(/[^0-9.-]+/g, ""),
	);

	const storeData = {
		storeID: storeID,
		address: address,
		contact: contact,
		purchases: purchases,
		subtotal: subtotal,
		total: total,
	};

	return storeData;
};
// console.log(decodeText(resultWalmart));
// console.log(decodeText(resultLongos));
// console.log(longosReceiptData(decodeText(resultLongos)));
// console.log(walmartReceiptData(decodeText(resultWalmart)));
