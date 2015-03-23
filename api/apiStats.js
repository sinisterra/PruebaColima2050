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



}