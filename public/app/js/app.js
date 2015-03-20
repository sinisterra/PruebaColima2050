var app = angular.module('Colima2050', ['ui.router','ngResource'])

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/inicio');
	$stateProvider
	.state('inicio', {
		url: '/inicio',
		templateUrl: "/public/app/views/inicio.html"
	})
	.state('nueva-propuesta', {
		url: '/nueva-propuesta',
		templateUrl: "/public/app/views/nueva-propuesta.html",
		controller:"NuevaPropuestaCtrl"
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



