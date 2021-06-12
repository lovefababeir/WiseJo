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
		errorMessageAll: "",
		errorMessageCapacity: "",
		errorLoadResults: "",
		searchWord: "",
	});
	const history = useHistory();
	const { createToken, logout } = useAuth();

	useEffect(() => {
		createToken()
			.then(token => {
				axios
					.get(`${process.env.REACT_APP_BASE_URL}itemSearch/searchresults`, token)
					.then(result => {
						const lastSearchResults = result.data.data.map(record => {
							return record.searchResults;
						});
						setValues({
							results: [].concat.apply([], lastSearchResults),
							view: "All",
							selected: "",
							currentLocation: result.data.data[0].userlocation,
							errorMessageAll: "",
							errorMessageCapacity: "",
							errorLoadResults: "",
							searchWord: result.data.data[0].searchItem,
						});
					})
					.catch(error => {
						setValues({
							results: "",
							view: "All",
							selected: "",
							currentLocation: "",
							errorMessageAll:
								"Error: WiseJo was unable to retrieve your results. Please make sure your have a strong internet connection and try again.",
							errorMessageCapacity: "",
							errorLoadResults: "",
							searchWord: "",
						});
					});
			})
			.catch(err => {
				setValues({
					results: "",
					view: "All",
					selected: "",
					currentLocation: "",
					errorMessageAll:
						"Error: Unable to create access token for the database. Try again later",
					errorMessageCapacity: "",
					errorLoadResults: "",
					searchWord: "",
				});
			});
	}, [createToken]);

	const updateList = () => {
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
							results: [].concat.apply([], lastSearchResults),
							currentLocation: result.data.data[0].userlocation,
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
	};

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
						<ResultsAll
							list={values.results}
							values={values}
							setValues={setValues}
							updateList={updateList}
						/>
					)}
					{values.view === "Capacity" && (
						<ResultsCapacity
							list={values.results}
							changeSelected={changeSelected}
							selected={values.selected}
							values={values}
							setValues={setValues}
							updateList={updateList}
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
