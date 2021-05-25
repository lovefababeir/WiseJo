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

		const heightY = 25;

		//FINAL ORDERED LIST
		const orderedList = [];
		while (list.length > 0) {
			let newLine;
			let indexNextLine;
			if (list.length === 1) {
				newLine = list.shift();
				orderedList.push(newLine.line);
			} else {
				indexNextLine = list.findIndex((item, k, list) => {
					if (list[k - 1]) {
						return list[k].position[1] - list[k - 1].position[1] >= heightY;
					} else {
						return false;
					}
				});
				if (indexNextLine + 1 > 0) {
					const nextLine = list.splice(0, indexNextLine).sort((a, b) => {
						return a.position[0] - b.position[0];
					});
					orderedList.push(
						nextLine
							.map(item => {
								return item.line;
							})
							.join("  "),
					);
				} else {
					const nextLine = list.splice(0, list.length).sort((a, b) => {
						return a.position[0] - b.position[0];
					});
					orderedList.push(
						nextLine
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
