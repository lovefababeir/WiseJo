import React, { useEffect, useState } from "react";
import "./Results.scss";
import ResultsAll from "../components/ResultsAll";
import ResultsCapacity from "../components/ResultsCapacity";
import ResultsSolutions from "../components/ResultsSolutions";
import scale from "../assets/images/scale.svg";
import store from "../assets/images/store.svg";
import sun from "../assets/images/WiseJo.png";
import axios from "axios";
// import { Spring } from "react-spring";

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

	return (
		<>
			{/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
				{props => (
					<div style={props}> */}
			<div
				className={`results__container ${"results__container--" + values.view}`}
			>
				<h1 className="results__title ">SHOP & COMPARE</h1>
				<nav className="results__nav">
					<ul className="results__menu">
						<li
							className={`${
								values.view === "All"
									? "results__menu-item--selected"
									: "results__menu-item"
							}`}
							onClick={() => changePageHandler("All")}
						>
							<img src={store} className="results__store" alt="view by store"></img>
						</li>
						<li
							className={`${
								values.view === "Capacity"
									? "results__menu-item--selected"
									: "results__menu-item"
							}`}
							onClick={() => changePageHandler("Capacity")}
						>
							<img src={scale} className="results__store" alt="view by capacity"></img>
						</li>
						<li
							className={`${
								values.view === "Solutions"
									? "results__menu-item--selected"
									: "results__menu-item"
							}`}
							onClick={() => changePageHandler("Solutions")}
						>
							<img
								src={sun}
								className="results__store"
								alt="view WiseJo's advice"
							></img>
						</li>
					</ul>
				</nav>
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
			{/* </div>
				)}
			</Spring> */}
		</>
	);
};

export default Results;
