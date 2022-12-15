require("dotenv").config();
const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

function getRecipes(req, res, next) {
    const nameQuery = req.query.name;
    var remoteRecipes = [];
    var localRecipes = [];

   //If the fn recives a name by query send me back the data with the name
    if(nameQuery) {

        axios
            .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${nameQuery}&number=100`)

            .then( apiResponse => {
                let res = apiResponse.data.results
                remoteRecipes = res.filter( recipe => {
                    return recipe.title.toLowerCase().includes(nameQuery);
                });
                return Recipe.findAll({ include: [Diet] });
            })

            .then( localResponse => {
                localRecipes = localResponse.filter( recipe => {
                    return recipe.title.toLowerCase().includes(nameQuery);
                });
                return res.json([...localRecipes, ...remoteRecipes].slice(0, 9));
            })

            .catch( error => next(error));
        
    // If doesn´t receive anything, search for 100 recipes and send me back the data
    } else {

        axios
            // .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            .get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

            .then( apiResponse => {
                let res = apiResponse.data.results;
                remoteRecipes = res;
                return Recipe.findAll({ include: [Diet] });
            })

            .then( localResponse => {
                return res.json([...localResponse, ...remoteRecipes]);
            })

            .catch( error => next(error));
    }
    
}

function getRecipeById(req, res, next) {

    const id = req.params.idReceta;

    if(id.includes("-")) {

        Recipe.findByPk(id, { include: Diet }).then( recipe => {
            return res.json(recipe);
        });

    } else {

        axios
            .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            // .get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

            .then( response => {
                return res.json({
                    title: response.data.title,
					image: response.data.image,
					dishTypes: response.data.dishTypes,
					diets: response.data.diets,
					summary: response.data.summary,
					score: response.data.spoonacularScore,
					healthScore: response.data.healthScore,
                    readyInMinutes: response.data.readyInMinutes,
					instructions: response.data.instructions,
                })
            })
            .catch( error => next(error));
    }
}

function createRecipe(req, res, next) {
    const { title, summary, score, healthScore, instructions, diets, image, readyInMinutes } = req.body;

    Recipe.create({
        title,
        image,
        summary,
        score: parseFloat(score),
        healthScore: parseFloat(healthScore),
        readyInMinutes: parseFloat(readyInMinutes),
        instructions
    })
        .then( recipeCreated => {
            return recipeCreated.setDiets(diets);
        })
        .then( () => {
            return res.json({
                message: "Recipe created successfully"
            });
        })
        .catch(error => next(error));
}

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe
};