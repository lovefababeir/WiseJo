const decodeText = result => {
	const converted = [];

	const conversion = list => {
		list.map(section => {
			section.lines.map(line => {
				const coord = [];
				line.boundingBox.split(",").map(num => coord.push(parseInt(num)));
				const item = [];
				line.words.map(word => {
					item.push(word.text);
				});
				converted.push({
					position: coord,
					line: item.join(" "),
				});
			});
		});
	};
	conversion(result);

	const sorted = converted.sort((a, b) => {
		return a.position[1] - b.position[1];
	});

	const combined = list => {
		const lastItem = list.length - 1;
		const lastItemPositionY = Math.floor(list[lastItem].position[1] / 100);
		const newList = [];
		for (let i = 0; i < lastItemPositionY + 1; i++) {
			const newLine = list.filter(item => {
				return Math.floor(item.position[1] / 100) === i;
			});
			if (newLine.length) {
				newList.push(
					newLine
						.map(line => {
							return line.line;
						})
						.join("  "),
				);
			}
		}
		return newList;
	};

	return combined(sorted);
};
