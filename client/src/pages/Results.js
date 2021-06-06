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

	const deleteHandler = (del, detail1, detail2) => {
		const url = `${process.env.REACT_APP_BASE_URL}itemSearch/`;
		//detail1 = item id for when del = "item"
		if (del === "item") {
			createToken()
				.then(token => {
					axios
						.delete(url + del + "/" + detail1 + "/" + detail2, token)
						.then(() => {
							setValues({ ...values, updateList: true });
						})
						.catch(function (error) {
							console.log(error);
						});
				})
				.catch(err => console.log("Not authorized to delete", err));
		} else {
			//for this case del="items" so detail1 = capacity detail2 = quantity
			createToken()
				.then(token => {
					axios
						.delete(url + del + "/" + detail1 + "/" + detail2, token)
						.then(() => {
							setValues({ ...values, updateList: true });
						})
						.catch(function (error) {
							console.log(error);
						});
				})
				.catch(err => console.log("Not authorized to delete", err));
		}
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
