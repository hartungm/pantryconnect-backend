module.exports = class RecipeLookup {

    constructor() {
        this.mongoose = require('mongoose');
        this.mongoose.connect(process.env.MONGO_URI);
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
    }

    lookupByIngredient(ingredients, filter, callback) {
        var self = this;
        var filteredRecipes = [];
        self.db.once('open', () => {
            var ingredientArray = RecipeLookup.getIngredientArrayFromIngredientList(ingredients)
            const recipeSchema = require('./schemas/recipe_schema');
            var RecipeModel = self.mongoose.model('Recipe', recipeSchema);
            RecipeModel.find({ingredients: { $in: ingredientArray}}).lean().exec( (err, doc) => {
                if(err) {
                    callback(err,doc);
                    return;
                }

                doc.map(recipe => {
                    recipe = RecipeLookup.addRecipePercentage(recipe, ingredients);
                    if(recipe.matchPercentage >= filter) {
                        filteredRecipes.push(recipe);
                    }
                });
                callback(err, filteredRecipes);
            });
        });
    }

    static addRecipePercentage(recipe, ingredients) {
        recipe.matchCount = 0;
        ingredients.map(ingredient => {
            if(recipe.ingredients.includes(ingredient.name)) {
                recipe.matchCount++;
            }
        });

        recipe.ingredientCount = recipe.ingredients.length;
        recipe.matchPercentage = recipe.matchCount / recipe.ingredients.length;
        return recipe;
    }

    static getIngredientArrayFromIngredientList(ingredients) {
        var ingredientArray = [];
        ingredients.map(ingredient => {
            ingredientArray.push(ingredient.name);
        });
        return ingredientArray;
    }
}