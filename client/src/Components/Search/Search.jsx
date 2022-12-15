import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../Redux/actions/actions";
import Style from "./Search.module.css";


export default function Search({setSearch}) {

    const [nameRecipe, setNameRecipe] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setNameRecipe(e.target.value)
    }

    const handleSubmit = (e) => {
        if(nameRecipe) {
            e.preventDefault();
            dispatch(getRecipesByName(nameRecipe));
            setSearch(true);
            setNameRecipe("");
        } else {
            e.preventDefault();
            setSearch(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className={Style.input_search}
                    placeholder="Search..."
                    value={nameRecipe}
                    onChange={handleChange}
                />
                
            </form>
        </>
    )
}