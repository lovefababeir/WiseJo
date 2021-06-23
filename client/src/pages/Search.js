import React, { useState, useEffect } from "react";
import "./Search.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import FormAlert from "../components/FormAlert";

const Search = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(0);
	const { createToken } = useAuth();

	useEffect(() => {
		let mounted = true;
		if (loaded === 6 && mounted) {
			history.push("/compare");
			setLoading(false);
			setLoaded(0);
		}
		return () => (mounted = false);
	}, [loaded, history]);

	const submitHandler = e => {
		e.preventDefault();
		const item = e.target.search.value.toLowerCase();
		const currentStore = e.target.storeList.value.toLowerCase();
		const time = Date.now();

		//Cancel search if there is not item
		if (!item) {
			return;
		}
		setLoading(true);
		createToken()
			.then(async token => {
				return axios
					.get(
						`${process.env.REACT_APP_BASE_URL}items/initaterecord/${time}?userlocation=${currentStore}&item=${item}`,
						token,
					)
					.then(() => {
						return token;
					})
					.catch(err => {
						console.log(err);
						return 0;
					});
			})
			.then(ready => {
				if (!ready) {
					console.log(`need error message`, ready);
					return;
				} else {
					const token = ready;
					//LONGOS
					axios
						.get(
							`${process.env.REACT_APP_BASE_URL}items/longos/${time}?item=${item}`,
							token,
						)
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							//SOBEYS
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/sobeys/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/loblaws/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							//SUPERSTORE
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/superstore/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							//NO FRILLS
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/nofrills/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							//WALMART
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/walmart/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							console.log(result);
						})
						.catch(err => {
							console.log(err);
						})
						.finally(() => {
							setLoaded(loaded => loaded + 1);
						});
				}
			})
			.catch(err => {
				console.log("Could not create access token");
			});
	};

	console.log(loaded);
	return (
		<>
			<h1 className="form__title">SHOP & COMPARE</h1>
			{!loading && <SearchForm submitHandler={submitHandler} loading={loading} />}

			{loading && (
				<div className="form__afterSubmit">
					<FormAlert page="shop" />
					<LoadingSpinner />
				</div>
			)}
		</>
	);
};

export default Search;
