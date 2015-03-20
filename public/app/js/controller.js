app.factory('Categorias', function($resource){
	return $resource('/api/categorias/:id', {id: '@id', num:'@num'},{
		update: {method:"PUT"},
		latest: {method:"GET", url:"/api/categorias/latest/:num"},

	})
});

app.factory('Reportes', function($resource){
	return $resource('/api/reportes/:id');
});

app.controller('NuevaPropuestaCtrl', function($scope, $http, Categorias, Reportes, uiGmapGoogleMapApi){


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

	$scope.datos = {
		ubicacion:{
			direccion: "",
			loc: {
				x: 19.168329, 
				y: -104.030131,
			}
		}
	}


	$scope.enviarForma = function(){
		if($scope.forma.$valid){
			Reportes.save($scope.datos, function(){
				$scope.forma.success = true;
				$scope.datos = {};
			});
		}
		else{
			console.log("forma no válida")
		}
	};



	$scope.map = { center: { latitude: 19.168329,  longitude: -104.030131, }, zoom: 10 };

	$scope.marker = {
		id: 0,
		coords:{
			latitude: 19.168329, 
			longitude: -104.030131,

		},
		options: { draggable: true },
		events: {
			dragend: function (marker, eventName, args) {
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();
				$scope.datos.ubicacion.loc = {
					x: lat,
					y: lon,
				}

				$scope.marker.options = {
					draggable: true,
				};
			}
		}
	};


});

