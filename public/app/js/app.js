var app = angular.module('Colima2050', ['ui.router','ngResource', 'uiGmapgoogle-maps'])

//definir rutas y controladores dentro de ui-router
app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/inicio');
	$stateProvider
	.state('inicio', {
		url: '/inicio',
		templateUrl: "/public/app/views/inicio.html",
		controller:"InicioCtrl",
	})
	.state('nueva-propuesta', {
		url: '/nueva-propuesta',
		templateUrl: "/public/app/views/nueva-propuesta.html",
		controller:"NuevaPropuestaCtrl",
	})
	.state('nueva-pregunta', {
		url: '/nueva-pregunta',
		templateUrl: "/public/app/views/nueva-pregunta.html"
	})
	.state('participaciones', {
		url: '/participaciones',
		templateUrl: "/public/app/views/participaciones.html"
	})
});


app.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
})
