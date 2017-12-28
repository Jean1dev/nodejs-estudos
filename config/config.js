//////////////////////////////////////////////////////////////////////////////////////////
// MODULO DE CONFIGURAÇÃO DO SERVIDOR

var app = require('express')();
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(expressValidator());

consign()
	.include('app/routes')
	.then('config/database.js')
	.then('app/models')
	.into(app);

module.exports = app;