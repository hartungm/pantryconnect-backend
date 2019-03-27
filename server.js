const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send('Hello, please check out the documentation for more information on this API');
});

app.get('/search', (req,res) => {
    var test = require("./sample-data/sample-recipe");
    res.status(200).send(test);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;