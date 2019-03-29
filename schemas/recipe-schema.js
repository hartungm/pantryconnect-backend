var mongoose = require('mongoose');
var Schema = mongoose.Schema

var recipeSchema = new Schema({
    name: String,
    ingredients: [String],
    ingredientCounts: [Number],
    ingredientMeasurements: [String],
    instructions: [String],
    prepTime: Number,
    cookTime: Number,
    rating: Number    
});

module.exports = recipeSchema;