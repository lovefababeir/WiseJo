const receiptResults = [
	"STORE 1080",
	"5995 STEELES AVENUE ERST",
	"SCRRBOROUGH, ON",
	"HIV 5P7",
	"416-298-1210",
	"01080 002593 25 09219",
	"BPH GRMT VP 005580013275  $14.78 J",
	"BPM CHPD VP 005580024358  $14,78 J",
	"BPM CHOP VP 005580023579  $14.78 J",
	"MURINEERRDRO 067811273625  $6.97 J",
	"SUBTOTAL  $51 .31",
	"HST 13b 0000%  $6.67",
	"TOTAL  $57.98",
	"DEBIT TEND  $57 98",
	"CHANGE DUE",
];

const receipt = receiptResults => {
	//To get store ID
	const storeIDindex = receiptResults.findIndex(text => {
		return text.includes("STORE");
	});
	const storeID = receiptResults[storeIDindex].split(" ")[1];

	//To get address
	const address =
		receiptResults[storeIDindex + 1] +
		" " +
		receiptResults[storeIDindex + 2] +
		" " +
		receiptResults[storeIDindex + 3];

	//To get the number
	const contact = receiptResults[storeIDindex + 4];
	//To index of where List of items starts
	const afterAddress = receiptResults.slice(storeIDindex + 4);
	const itemsIndex =
		afterAddress.findIndex(text => {
			return text.includes("-");
		}) > -1
			? afterAddress.findIndex(text => {
					return text.includes("-");
			  }) + 2
			: afterAddress.findIndex(text => {
					return text.includes("$");
			  });

	//SUBTOTAL
	const subtotalIndex = afterAddress.findIndex(text => {
		return text.includes("SUBTOTAL") || text.includes("SUB");
	});

	const subtotalStr = afterAddress[subtotalIndex];
	const subtotal = Number(subtotalStr.replace(/[^0-9.-]+/g, ""));

	//LIST OF ITEMS PURCHASED
	const purchases = afterAddress.slice(itemsIndex, subtotalIndex);
	// console.log(purchases);
	//TOTAL
	const withTotal = afterAddress.slice(subtotalIndex + 1);
	const totalIndex = withTotal.findIndex(text => {
		return text.includes("TOTAL") || text.includes("TAL");
	});

	// const totalStr = withTotal[totalIndex];
	const total = Number(withTotal[totalIndex].replace(/[^0-9.-]+/g, ""));

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

// console.log(receipt(receiptResults));

//======================================
const result = [
	{
		boundingBox: "104,816,1865,1163",
		lines: [
			{
				boundingBox: "106,816,1794,121",
				words: [
					{ boundingBox: "106,817,204,113", text: "BPH" },
					{ boundingBox: "391,816,280,114", text: "GRMT" },
					{ boundingBox: "755,818,135,114", text: "VP" },
					{ boundingBox: "1046,821,854,116", text: "005580013275" },
				],
			},
			{
				boundingBox: "106,947,1793,118",
				words: [
					{ boundingBox: "106,948,203,111", text: "BPM" },
					{ boundingBox: "390,947,282,112", text: "CHPD" },
					{ boundingBox: "755,950,136,110", text: "VP" },
					{ boundingBox: "1046,951,853,114", text: "005580024358" },
				],
			},
			{
				boundingBox: "105,1078,1792,115",
				words: [
					{ boundingBox: "105,1078,204,108", text: "BPM" },
					{ boundingBox: "389,1079,282,108", text: "CHOP" },
					{ boundingBox: "755,1080,135,109", text: "VP" },
					{ boundingBox: "1045,1081,852,112", text: "005580023579" },
				],
			},
			{
				boundingBox: "104,1206,1792,116",
				words: [
					{ boundingBox: "104,1206,858,116", text: "MURINEERRDRO" },
					{ boundingBox: "1044,1209,852,113", text: "067811273625" },
				],
			},
			{
				boundingBox: "1403,1341,564,114",
				words: [{ boundingBox: "1403,1341,564,114", text: "SUBTOTAL" }],
			},
			{
				boundingBox: "1113,1470,855,113",
				words: [
					{ boundingBox: "1113,1470,207,113", text: "HST" },
					{ boundingBox: "1408,1471,178,112", text: "13b" },
					{ boundingBox: "1618,1472,350,111", text: "0000%" },
				],
			},
			{
				boundingBox: "1617,1601,352,114",
				words: [{ boundingBox: "1617,1601,352,114", text: "TOTAL" }],
			},
			{
				boundingBox: "1184,1729,784,119",
				words: [
					{ boundingBox: "1184,1729,350,114", text: "DEBIT" },
					{ boundingBox: "1689,1731,279,117", text: "TEND" },
				],
			},
			{
				boundingBox: "1255,1862,713,117",
				words: [
					{ boundingBox: "1255,1862,424,116", text: "CHANGE" },
					{ boundingBox: "1761,1864,207,115", text: "DUE" },
				],
			},
		],
	},
	{
		boundingBox: "391,37,2456,1555",
		lines: [
			{
				boundingBox: "1120,37,715,107",
				words: [
					{ boundingBox: "1120,37,352,107", text: "STORE" },
					{ boundingBox: "1560,37,275,106", text: "1080" },
				],
			},
			{
				boundingBox: "618,164,1726,116",
				words: [
					{ boundingBox: "618,169,275,108", text: "5995" },
					{ boundingBox: "974,165,497,110", text: "STEELES" },
					{ boundingBox: "1553,164,428,113", text: "AVENUE" },
					{ boundingBox: "2063,167,281,113", text: "ERST" },
				],
			},
			{
				boundingBox: "901,296,1079,114",
				words: [
					{ boundingBox: "901,296,837,114", text: "SCRRBOROUGH," },
					{ boundingBox: "1843,296,137,112", text: "ON" },
				],
			},
			{
				boundingBox: "1190,425,497,117",
				words: [
					{ boundingBox: "1190,425,208,117", text: "HIV" },
					{ boundingBox: "1479,426,208,115", text: "5P7" },
				],
			},
			{
				boundingBox: "1046,559,857,116",
				words: [{ boundingBox: "1046,559,857,116", text: "416-298-1210" }],
			},
			{
				boundingBox: "391,686,2383,121",
				words: [
					{ boundingBox: "391,686,353,111", text: "01080" },
					{ boundingBox: "1118,690,422,114", text: "002593" },
					{ boundingBox: "1911,691,137,113", text: "25" },
					{ boundingBox: "2424,693,350,114", text: "09219" },
				],
			},
			{
				boundingBox: "2276,823,571,116",
				words: [
					{ boundingBox: "2276,823,427,116", text: "$14.78" },
					{ boundingBox: "2784,828,63,108", text: "J" },
				],
			},
			{
				boundingBox: "2275,956,571,113",
				words: [
					{ boundingBox: "2275,956,427,113", text: "$14,78" },
					{ boundingBox: "2784,958,62,109", text: "J" },
				],
			},
			{
				boundingBox: "2274,1087,572,113",
				words: [
					{ boundingBox: "2274,1087,425,113", text: "$14.78" },
					{ boundingBox: "2783,1088,63,109", text: "J" },
				],
			},
			{
				boundingBox: "2345,1479,356,113",
				words: [{ boundingBox: "2345,1479,356,113", text: "$6.67" }],
			},
		],
	},
	{
		boundingBox: "2271,1217,575,639",
		lines: [
			{
				boundingBox: "2347,1217,499,114",
				words: [
					{ boundingBox: "2347,1217,355,114", text: "$6.97" },
					{ boundingBox: "2784,1218,62,110", text: "J" },
				],
			},
			{
				boundingBox: "2272,1349,407,115",
				words: [
					{ boundingBox: "2272,1349,189,115", text: "$51" },
					{ boundingBox: "2515,1351,164,111", text: ".31" },
				],
			},
			{
				boundingBox: "2272,1610,425,113",
				words: [{ boundingBox: "2272,1610,425,113", text: "$57.98" }],
			},
			{
				boundingBox: "2271,1739,425,117",
				words: [
					{ boundingBox: "2271,1739,211,117", text: "$57" },
					{ boundingBox: "2563,1742,133,112", text: "98" },
				],
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

	//==========================
	const organized = list => {
		const lastItem = list.length - 1;
		const lastItemPositionY = Math.floor(list[lastItem].position[1] / 100);

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
						return ithRow[k].position[1] - ithRow[k - 1].position[1] > 50;
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

decodeText(resultLongos);
