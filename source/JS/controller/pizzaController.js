restaurantApp.controller('PizzaController', ['$scope', 'pizzaService',  function ($scope, pizzaService) {
    $scope.pizza = pizzaService.getPizza();
    $scope.getIngredientBiId = pizzaService.getIngredientBiId;
    $scope.addPizza = pizzaService.addPizza;
}]);