module.exports = /* ngInject */ function ruthRouting($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/main',
			controller: 'MainCtrl',
			controllerAs: 'vm',
			template: 'views/main.html'
		})
}