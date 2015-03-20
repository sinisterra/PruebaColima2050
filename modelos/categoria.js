var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;
var connection = mongoose.createConnection(require('./db').url)

autoIncrement.initialize(connection);

//modelo Categoria
var categoriaSchema  = new Schema({
	grupo: String,
	descripcion: String,
});

categoriaSchema.plugin(autoIncrement.plugin, "Schema");
module.exports = connection.model('Categoria', categoriaSchema);