var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;
var connection = mongoose.createConnection(require('./db').url)

autoIncrement.initialize(connection);

//modelo Reporte
var reporteSchema  = new Schema({
	tipo: String,
	nombre: String,
});

reporteSchema.plugin(autoIncrement.plugin, "Schema");
module.exports = connection.model('Reporte', reporteSchema);