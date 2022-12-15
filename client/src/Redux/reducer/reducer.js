import * as types from "../actions/actionTypes.js";


const initialState = {
    recipes: [],
    recipesByName: [],
    recipeById: {},
    diets: [],
    loading: true
};

function reducer( state = initialState, action) {
    switch (action.type) {
        case types.GET_RECIPES: {
            return { ...state, recipes: action.payload };
        }
        case types.GET_RECIPES_BY_NAME: {
            return { ...state, recipesByName: action.payload };
        }
        case types.GET_RECIPE_BY_ID: {
            return { ...state, recipeById: action.payload };
        }
        case types.GET_DIETS: {
            return { ...state, diets: action.payload };
        }
        case types.SWITCH_LOADING: {
            return { ...state, loading: action.payload };
        }
        default: {
            return state;
        }
    }
}

export default reducer;
