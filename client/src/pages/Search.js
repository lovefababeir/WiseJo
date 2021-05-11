import React, { useState } from "react";
import "./Search.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";

const Search = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const submitHandler = e => {
		e.preventDefault();

		const item = e.target.search.value;
		const currentStore = e.target.storeList.value.toLowerCase();
		const time = Date.now();
		if (item) {
			setLoading(true);

			const walmart = axios.get(
				`http://localhost:5000/itemSearch/walmart/${item}/${time}?currentlocation=${currentStore}`,
			);
			const longos = axios.get(
				`http://localhost:5000/itemSearch/nofrills/${item}/${time}?currentlocation=${currentStore}`,
			);
			const nofrills = axios.get(
				`http://localhost:5000/itemSearch/longos/${item}/${time}?currentlocation=${currentStore}`,
			);

			axios
				.all([walmart, longos, nofrills])
				.then(result => {
					console.log(result);
				})
				.catch(err => console.log(err))
				.finally(() => history.push("/compare"));
		}
	};

	return (
		<>
			<SearchForm submitHandler={submitHandler} loading={loading} />
		</>
	);
};

export default Search;
