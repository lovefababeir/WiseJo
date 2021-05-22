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

module.exports = { decodeText };
