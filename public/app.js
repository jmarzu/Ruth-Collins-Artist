var app = angular.module('ruthCollinsArtist', ['ui.bootstrap'])

app.controller('MainCtrl', function($scope) {
  $scope.name = 'Ruth Collins, this is working';
  $scope.paintings = [
    '/images/All-American-compressor.jpg',
    '/images/AutumnGreens-compressor.jpg',
    '/images/BackyardTrees-compressor.jpg',
    '/images/CabinOnTheRollingRoad-compressor.jpg',
    '/images/CanYouSeeWhoThatIs_-compressor.jpg',
    '/images/ComingBackIn-compressor.jpg',
    '/images/CornerTavern-compressor.jpg',
    '/images/DontLookBack-compressor.jpg',
    '/images/FourBirds_Proof2-compressor.jpg',
    '/images/GreatMillsBarberShop-compressor.jpg',
    '/images/GreatMillsChillyDogs-compressor.jpg'
  ];

});

app.controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
 
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//unsplash.it/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
});

app.controller('ModalCtrl', function ($uibModal, $log, $document) {
  var vm = this;
  vm.items = ['item1', 'item2', 'item3'];

  vm.animationsEnabled = true;

  vm.open = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal ' + parentSelector)) : undefined;

    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'vm',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return vm.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      vm.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  vm.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return vm.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      vm.selected = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  vm.openMultipleModals = function () {
    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title-bottom',
      ariaDescribedBy: 'modal-body-bottom',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'bottom';  
      }
    });

    $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title-top',
      ariaDescribedBy: 'modal-body-top',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'top';  
      }
    });
  };

  vm.toggleAnimation = function () {
    vm.animationsEnabled = !vm.animationsEnabled;
  };
});

// // Please note that $uibModalInstance represents a modal window (instance) dependency.
// // It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var vm = this;
  vm.items = items;
  vm.selected = {
    item: vm.items[0]
  };

  vm.ok = function () {
    $uibModalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

// app.component('modalComponent', {
//   templateUrl: 'myModalContent.html',
//   bindings: {
//     resolve: '<',
//     close: '&',
//     dismiss: '&'
//   },
//   controller: function () {
//     var $ctrl = this;

//     $ctrl.$onInit = function () {
//       $ctrl.items = $ctrl.resolve.items;
//       $ctrl.selected = {
//         item: $ctrl.items[0]
//       };
//     };

//     $ctrl.ok = function () {
//       $ctrl.close({$value: $ctrl.selected.item});
//     };

//     $ctrl.cancel = function () {
//       $ctrl.dismiss({$value: 'cancel'});
//     };
//   }
// });