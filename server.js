const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const RecipeLookup = require('./recipe/recipe-search');

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send('Hello, please check out the documentation for more information on this API');
});

app.get('/search', (req,res) => {
    var filter = req.query.filter;
    var ingredients = req.body.ingredients;
    if(ingredients === undefined) {
        res.status(401).send('Ingredients missing or sent in an invalid format');
        return;
    }
    var recipeLookup = new RecipeLookup();
    recipeLookup.lookupByIngredient(ingredients, filter, (err, recipes) => {
        if(err) {
            console.log(err);
            res.status(401).send(err);
        }
        res.status(200).send(recipes);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;