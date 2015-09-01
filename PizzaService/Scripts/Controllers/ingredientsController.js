(function () { 
    'use strict';
    var restaurantApp = angular.module('restaurantApp');

    function callback($scope, ingredientService, orderService, pizzaService) {       
        
        $scope.currentPizza = {};

        $scope.currentOrder = {};

        ingredientService.getIngredients().then(function (response) {            
            $scope.model = response.data;
        });

        $scope.addIngredient = function (ingredient) {
            var pizzaModel = {
                PizzaId: $scope.currentPizza.Id,
                Ingredient: ingredient
            }            
            ingredientService.addIngredient(pizzaModel).then(function () {
                pizzaService.getPizzaIngredients(pizzaModel.PizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                    ingredientService.setPizzaIngredients(response.data);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder($scope.currentOrder);
                });

            });            
        }
        
        $scope.deleteIngredient = function(ingredient) {
            var pizzaModel = {
                PizzaId: $scope.currentPizza.Id,
                Ingredient: ingredient
            }
            ingredientService.deleteIngredient(pizzaModel).then(function () {
                pizzaService.getPizzaIngredients(pizzaModel.PizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                    ingredientService.setPizzaIngredients(response.data);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder($scope.currentOrder);
                });
            });                       
        }

        $scope.incrementIngredient = function (ingredient) {
            console.log($scope.currentPizza);
            var pizzaModel = {
                PizzaId: $scope.currentPizza.Id,
                Ingredient: ingredient
            }
            ingredientService.incrementIngredient(pizzaModel).then(function () {
                pizzaService.getPizzaIngredients(pizzaModel.PizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                    ingredientService.setPizzaIngredients(response.data);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder($scope.currentOrder);
                });
            });
            
        }

        $scope.decrementIngredient = function (ingredient) {
            var pizzaModel = {
                PizzaId: $scope.currentPizza.Id,
                Ingredient: ingredient
            }
            ingredientService.decrementIngredient(pizzaModel).then(function () {
                pizzaService.getPizzaIngredients(pizzaModel.PizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                    ingredientService.setPizzaIngredients(response.data);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder($scope.currentOrder);
                });
            });            
        }

        $scope.$watch(function () {
            return pizzaService.getCurrentPizza();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.currentPizza = newValue;                
            }
        });

        $scope.$watch(function () {
            return ingredientService.getPizzaIngredients();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.pizzaIngredients = newValue;
            }
        });

        $scope.$watch(function () {
            return orderService.getOrder();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.currentOrder = newValue;
            }
        });

        $scope.$watch(function () {
            return orderService.getOrderPizza();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.orderPizza = newValue;
            }
        });
       
    }    
    restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', 'pizzaService', callback]);
})();
