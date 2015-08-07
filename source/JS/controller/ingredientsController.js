restaurantApp.controller('IngredientsController', ['$scope', 'ingredientLogic', 'ingredientService', function ($scope, ingredientLogic, ingredientService) {
    $scope.model = ingredientLogic.getIngredients();
    $scope.order = ingredientService.getOrder();
    $scope.currentOrderIndex = $scope.order.pizza.length - 1;
    $scope.addIngredient = ingredientService.addIngredient;        
    
    $scope.setCurrentOrderIndex = function(index) {
        $scope.currentOrderIndex = index;
    }   
    
    $scope.createPizza = function () {
        ingredientService.createOrder();
        $('.ingredients').bPopup();
    }   
    
}]);