var sanitizer = require('sanitizer');

var Reporte = require('../modelos/reporte');
module.exports = function(router){
	router.route('/reportes')
		.get(function(req, res){
			Reporte.find(function(err, reportes){
				if(err)
					res.send(err)

				res.json(reportes);
			});
		})
		.post(function(req, res){
			console.log(req.body)
			res.json({msg: "success"})
		});

	router.route('/reportes/:id')
		.get(function(req, res){
			res.json({msg: req.params.id})
		})
		.put(function(req, res){
			res.json({msg: req.params.id})
		})
		.delete(function(req, res){
			res.json({msg: req.params.id})
		})
}