import React, { useState, useEffect } from "react";
import "./Search.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import FormAlert from "../components/FormAlert";
import StoreChecklist from "../components/StoreChecklist";

const Search = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(0);
	const { createToken } = useAuth();
	const [storelist, setStoreList] = useState({});

	useEffect(() => {
		let mounted = true;
		if (loaded === 5 && mounted) {
			setTimeout(() => {
				setLoading(false);
				setLoaded(0);
				history.push("/compare");
			}, 3000);
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
						return 0;
					});
			})
			.then(ready => {
				if (!ready) {
					console.log(`need error message`, ready);
				} else {
					const token = ready;
					//LONGOS
					setStoreList({ longos: "loading" });

					axios
						.get(
							`${process.env.REACT_APP_BASE_URL}items/longos/${time}?item=${item}`,
							token,
						)
						.then(result => {
							if (result.data.data.longos.length) {
								setStoreList(storelist => {
									return { ...storelist, longos: result.data.data.longos.length };
								});
							} else {
								setStoreList(storelist => {
									return { ...storelist, longos: "fails" };
								});
							}
						})
						.catch(err => {
							setStoreList(storelist => {
								return { ...storelist, longos: "fail" };
							});
						})
						.then(() => {
							setStoreList(storelist => {
								return { ...storelist, sobeys: "loading" };
							});
							setLoaded(loaded => loaded + 1);
							//SOBEYS
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/sobeys/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							if (result.data.data.sobeys.length) {
								setStoreList(storelist => {
									return { ...storelist, sobeys: result.data.data.sobeys.length };
								});
							} else {
								setStoreList(storelist => {
									return { ...storelist, sobeys: "fail" };
								});
							}
						})
						.catch(err => {
							setStoreList(storelist => {
								return { ...storelist, sobeys: "fail" };
							});
						})
						.then(() => {
							setStoreList(storelist => {
								return { ...storelist, loblaws: "loading" };
							});
							setLoaded(loaded => loaded + 1);
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/loblaws/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							if (result.data.data.loblaws.length) {
								setStoreList(storelist => {
									return { ...storelist, loblaws: result.data.data.loblaws.length };
								});
							} else {
								setStoreList(storelist => {
									return { ...storelist, loblaws: "fail" };
								});
							}
						})
						.catch(err => {
							setStoreList(storelist => {
								return { ...storelist, loblaws: "fail" };
							});
						})
						.then(() => {
							setStoreList(storelist => {
								return { ...storelist, superstore: "loading" };
							});

							setLoaded(loaded => loaded + 1);
							//SUPERSTORE
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/superstore/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							setStoreList(storelist => {
								return { ...storelist, superstore: "loading" };
							});
							if (result.data.data.superstore.length) {
								setStoreList(storelist => {
									return {
										...storelist,
										superstore: result.data.data.superstore.length,
									};
								});
							} else {
								setStoreList(storelist => {
									return { ...storelist, superstore: "fail" };
								});
							}
						})
						.catch(err => {
							setStoreList(storelist => {
								return { ...storelist, superstore: "fail" };
							});
						})
						.then(() => {
							setLoaded(loaded => loaded + 1);
							setStoreList(storelist => {
								return { ...storelist, nofrills: "loading" };
							});

							//NO FRILLS
							return axios.get(
								`${process.env.REACT_APP_BASE_URL}items/nofrills/${time}?item=${item}`,
								token,
							);
						})
						.then(result => {
							if (result.data.data.nofrills.length) {
								setStoreList(storelist => {
									return { ...storelist, nofrills: result.data.data.nofrills.length };
								});
							} else {
								setStoreList(storelist => {
									return { ...storelist, nofrills: "fail" };
								});
							}
						})
						.catch(err => {
							setStoreList(storelist => {
								return { ...storelist, nofrills: "fail" };
							});
						})
						// .then(() => {
						// 	setStoreList(storelist => {
						// 		return { ...storelist, walmart: "loading" };
						// 	});

						// 	setLoaded(loaded => loaded + 1);
						// 	//WALMART
						// 	return axios.get(
						// 		`${process.env.REACT_APP_BASE_URL}items/walmart/${time}?item=${item}`,
						// 		token,
						// 	);
						// })
						// .then(result => {
						// 	console.log(result, result.data.data.walmart.length);
						// 	if (result.data.data.walmart.length) {
						// 		setStoreList(storelist => {
						// 			return { ...storelist, walmart: result.data.data.walmart.length };
						// 		});
						// 	} else {
						// 		setStoreList(storelist => {
						// 			return { ...storelist, walmart: "fail" };
						// 		});
						// 	}
						// })
						// .catch(err => {
						// 	console.log(err);
						// 	setStoreList(storelist => {
						// 		return { ...storelist, walmart: "fail" };
						// 	});
						// })
						.finally(() => {
							setLoaded(loaded => loaded + 1);
						});
				}
			})
			.catch(() => {
				console.log("Could not create access token");
			});
	};

	return (
		<>
			<h1 className="form__title">SHOP & COMPARE</h1>
			{!loading && <SearchForm submitHandler={submitHandler} loading={loading} />}

			{loading && (
				<div className="form__afterSubmit">
					<FormAlert page="shop" />
					<StoreChecklist storelist={storelist} />
					<LoadingSpinner />
				</div>
			)}
		</>
	);
};

export default Search;
