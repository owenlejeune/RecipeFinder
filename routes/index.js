const url = require('url');
const path = require('path');
const hbs = require('hbs');
const qstring = require('querystring');
const http = require("http");
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const API_KEY = "933d59e4cec577e4103038bb292bb6cc";
var tempPath = __dirname + "/../views/tablecell.hbs";

exports.home = function(req, res){
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}

exports.getRecipes = function(ingredients, res){
    var urlPath = `/api/search?key=${API_KEY}${ingredients}`
    const options = {
        host: "www.food2fork.com",
        path: urlPath
    };

    http.request(options, (apiResponse) => {
        parseData(ingredients, apiResponse, res);
    }).end();
}

function parseData(ingredients, apiResponse, res){
    let recipeData = '';
    apiResponse.on('data', (chunk) => {
        recipeData += chunk;
    });
    apiResponse.on('end', () => {
        displayRecipes(ingredients, recipeData, res);
    });
}

function displayRecipes(ingredients, recipeData, res){
    var jsonData = JSON.parse(recipeData);
    var count = jsonData.count;
    var index = 0;
    var recipes = jsonData.recipes;
    var templateFilePath = __dirname + '/../views/celldata.hbs';
    fs.readFile(templateFilePath, (err, data) => {
        if(err){ res.end(); return;}

        var template = hbs.compile(data.toString());
        ingredients = ingredients.replace("&q=", "");
        ingredients = ingredients.replace(/,/g, " and ");
        var title = (ingredients != '') ? `Recipes with ${ingredients}` : "Top Recipes";
        var html = `<h1>${title}</h1>`;
        html += `<table id='table'><tr>`

        for(let recipe of recipes){
            var result = template({imgurl: recipe.image_url, title: recipe.title,
                srcurl: recipe.f2f_url, imgID: `img${index}`, titleID:`title${index}`});
            html += result;
            index++;
        }
        html += '</tr></table';

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({tableHTML: html}));
    });
}
