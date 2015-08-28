(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, pizzaService, ingredientService, orderService, clientService) {

        pizzaService.getPizza().then(function (response) {
            $scope.pizza = response.data;
        });

        $scope.getPizzaIngredients = function (pizzaId) {
            ingredientService.getPizzaIngredients(pizzaId).then(function (response) {
                clientService.setIngredients(response.data);
                $scope.pizzaIngredients = clientService.getIngredients();
                console.log($scope.pizzaIngredients);
            });
        }

        $scope.addPizza = function (pizza) {
            var promisedPizza = pizzaService.addPizza(pizza);
            promisedPizza.then(function () {
                bootbox.alert("Pizza added successfully");
                orderService.getCurrentOrderPizza().then(function (response) {
                    $scope.orderPizza = response.data;
                    console.log($scope.orderPizza);
                    for (var i = 0; i < $scope.orderPizza.length; i++) {
                        $scope.getPizzaCount(i);
                    }
                    clientService.setOrderPizza($scope.orderPizza);
                });
             });
        }

        $scope.getPizzaCount = function (pizzaIndex) {
            orderService.getPizzaCount($scope.orderPizza[pizzaIndex].Id).then(function (response) {
                $scope.orderPizza[pizzaIndex].Count = response.data;
            });
        }
    
        $scope.showPopup = function (id) {
            $scope.getPizzaIngredients(id);
            $('.ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });
        }
    }
    
    restaurantApp.controller('PizzaController', ['$scope', 'pizzaService', 'ingredientService', 'orderService',  'clientService', callback]);    
})();
