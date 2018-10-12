'use strict';

const recipes = [
    {
        name: "Brownie",
        description: "Brownies hechos de camote",
        ingredients: [
            {
                name: "Camote",
                description: "Tuberculo",
                quantity: 200,
                unit: "gr",
                info: {
                    carbohydrates: 0,
                    proteins: 0,
                    fat: 0
                }
            },
            {
                name: "Platano",
                description: "Fruta",
                quantity: 120,
                unit: "gr",
                info: {
                    carbohydrates: 0,
                    proteins: 0,
                    fat: 0
                }
            },
            {
                name: "Avena",
                description: "N/A",
                quantity: 200,
                unit: "gr",
                info: {
                    carbohydrates: 0,
                    proteins: 0,
                    fat: 0
                }
            }
        ]
    }
];

module.exports = async function(server) {
  // enable authentication
    const {Recipe, Food, Ingredient, Info} = server.models;
    for (const recipe of recipes) {
        const {name, description, ingredients} = recipe;
        const recipeInstance = await Recipe.create({name, description});
        console.log(recipeInstance)
        for (const ingredient of ingredients) {
            const {name, description, quantity, unit, info} = ingredient;
            const [foodInstance] = await Food.findOrCreate({where:{name}}, {name, description});
            await Ingredient.create({quantity, unit, recipeId: recipeInstance.id.toString(), foodId: foodInstance.id.toString()});
            await Info.create({...info, foodId: foodInstance.id.toString()});
        }
    }

};
