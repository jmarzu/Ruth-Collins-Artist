app.controller('MainCtrl', ['$scope', function($scope) {
  console.log('main controller');

  var vm = this;
  vm.name = 'Ruth Collins, this is working';
  vm.math = 2 + 2;
}]);