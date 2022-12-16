import axios from "axios";
import * as types from "./actionTypes.js";

let url = "https://food-app-back.onrender.com";

export function getRecipes() {
    return async (dispatch) => {
        await axios.get(`${url}/recipes`)
        .then( res => {
            dispatch({ type: types.GET_RECIPES, payload: res.data})
        });
    };
}

export function getRecipesByName(name) {
    return async (dispatch) => {
        await axios.get(`${url}/recipes?name=${name}`)
        .then( res => {
            dispatch({ type: types.GET_RECIPES_BY_NAME, payload: res.data})
        });
    };
}

export function getRecipesById(id) {
    return async (dispatch) => {
        await axios.get(`${url}/recipes/${id}`)
        .then( res => {
            dispatch({ type: types.GET_RECIPE_BY_ID, payload: res.data})
        });
    };
}

export function createRecipe(newRecipe) {
    return async (dispatch) => {
        await axios.post(`${url}/recipe`, newRecipe)
        .then( res => console.log(res.data))
    }
}

export function getDiets() {
    return async (dispatch) => {
        await axios.get(`${url}/types`)
        .then( res => {
            dispatch({ type: types.GET_DIETS, payload: res.data})
        });
    };
}

export function switchLoading(e) {
    return (dispatch) => {
        dispatch({ type: types.SWITCH_LOADING, payload: e});
    };
}

