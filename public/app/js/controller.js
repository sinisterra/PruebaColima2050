app.factory('Categorias', function($resource){
	return $resource('/api/categorias/:id')
});

app.factory('Reportes', function($resource){
	return $resource('/api/reportes/:id');
});

app.controller('NuevaPropuestaCtrl', function($scope, $http, Categorias, Reportes){
	var entry = Categorias.get({id: 12}, function(){
		$scope.categoriaUnica = entry;
	})

	$scope.forma = {}
	$scope.categorias = {}

	//preparar datos para el select
	Categorias.query(function(categorias){
		//categoria[opcion] = [desc, ...]
		for(e in categorias){
			var entry = categorias[e];
			if(entry.grupo != undefined){
				//si está vacía, crear un arreglo
				if($scope.categorias[entry.grupo] === undefined)
					$scope.categorias[entry.grupo] = []
				$scope.categorias[entry.grupo].push(entry)
			}
		}
	});


	$scope.enviarForma = function(){
		// Reportes.save($scope.forma, function(data){
		// 	console.log(data["msg"]);
		// });+
			if($scope.forma.$valid){
				Reportes.save($scope.datos, function(){
					$scope.forma.success = true;
					$scope.datos = {};
				})
			}
		
	};

});