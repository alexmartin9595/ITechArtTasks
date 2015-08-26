(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, pizzaService, ingredientService, orderService) {
       
        var promisePizza = pizzaService.getPizza();

        promisePizza.then(function(response) {
            $scope.pizza = response.data;
            console.log($scope.pizza);
        });

        $scope.getPizzaIngredients = function (pizzaId) {
            var promiseIngredients = ingredientService.getPizzaIngredients(pizzaId);
            promiseIngredients.then(function(response) {
                $scope.pizzaIngredients = response.data;
                console.log($scope.pizzaIngredients);
            });
        }

        $scope.addPizza = function (pizza) {
            var promisedPizza = pizzaService.addPizza(pizza);
            promisedPizza.then(function () {
                 alert("Pizza added successfully");
             });
        }
        $scope.getPriceById = ingredientService.getPriceById;
        $scope.getNameById = ingredientService.getNameById;
        $scope.getPhotoById = ingredientService.getPhotoById;
        $scope.createCustomOrder = orderService.createCustomOrder;
    
        $scope.showPopup = function (id) {
            $scope.getPizzaIngredients(id);
            $('.ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });
        }
    }
    
    restaurantApp.controller('PizzaController', ['$scope', 'pizzaService', 'ingredientService', 'orderService', callback]);    
})();
