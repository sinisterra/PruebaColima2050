var express = require('express');
var bodyParser = require('body-parser');
var sanitizer = require('sanitizer');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

//Configurar express
var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + "/public"));

//Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Declarar rutas
var router = express.Router();
var apiCategorias = require('./api/apiCategorias')(router);
var apiReportes = require('./api/apiReportes')(router);

app.use('/api', router);


app.get('/', function(req, res){
	res.render('index');
});


var port = process.env.PORT || 3000;

console.log("Servidor en "+port);
app.listen(port);