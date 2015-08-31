(function () { 
    'use strict';
    var restaurantApp = angular.module('restaurantApp');

    function callback($scope, ingredientService, orderService, clientService, pizzaService) {       
        
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
    }    
    restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', 'clientService', 'pizzaService', callback]);
})();
