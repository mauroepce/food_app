import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, switchLoading } from "../../Redux/actions/actions";
import Style from "./Home.module.css";
import Search from "../Search/Search.jsx";
import Loading from "../../img/loading_gif.gif";
import Card from "../Card/Card";
import imageNotFound from "../../img/image_not_found.png";


export default function Home() {

    const dispatch = useDispatch();
    const searchRecipes = useSelector( state => state.recipesByName);
    const allRecipes = useSelector( state => state.recipes);
    const loading = useSelector( state => state.loading);
    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [filter, setFilter] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [orderedRecipes, setOrderedRecipes] = useState([]);

    //Init Home
    useEffect( () => {
        dispatch(getRecipes());
        setTimeout( () => {
            dispatch(switchLoading(false));
        }, 2500);
    }, [dispatch])

    //Search
    useEffect( () => {
        setOrderedRecipes([]);
        setFilteredRecipes([]);
        setOffset(0);
        setPage(1);
        if (search) {
            setTimeout( () => {
                dispatch(switchLoading(false));
            }, 2500);
        }
    }, [dispatch, search, searchRecipes]);

    //Filters
    const filterDiets = (recipe) => {
        let arrayDiets = [];
        if(recipe.diets) {
            for(let diet of recipe.diets) {
                typeof diet === "object" ? arrayDiets.push(diet.name.toLowerCase()) : arrayDiets.push(diet.toLowerCase());
            }
        }
        if(recipe.vegetarian) {
            arrayDiets.push("vegetarian")
        }
        return arrayDiets;
    }

    useEffect( () => {
        setSearch(false);
        setOffset(0);
        setPage(1);
        if(filter) {
            let filterRecipes = [...allRecipes].filter( recipe => {
                return (filterDiets(recipe) && filterDiets(recipe).includes(filter.toLowerCase()))
            });
            filterRecipes.length && setFilteredRecipes(filterRecipes);
        } else {
            setFilteredRecipes([]);
        }
    }, [filter, allRecipes])

    //Ordering

    function handleSort(e) {
        if(filteredRecipes.length) {
            if(e.target.value === "asc") {
                const asc = [...filteredRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
                });
                setFilteredRecipes(asc);
            }
            if(e.target.value === "desc") {
                const desc = [...filteredRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
                });
                setFilteredRecipes(desc);
            }
            if(e.target.value === "high") {
                const high = [...filteredRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) < (b.score || b.healthScore) ? 1 : -1;
                });
                setFilteredRecipes(high);
            }
            if(e.target.value === "low") {
                const low = [...filteredRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) > (b.score || b.healthScore) ? 1 : -1;
                });
                setFilteredRecipes(low);
            }
            if(e.target.value === "between") {
                const between  = [...filteredRecipes].filter( recipes => recipes.healthScore >= 20 && recipes.healthScore <= 40)
                setFilteredRecipes(between)
            }
        } else if (searchRecipes.length && search) {
            if(e.target.value === "asc") {
                const asc = [...searchRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
                });
                setRecipes(asc);
            }
            if(e.target.value === "desc") {
                const desc = [...searchRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
                });
                setRecipes(desc);
            }
            if(e.target.value === "high") {
                const high = [...searchRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) > (b.score || b.healthScore) ? 1 : -1;
                });
                setRecipes(high);
            }
            if(e.target.value === "low") {
                const low = [...searchRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) < (b.score || b.healthScore) ? 1 : -1;
                });
                setRecipes(low);
            }
            if(e.target.value === "between") {
                const between = [...searchRecipes].filter( recipes => recipes.healthScore >= 20 && recipes.healthScore <= 40)
                setRecipes(between);
            }
        } else {
            if(e.target.value === "asc") {
                const asc = [...allRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
                });
                setOrderedRecipes(asc);
            }
            if(e.target.value === "desc") {
                const desc = [...allRecipes].sort( (a, b) => {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
                });
                setOrderedRecipes(desc);
            }
            if(e.target.value === "high") {
                const high = [...allRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) < (b.score || b.healthScore) ? 1 : -1;
                })
                setOrderedRecipes(high);
            }
            if(e.target.value === "low") {
                const low = [...allRecipes].sort( (a, b) => {
                    return (a.score || a.healthScore) > (b.score || b.healthScore) ? 1 : -1;
                })
                setOrderedRecipes(low);
            }
            if (e.target.value === "between") {
                const between = [...allRecipes].filter( recipes => recipes.healthScore >= 20 && recipes.healthScore <= 40);
                setOrderedRecipes(between);
            }
        }
    }

 

    // Paginated

    const numRecipes = 9;

    const maxPage = filteredRecipes.length ? 
        Math.ceil(filteredRecipes.length / numRecipes) :
        searchRecipes.length ?
        Math.ceil(searchRecipes.length / numRecipes) :
        Math.ceil(allRecipes.length / numRecipes);

    const next = () => {
        if (page < maxPage) {
            setOffset(offset + numRecipes);
            setPage(page + 1);
        }
    };

    const previous = () => {
        if (page > 1) {
            setOffset(offset - numRecipes);
            setPage(page - 1);
        }
    };

    useEffect(() => {
        if (search) {
            if (searchRecipes) {
                let pageRecipes = [...searchRecipes].slice(
                    offset, 
                    offset + numRecipes
                );
                setRecipes(pageRecipes);
            }
        } else {
            if (filteredRecipes.length) {
                let pageRecipes = [...filteredRecipes].slice(
                    offset,
                    offset + numRecipes
                );
                setRecipes(pageRecipes);
            } else if (orderedRecipes.length) {
                let pageRecipes = [...orderedRecipes].slice(
                    offset,
                    offset + numRecipes
                )
                setRecipes(pageRecipes);
            } else {
                let pageRecipes = [...allRecipes].slice(
                    offset,
                    offset + numRecipes    
                )
                setRecipes(pageRecipes);
            }
        }
    }, [allRecipes, filteredRecipes, orderedRecipes, searchRecipes, page, offset, search])

    return (
        <>
            <div>
                <div className={Style.background}>
                    <div className={Style.filter_sort}>
                        <div>
                            <span></span>
                            <select defaultValue={"DEFAULT"} onChange={handleSort}>
                                <option value="DEFAULT" disabled>Alphabetic order</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>

                            <span></span>
                            <select defaultValue={"DEFAULT"} onChange={handleSort}>
                                <option value="DEFAULT" disabled>Order by score</option>
                                <option value="high">High</option>
                                <option value="low">Low</option>
                                <option value="between">between 20 - 40</option>
                            </select>

                            <span></span>
                            <select defaultValue={"DEFAULT"} className={Style.filter_select} onChange={(e) => setFilter(e.target.value)}>
                                <option value="DEFAULT" disabled>filter by diets</option>
                                <option value="">All diets</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="dairy free">Dairy free</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
                                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="paleolithic">Paleo</option>
                                <option value="primal">Primal</option>
                                <option value="whole 30">whole30</option>
                            </select>
                        </div>
                        <div>
                            <Search setSearch={setSearch}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.recipes_home}>
                {loading ? (
                    <div>
                        <img className={Style.loading} src={Loading} alt="loading"/>
                    </div>
                ) : recipes.length > 0 ? (
                    [...recipes].map( recipe => (
                        <Card 
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                            diets={recipe.diets}
                            
                        />
                    ))
                ) : (
                    <div>
                        <img className={Style.not_found} src={imageNotFound} alt="not found"/>
                        
                        <button className={Style.btn_not_found} onClick={(e) => {
                            setSearch(""); 
                            setFilteredRecipes(e, "empty")
                            }}>
                                Try again
                        </button>
                    </div>
                )}
            </div>
            <div className={Style.pagination}>
                <button className={Style.btn_page} onClick={previous}>
                            {"<< Previous"}
                </button>
                <span className={Style.num_page}>{page}</span>
                <button className={Style.btn_page} onClick={next}>
                            {"Nex >>"}
                </button>
            </div>
        </>
    )
}
