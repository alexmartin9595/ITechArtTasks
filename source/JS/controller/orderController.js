restaurantApp.controller('OrderController', ['$scope', 'ingredientService', function ($scope, ingredientService) {
    $scope.order = ingredientService.getOrder();  
}]);