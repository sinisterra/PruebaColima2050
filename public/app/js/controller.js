app.factory('Categorias', function($resource){
	return $resource('/api/categorias/:id', {id: '@id'},{
		update: {method:"PUT"},
	})
});

app.factory('Reportes', function($resource){
	return $resource('/api/reportes/:id');
});

app.factory('Stats', function($resource){
	return $resource('/api/stats/:tipo', {tipo: '@tipo'});
})

app.controller('NuevaPropuestaCtrl', function($scope, $http,
	Categorias, Reportes, uiGmapGoogleMapApi){

	//control para la validacion
	$scope.forma = {} 

	//datos seleccionar categoría
	$scope.categorias = {}

	//inicializar ubicacion
	$scope.datos = {
		ubicacion:{
			direccion: "",
			loc: {
				x: 19.168329, 
				y: -104.030131,
			}
		}
	}

	//inicializar mapa
	$scope.map = { 
		center: {
			latitude: $scope.datos.ubicacion.loc.x,
			longitude: $scope.datos.ubicacion.loc.y,
		},
		zoom: 10 
	};


	$scope.marker = {
		id: 0,
		coords:{
			latitude: $scope.datos.ubicacion.loc.x,
			longitude: $scope.datos.ubicacion.loc.y,
		},
		options: { draggable: true },
		events: {
			dragend: function (marker, eventName, args) {
				var lat = marker.getPosition().lat();
				var lon = marker.getPosition().lng();

				//actualizar los datos
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

	//enviar la forma al servidor
	$scope.enviarForma = function(){
		if($scope.forma.$valid){
			Reportes.save($scope.datos, function(){
				$scope.forma.success = true;
				$scope.datos = {};
			});
		}
	};
});

app.controller('InicioCtrl', function($scope, Stats){
	//cargar datos del api de stats
	var graficas = {};
	var colores = [
		"#004D40",
		"#26A69A",
		"#E0F2F1",
		"#B2DFDB",
		"#80CBC4",
		"#4DB6AC",
		"#009688",
		"#00897B",
		"#00796B",
		"#00695C",
	]

	$scope.recuento = {
		total:0
	}

	Stats.get({tipo: "resumen-general"}, function(data){

		$scope.datos = data;

		graficas.gSueno = new Grafica('graficaSueno', data, 'sueno');
		graficas.gPropongo = new Grafica('graficaPropongo', data, 'propongo');
		graficas.gParticipo = new Grafica('graficaParticipo', data, 'participo');
		
		for(g in graficas){
			graficas[g].graficar();
		}

		var recuento = new Recuento(data);


	});

	
	
	var Grafica = function(idDiv, data, tipo){
		var self = {
			chart : {},
			dataP: [],
			tipo: tipo,
			idDiv: idDiv,
			data: data,
		}

		self.graficar = function(){

			self.prepararDatos();

			var ctx = document.getElementById(self.idDiv).getContext("2d");
			self.chart = new Chart(ctx).Doughnut(self.dataP, {
				animation: 0
			});
			
		}

		self.prepararDatos = function(){

			for(e in self.data["totalesTipo"]){
				e = self.data["totalesTipo"][e]
				
				if(e["_id"]["tipo"] == self.tipo){
					var idCategoria = e._id.categoria;
					var entrada = {}
					entrada.value  = e["total"];
					entrada.color = colores[idCategoria % 10]
					entrada.label = self.data["descripciones"][idCategoria];
					self.dataP.push(entrada);
				}
			}

		}

		return self
	}
	
	var Recuento = function(data){
		var self = {
			data: data,
		}

		self.cuentaTotal = function(){

			for(e in self.data["totales"]){
				e = self.data["totales"][e];

				$scope.recuento[e._id.tipo] = e.total;
				$scope.recuento.total += e.total;

			}
		}

		self.cuentaTotal();


	}
	

});

