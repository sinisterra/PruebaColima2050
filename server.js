var express = require('express');

var app = express();
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render('index');
});

var port = process.env.PORT || 3000;
console.log("Servidor en "+port);
app.listen(port);