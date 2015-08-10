restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', function ($scope, ingredientService, orderService) {
    $scope.model = ingredientService.getIngredients();
    $scope.order = orderService.getOrder();
    $scope.currentPizzaIndex = $scope.order.currentPizzaIndex;
    $scope.getNameById = ingredientService.getNameById;
    $scope.getPriceById = ingredientService.getPriceById;
    $scope.getPhotoById = ingredientService.getPhotoById;    
    $scope.addIngredient = orderService.addIngredient;           
    
    $scope.createPizza = function () {             
        orderService.createOrder();
        $('.ingredients').bPopup();
    }       
    
    
}]);