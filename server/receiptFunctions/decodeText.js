const decodeText1 = result => {
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
		const decodeText1 = result => {
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

		const decodeText2 = result => {
			// const spaceWidth = store==="no frills"?
			const lineList = [].concat.apply(
				[],
				result.map(bb => {
					return bb.lines;
				}),
			);

			const sortLineList = lineList.sort((lineA, lineB) => {
				const Ay = parseInt(lineA.boundingBox.split(",")[1]);
				const By = parseInt(lineB.boundingBox.split(",")[1]);

				return Ay - By;
			});

			const newLineList = [];
			const newLine = [];
			let yPosNewLine;
			let heightNewLine;
			let line;
			let yPosLine;

			for (let i = 0; i < sortLineList.length; i++) {
				line = sortLineList[i];
				yPosLine = parseInt(line.boundingBox.split(",")[1]);

				if (newLine.length === 0) {
					yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
					heightNewLine = parseInt(line.boundingBox.split(",")[3]);
					newLine.push(line.words);
				} else if (yPosNewLine + heightNewLine - 5 > yPosLine) {
					newLine.push(line.words);
				} else {
					const addNewLine = newLine.splice(0, newLine.length);
					newLineList.push([].concat.apply([], addNewLine));
					newLine.push(line.words);
					yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
					heightNewLine = parseInt(line.boundingBox.split(",")[3]);
				}
			}
			// console.log(newLineList);
			const finalList = newLineList.map(words => {
				const wordsSorted = words.sort((A, B) => {
					const AposX = parseInt(A.boundingBox.split(",")[0]);
					const BposX = parseInt(B.boundingBox.split(",")[0]);
					return AposX - BposX;
				});

				let wordA;
				let wordAposX;
				let wordAposW;
				let wordBposX;
				const line = [];

				let numOfSpaces;
				for (let j = 0; j < wordsSorted.length; j++) {
					wordA = wordsSorted[j];
					wordB = wordsSorted[j + 1];

					wordAposX = parseInt(wordA.boundingBox.split(",")[0]);
					wordAposW = parseInt(wordA.boundingBox.split(",")[2]);
					if (wordB) {
						wordBposX = parseInt(wordB.boundingBox.split(",")[0]);
						numOfSpaces = Math.floor((wordBposX - (wordAposX + wordAposW)) / 21);
						item = [wordA.text];
						if (numOfSpaces) {
							item[numOfSpaces] = " ";
							item.fill(" ", 1, numOfSpaces + 1);
						}
						line.push(item.join(""));
					} else {
						line.push(wordA.text);
					}
				}
				return line.join("");
			});
			return finalList;
		};

		module.exports = { decodeText1, decodeText2 };

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
		const decodeText1 = result => {
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

		const decodeText2 = result => {
			// const spaceWidth = store==="no frills"?
			const lineList = [].concat.apply(
				[],
				result.map(bb => {
					return bb.lines;
				}),
			);

			const sortLineList = lineList.sort((lineA, lineB) => {
				const Ay = parseInt(lineA.boundingBox.split(",")[1]);
				const By = parseInt(lineB.boundingBox.split(",")[1]);

				return Ay - By;
			});

			const newLineList = [];
			const newLine = [];
			let yPosNewLine;
			let heightNewLine;
			let line;
			let yPosLine;

			for (let i = 0; i < sortLineList.length; i++) {
				line = sortLineList[i];
				yPosLine = parseInt(line.boundingBox.split(",")[1]);

				if (newLine.length === 0) {
					yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
					heightNewLine = parseInt(line.boundingBox.split(",")[3]);
					newLine.push(line.words);
				} else if (yPosNewLine + heightNewLine - 5 > yPosLine) {
					newLine.push(line.words);
				} else {
					const addNewLine = newLine.splice(0, newLine.length);
					newLineList.push([].concat.apply([], addNewLine));
					newLine.push(line.words);
					yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
					heightNewLine = parseInt(line.boundingBox.split(",")[3]);
				}
			}
			// console.log(newLineList);
			const finalList = newLineList.map(words => {
				const wordsSorted = words.sort((A, B) => {
					const AposX = parseInt(A.boundingBox.split(",")[0]);
					const BposX = parseInt(B.boundingBox.split(",")[0]);
					return AposX - BposX;
				});

				let wordA;
				let wordAposX;
				let wordAposW;
				let wordBposX;
				const line = [];

				let numOfSpaces;
				for (let j = 0; j < wordsSorted.length; j++) {
					wordA = wordsSorted[j];
					wordB = wordsSorted[j + 1];

					wordAposX = parseInt(wordA.boundingBox.split(",")[0]);
					wordAposW = parseInt(wordA.boundingBox.split(",")[2]);
					if (wordB) {
						wordBposX = parseInt(wordB.boundingBox.split(",")[0]);
						numOfSpaces = Math.floor((wordBposX - (wordAposX + wordAposW)) / 21);
						item = [wordA.text];
						if (numOfSpaces) {
							item[numOfSpaces] = " ";
							item.fill(" ", 1, numOfSpaces + 1);
						}
						line.push(item.join(""));
					} else {
						line.push(wordA.text);
					}
				}
				return line.join("");
			});
			return finalList;
		};

		module.exports = { decodeText1, decodeText2 };

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

const decodeText2 = result => {
	// const spaceWidth = store==="no frills"?
	const lineList = [].concat.apply(
		[],
		result.map(bb => {
			return bb.lines;
		}),
	);

	const sortLineList = lineList.sort((lineA, lineB) => {
		const Ay = parseInt(lineA.boundingBox.split(",")[1]);
		const By = parseInt(lineB.boundingBox.split(",")[1]);

		return Ay - By;
	});

	const newLineList = [];
	const newLine = [];
	let yPosNewLine;
	let heightNewLine;
	let line;
	let yPosLine;

	for (let i = 0; i < sortLineList.length; i++) {
		line = sortLineList[i];
		yPosLine = parseInt(line.boundingBox.split(",")[1]);

		if (newLine.length === 0) {
			yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
			heightNewLine = parseInt(line.boundingBox.split(",")[3]);
			newLine.push(line.words);
		} else if (yPosNewLine + heightNewLine - 5 > yPosLine) {
			newLine.push(line.words);
		} else {
			const addNewLine = newLine.splice(0, newLine.length);
			newLineList.push([].concat.apply([], addNewLine));
			newLine.push(line.words);
			yPosNewLine = parseInt(line.boundingBox.split(",")[1]);
			heightNewLine = parseInt(line.boundingBox.split(",")[3]);
		}
	}
	// console.log(newLineList);
	const finalList = newLineList.map(words => {
		const wordsSorted = words.sort((A, B) => {
			const AposX = parseInt(A.boundingBox.split(",")[0]);
			const BposX = parseInt(B.boundingBox.split(",")[0]);
			return AposX - BposX;
		});

		let wordA;
		let wordAposX;
		let wordAposW;
		let wordBposX;
		const line = [];

		let numOfSpaces;
		for (let j = 0; j < wordsSorted.length; j++) {
			wordA = wordsSorted[j];
			wordB = wordsSorted[j + 1];

			wordAposX = parseInt(wordA.boundingBox.split(",")[0]);
			wordAposW = parseInt(wordA.boundingBox.split(",")[2]);
			if (wordB) {
				wordBposX = parseInt(wordB.boundingBox.split(",")[0]);
				numOfSpaces = Math.floor((wordBposX - (wordAposX + wordAposW)) / 21);
				item = [wordA.text];
				if (numOfSpaces) {
					item[numOfSpaces] = " ";
					item.fill(" ", 1, numOfSpaces + 1);
				}
				line.push(item.join(""));
			} else {
				line.push(wordA.text);
			}
		}
		return line.join("");
	});
	return finalList;
};

module.exports = { decodeText1, decodeText2 };
