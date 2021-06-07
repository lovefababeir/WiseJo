import React, { useState, useEffect } from "react";
import "./Search.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { useAuth } from "../contexts/AuthContext";

const Search = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(0);
	const { createToken } = useAuth();

	useEffect(() => {
		console.log(loaded);
		let mounted = true;
		if (loaded === 4 && mounted) {
			console.log("DONEEEEEE");
			history.push("/compare");
			setLoading(false);
			setLoaded(0);
		} else {
			console.log("load:", loaded);
		}
		return () => (mounted = false);
	}, [loaded, history]);

	const submitHandler = e => {
		e.preventDefault();
		const item = e.target.search.value.toLowerCase();
		const currentStore = e.target.storeList.value.toLowerCase();
		const time = Date.now() - 3600000 * 4;

		//Cancel search if there is not item
		if (!item) {
			return;
		}
		setLoading(true);
		createToken()
			.then(token => {
				axios
					.get(
						`${process.env.REACT_APP_BASE_URL}itemSearch/walmart/${time}?userlocation=${currentStore}&item=${item}`,
						token,
					)
					.then(result => {
						if (result) {
							setLoaded(loaded => loaded + 1);
						}
					})
					.catch(err => {
						console.log(err);
						if (err) {
							setLoaded(loaded => loaded + 1);
						}
					});

				axios
					.get(
						`${process.env.REACT_APP_BASE_URL}itemSearch/sobeys/${time}?userlocation=${currentStore}&item=${item}`,
						token,
					)
					.then(result => {
						if (result) {
							setLoaded(loaded => loaded + 1);
						}
					})
					.catch(err => {
						console.log(err);
						if (err) {
							setLoaded(loaded => loaded + 1);
						}
					});

				axios
					.get(
						`${process.env.REACT_APP_BASE_URL}itemSearch/nofrills/${time}?userlocation=${currentStore}&item=${item}`,
						token,
					)
					.then(result => {
						if (result) {
							setLoaded(loaded => loaded + 1);
						}
					})
					.catch(err => {
						console.log(err);
						if (err) {
							setLoaded(loaded => loaded + 1);
						}
					});

				axios
					.get(
						`${process.env.REACT_APP_BASE_URL}itemSearch/longos/${time}?userlocation=${currentStore}&item=${item}`,
						token,
					)
					.then(result => {
						if (result) {
							setLoaded(loaded => loaded + 1);
						}
					})
					.catch(err => {
						console.log(err);
						if (err) {
							setLoaded(loaded => loaded + 1);
						}
					});
			})
			.catch(err => {
				console.log("Could not create access token");
			});
	};

	return (
		<>
			<SearchForm submitHandler={submitHandler} loading={loading} />
		</>
	);
};

export default Search;
