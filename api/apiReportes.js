var sanitizer = require('sanitizer');

var Reporte = require('../modelos/reporte');
module.exports = function(router){
	router.route('/reportes')
	.get(function(req, res){
		Reporte.find(function(err, reportes){
			if(err)
				res.json(err)

			res.json(reportes);
		});
	})
	.post(function(req, res){


		//campos obligatorios
		var reporte = new Reporte({
			tipo: sanitizer.escape(req.body.tipo),
			categoria: sanitizer.escape(req.body.categoria),
			descripcion: sanitizer.escape(req.body.descripcion),
			ubicacion: {
				direccion: sanitizer.escape(req.body.ubicacion.direccion),
				loc:{
					x:sanitizer.escape(req.body.ubicacion.loc.x),
					y:sanitizer.escape(req.body.ubicacion.loc.y),
				}
			},
			
			nombre: sanitizer.escape(req.body.nombre),
			email: sanitizer.escape(req.body.email),
			tel: sanitizer.escape(req.body.telefono),
			formaContacto: sanitizer.escape(req.body.formaContacto),
			fecha: Date.now(),
		});



		if(req.body.formaContacto == "ambos"){
			reporte.formaContacto = ['email','tel']
		}

		//campos no obligatorios
		if(req.body.media != undefined){
			reporte.media =  sanitizer.escape(req.body.media)
		}

		console.log(reporte)

		reporte.save(function(err){
			if(err)
				res.send(err)
			else{

				res.json({msg: "OK"})
			}

		})


	});

	router.route('/reportes/:id')
	.get(function(req, res){
		Reporte.findById({_id: req.params.id}, function(err, reporte){
			if(err)
				res.send(err)
			res.json(reporte);
		})
	})
	.put(function(req, res){
		res.json({msg: req.params.id})
	})
	.delete(function(req, res){
		Reporte.remove({_id: req.params.id}, function(err){
			if(err)
				res.json(err)
			res.json({msg: 'OK'})
		})
	})

	


}