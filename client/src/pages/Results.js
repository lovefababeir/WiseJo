import React, { useEffect, useState } from "react";
import "./Results.scss";
import ResultsAll from "../components/ResultsAll";
import ResultsCapacity from "../components/ResultsCapacity";
import ResultsSolutions from "../components/ResultsSolutions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ResultsSubMenu from "../components/ResultsSubMenu";
import { useAuth } from "../contexts/AuthContext";

const Results = () => {
	const [values, setValues] = useState({
		results: [],
		view: "All",
		selected: "",
		currentLocation: "",
		updateList: true,
		errorMessageAll: "",
		errorMessageCapacity: "",
		errorLoadResults: "",
	});
	const history = useHistory();
	const { createToken, logout } = useAuth();
	useEffect(() => {
		if (values.updateList === true) {
			createToken()
				.then(token => {
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
							setValues({
								...values,
								errorMessageAll:
									"Error: WiseJo was unable to retrieve your results. Please make sure your have a strong internet connection and try again.",
							});
						});
				})
				.catch(err => {
					setValues({
						...values,
						errorMessageAll:
							"Error: Unable to create access token for the database. Try again later",
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

	const signoutHandler = async e => {
		e.preventDefault();
		try {
			await logout();
			history.push("/login");
		} catch {
			setValues({
				...values,
				errorMessageAll: "Error: Failed to sign out.",
			});
		}
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
					<button className="signoutBtn" onClick={signoutHandler}>
						Sign Out
					</button>
				</div>
			</div>
		</>
	);
};

export default Results;
