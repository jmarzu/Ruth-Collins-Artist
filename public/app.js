var app = angular.module('ruthCollinsArtist', ['ui.router', 'ngAnimate']);

	console.log('Ruth Collins App Module')

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function($stateProvider, $urlRouterProvider, $locationProvider) {	
		  	$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('main', {
					url: '/main',
					controller: 'MainCtrl',
					controllerAs: 'vm',
					templateUrl: 'views/main.html'
				})
				.state('art', {
					url: '/art',
					controller: 'ArtCtrl',
					controllerAs: 'vm',
					templateUrl: 'views/art.html'
				})
				.state('contact', {
					url: '/contact',
					controller: 'ContactCtrl',
					controllerAs: 'vm',
					templateUrl: 'views/contact.html'
				});
	}]);			


