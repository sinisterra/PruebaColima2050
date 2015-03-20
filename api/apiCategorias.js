var sanitizer = require('sanitizer');
var Categoria = require('../modelos/categoria');

module.exports = function(router){

router.route('/categorias')
	.get(function(req, res){
		Categoria.find(function(err, categorias){
			if(err){
				res.send(err);
			}
			res.json(categorias)
		});
	})
	.post(function(req, res){
		var categoria = new Categoria();

		categoria.grupo = sanitizer.escape(req.body.grupo)
		categoria.descripcion = sanitizer.escape(req.body.descripcion)

		categoria.save(function(err, obj){
			if(err){
				res.send(err);
			}

			res.json({msg: "Categoria creada correctamente"});
		})
	})

router.route('/categorias/:id')
	.get(function(req, res){
		Categoria.findById(req.params.id, function(err, categoria){
			if(err)
				res.send(err)

			res.json(categoria)	
		})

	})
	.put(function(req, res){
		Categoria.findById(req.params.id, function(err, categoria){
			if(err)
				res.send(err)

			if(req.body.grupo != undefined)
				categoria.grupo = sanitizer.escape(req.body.grupo)

			if(req.body.descripcion != undefined)
				categoria.descripcion = sanitizer.escape(req.body.descripcion)

			categoria.save(function(err){
				if(err)
					res.send(err)

				res.json({msg: "datos actualizados"})
			})
		})

	})
	.delete(function(req, res){
		Categoria.remove({_id:req.params.id}, function(err){
			if(err)
				res.send(err)
			res.json({msg: "Elemento borrado"})
		})
	})



}