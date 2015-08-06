restaurantApp.controller('IngredientsController', ['$scope', 'ingredientLogic', 'ingredientService', function ($scope, ingredientLogic, ingredientService) {
    $scope.model = ingredientLogic.getIngredients();
    $scope.addIngredient = ingredientService.addIngredient;  
}]);