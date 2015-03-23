var Categoria = require('../modelos/categoria');
var Reporte = require('../modelos/reporte');

module.exports = function(router){

	router.route('/stats/resumen-general')
	.get(function(req, res){
		
		var stats = {
			"totales":{},
			"totalesTipo":{},
			"descripciones":{}
		}


		Reporte.aggregate({
			$group:{
				_id: {
					categoria:'$categoria',
					tipo:'$tipo',
				},
				total:{
					$sum : 1
				}
			},

		}, function(err, totalesTipo){
			if(err)
				res.send(err)


			stats["totalesTipo"] = totalesTipo;

			//agregar descripciones de categorias
			Categoria.find({},{descripcion:1}, function(err, descripciones){
				if(err)
					res.send(err)


				//convertir arreglo a objeto {idCategoria: descripcion}
				for(d in descripciones){
					d = descripciones[d]
					var idCategoria = d._id
					stats["descripciones"][idCategoria] = d.descripcion;
				}

				Reporte.aggregate({
					$group:{
						_id:{
							tipo:'$tipo'
						},
						total:{
							$sum:1
						}
					}
				}, function(err, totales){

					stats["totales"] = totales

					res.json(stats)
				})

			});
			
		});

	});

	router.route('/stats/listado/:num')
	.get(function(req, res){
		Reporte.find({}).limit(req.params.num).sort({_id:-1}).exec(function(err, reportes){
			if(err)
				res.send(err)
			res.json(reportes);
		});
	});

	router.route('/stats/ubicaciones/')
	.get(function(req, res){
		var data = {
			"ubicaciones": [],
			"descripciones": {}
		}
		Reporte.find({}).select({_id: 0, ubicacion: 1}).exec(function(err, ubicaciones){
			if(err)
				res.send(err)

			data["ubicaciones"] = ubicaciones;

			Categoria.find({},{descripcion:1}, function(err, descripciones){
				if(err)
					res.send(err)


				//convertir arreglo a objeto {idCategoria: descripcion}
				for(d in descripciones){
					d = descripciones[d]
					var idCategoria = d._id
					data["descripciones"][idCategoria] = d.descripcion;
				}


				res.send(data);

			});

		});
	})


}