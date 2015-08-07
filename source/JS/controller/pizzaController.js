restaurantApp.controller('PizzaController', ['$scope', 'pizzaService', 'ingredientService', function ($scope, pizzaService, ingredientService) {
    $scope.pizza = pizzaService.getPizza();
    $scope.getPizzaPriceById = pizzaService.getPizzaPriceById;
    $scope.getIngredientBiId = pizzaService.getIngredientById;
    $scope.addPizza = pizzaService.addPizza;
    $scope.getPriceById = pizzaService.getPriceById;
    $scope.getNameById = pizzaService.getNameById;
    $scope.getPhotoById = pizzaService.getPhotoById;
    $scope.createCustomOrder = ingredientService.createCustomOrder;

    $scope.showPopup = function () {
        $('.ingredients-popup').bPopup();
    }
}]);