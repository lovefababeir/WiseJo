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
		updateList: true,
	});

	const { createToken } = useAuth();
	useEffect(() => {
		if (values.updateList === true) {
			createToken().then(token => {
				axios
					.get(`${process.env.REACT_APP_BASE_URL}itemSearch/searchresults`, token)
					.then(result => {
						const lastSearchResults = result.data.data.map(record => {
							return record.searchResults;
						});
						setValues({
							...values,
							selected: "",
							results: [].concat.apply([], lastSearchResults),
							currentLocation: result.data.data[0].userlocation,
							updateList: false,
						});
					})
					.catch(error => {
						console.log(`error: ${error}`);
					})
					.catch(err => {
						console.log("Could not create token");
					});
			});
		}
	}, [values, createToken]);

	const changePageHandler = page => {
		setValues({ ...values, view: page });
	};

	const changeSelected = category => {
		setValues({ ...values, selected: category });
	};
	return (
		<>
			<div
				className={`results__container ${"results__container--" + values.view}`}
			>
				<h1 className="results__title ">SHOP & COMPARE</h1>
				<ResultsSubMenu view={values.view} changePageHandler={changePageHandler} />
				<div className="results__view">
					{values.view === "All" && (
						<ResultsAll list={values.results} values={values} setValues={setValues} />
					)}
					{values.view === "Capacity" && (
						<ResultsCapacity
							list={values.results}
							changeSelected={changeSelected}
							selected={values.selected}
							values={values}
							setValues={setValues}
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
