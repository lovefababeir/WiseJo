import React, { useState, useEffect } from "react";
import "./Search.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";

const Search = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(0);

	const submitHandler = e => {
		e.preventDefault();

		const item = e.target.search.value;
		const currentStore = e.target.storeList.value.toLowerCase();
		const time = Date.now();
		if (item) {
			setLoading(true);

			axios
				.get(
					`${process.env.REACT_APP_BASE_URL}itemSearch/walmart/${item}/${time}?currentlocation=${currentStore}`,
				)
				.then(result => {
					console.log(result);
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
					`${process.env.REACT_APP_BASE_URL}itemSearch/nofrills/${item}/${time}?currentlocation=${currentStore}`,
				)
				.then(result => {
					console.log(result);
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
					`${process.env.REACT_APP_BASE_URL}itemSearch/longos/${item}/${time}?currentlocation=${currentStore}`,
				)
				.then(result => {
					console.log(result);
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
		}
	};

	useEffect(() => {
		let mounted = true;
		if (loaded === 3 && mounted) {
			console.log("DONEEEEEE");
			history.push("/compare");
			setLoading(false);
		} else {
			console.log("load:", loaded);
		}
		return () => (mounted = false);
	}, [loaded]);
	console.log(loaded);
	return (
		<>
			<SearchForm submitHandler={submitHandler} loading={loading} />
		</>
	);
};

export default Search;
