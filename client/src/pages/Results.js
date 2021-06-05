import React, { useEffect, useState } from "react";
import "./Results.scss";
import ResultsAll from "../components/ResultsAll";
import ResultsCapacity from "../components/ResultsCapacity";
import ResultsSolutions from "../components/ResultsSolutions";
import axios from "axios";
import ResultsSubMenu from "../components/ResultsSubMenu";
import { useAuth } from "../contexts/AuthContext";

const Results = () => {
	const [values, setValues] = useState({
		results: [],
		view: "All",
		selected: "",
		currentLocation: "",
	});
	const { createToken } = useAuth();
	useEffect(() => {
		let mounted = true;
		createToken().then(token => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}itemSearch/searchresults`, token)
				.then(result => {
					console.log(result);
					if (mounted) {
						const lastSearchResults = result.data.data.map(record => {
							return record.searchResults;
						});
						setValues({
							...values,
							results: [].concat.apply([], lastSearchResults),
							currentLocation: result.data.data[0].userlocation,
						});
					}
				})
				.catch(error => {
					console.log(`error: ${error}`);
				})
				.catch(err => {
					console.log("Could not create token");
				});
		});
		return () => {
			mounted = false;
		};
	}, []);

	const changePageHandler = page => {
		setValues({ ...values, view: page });
	};
	const deleteHandler = (del, detail1, detail2) => {
		const url = `${process.env.REACT_APP_BASE_URL}itemSearch/`;
		//detail1 = item id for when del = "item"
		if (del === "item") {
			axios
				.patch(url + del + "/" + detail1 + "/" + detail2)
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
				.patch(url + del + "/" + detail1 + "/" + detail2)
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
