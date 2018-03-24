var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(__dirname + '/public/stylesheets'));
app.use('/scripts', express.static(__dirname + '/public/javascripts'));
app.use('/images', express.static(__dirname + '/public/images'));


// app.get("/recipes", index.recipes);
app.get("/:var(index.html|recipes)", index.home);
app.get('/:var(recipes.html|index.html)?', (req, res) => {
    res.redirect('/index.html');
});
app.post('/', (req, res) => {
    if(req.body && req.body.length !== 0){
        index.getRecipes(req.body.ingredients, res);
    }
})
app.get('*', (req, res) => {
    res.locals.message = `localhost:${PORT}` + req.url + " not found";
    res.locals.status = 404
    res.status(404);
    res.render('error');
});

module.exports = app;
