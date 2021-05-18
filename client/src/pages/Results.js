import React, { useEffect, useState } from "react";
import "./Results.scss";
import ResultsAll from "../components/ResultsAll";
import ResultsCapacity from "../components/ResultsCapacity";
import ResultsSolutions from "../components/ResultsSolutions";
import axios from "axios";
import ResultsSubMenu from "../components/ResultsSubMenu";

const Results = () => {
	const [values, setValues] = useState({
		results: [],
		view: "All",
		selected: "",
		currentLocation: "Walmart",
		show: false,
	});

	useEffect(() => {
		let mounted = true;
		axios
			.get("http://localhost:5000/itemSearch/history")
			.then(result => {
				if (mounted) {
					const lastIndex = result.data.length - 1;
					const lastSearch = result.data.filter(item => {
						return item.time === result.data[lastIndex].time;
					});
					const lastSearchResults = lastSearch.map(record => {
						return record.searchResults;
					});
					setValues({
						...values,
						results: [].concat.apply([], lastSearchResults),
						currentLocation: result.data[lastIndex].currentlocation,
					});
				}
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		return () => {
			mounted = false;
		};
	}, []);

	const changePageHandler = page => {
		setValues({ ...values, view: page });
	};
	const deleteHandler = (del, detail1, detail2) => {
		const url = "http://localhost:5000/itemSearch/";
		//detail1 = item id for when del = "item"
		if (del === "item") {
			axios
				.delete(url + del + "/" + detail1)
				.then(res => {
					const updatedResults = res.data.map(record => {
						return record.searchResults;
					});
					setValues({
						...values,
						results: [].concat.apply([], updatedResults),
						selected: "",
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			//for this case del="items" so detail1 = capacity detail2 = quantity
			axios
				.delete(url + del + "/" + detail1 + "/" + detail2)
				.then(res => {
					const updatedResults = res.data.map(record => {
						return record.searchResults;
					});
					setValues({
						...values,
						results: [].concat.apply([], updatedResults),
						selected: "",
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};
	const changeSelected = category => {
		setValues({ ...values, selected: category });
	};

	console.log(values);
	return (
		<>
			<div
				className={`results__container ${"results__container--" + values.view}`}
			>
				<h1 className="results__title ">SHOP & COMPARE</h1>
				<ResultsSubMenu view={values.view} changePageHandler={changePageHandler} />
				<div className="results__view">
					{values.view === "All" && (
						<ResultsAll list={values.results} deleteHandler={deleteHandler} />
					)}
					{values.view === "Capacity" && (
						<ResultsCapacity
							list={values.results}
							deleteHandler={deleteHandler}
							changeSelected={changeSelected}
							selected={values.selected}
						/>
					)}
					{values.view === "Solutions" && (
						<ResultsSolutions
							list={values.results}
							currentLocation={values.currentLocation}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Results;
