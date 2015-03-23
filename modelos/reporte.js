var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;
var connection = mongoose.createConnection(require('./db').url)

autoIncrement.initialize(connection);

//modelo Reporte
var reporteSchema  = new Schema({
	tipo: {
		type: String, 
		required: true
	},
	categoria: {
		type: String,
		 required: true
	},
	descripcion: {
		type: String,
		required: true
	},
	ubicacion: {
		direccion: {type:String, required: true},
		loc: {
			x: {type: Number, required: true},
			y: {type: Number, required: true}
		}
	},
	media: {
		type: String
	},
	nombre:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required:true
	},
	tel:{
		type:String,
		required:true
	},
	formaContacto:{
		type:Array,
		required:true
	},
	fecha:{
		type:Date,
		required:true
	}

});

reporteSchema.plugin(autoIncrement.plugin, "Schema");
module.exports = connection.model('Reporte', reporteSchema);