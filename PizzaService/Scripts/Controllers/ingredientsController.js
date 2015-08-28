(function () { 
    'use strict';
    var restaurantApp = angular.module('restaurantApp');

    function callback($scope, ingredientService, orderService, clientService, pizzaService) {

        $scope.$watch(function () {
            return clientService.getPizzaIngredients();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.pizzaIngredients = newValue;
            }
        });
        
        ingredientService.getIngredients().then(function (response) {
            clientService.setIngredients(response.data);
            $scope.model = clientService.getIngredients();
        });

        $scope.addIngredient = function (pizzaId, ingredient) {
            var pizzaModel = {
                PizzaId: pizzaId,
                Ingredient: ingredient
            }
            ingredientService.addIngredient(pizzaModel).then(function () {
                bootbox.alert("ingredient add successfully");
            });
        }
        
        $scope.deleteIngredient = function(pizzaId, ingredient) {
            var pizzaModel = {
                PizzaId: pizzaId,
                Ingredient: ingredient
            }

            ingredientService.deleteIngredient(pizzaModel).then(function (response) {
                ingredientService.getPizzaIngredients(pizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                });

                pizzaService.getPizzaById(pizzaId).then(function (response) {
                    $scope.currentPizza = response.data;
                });
            });
            
        }

        $scope.incrementIngredient = function (pizzaId, ingredient) {
            var pizzaModel = {
                PizzaId: pizzaId,
                Ingredient: ingredient
            }

            ingredientService.incrementIngredient(pizzaModel).then(function (response) {
                ingredientService.getPizzaIngredients(pizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                });

                pizzaService.getPizzaById(pizzaId).then(function (response) {
                    $scope.currentPizza = response.data;
                });
            });
        }

        $scope.decrementIngredient = function (pizzaId, ingredient) {
            var pizzaModel = {
                PizzaId: pizzaId,
                Ingredient: ingredient
            }

            ingredientService.decrementIngredient(pizzaModel).then(function (response) {
                ingredientService.getPizzaIngredients(pizzaId).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                });

                pizzaService.getPizzaById(pizzaId).then(function (response) {
                    $scope.currentPizza = response.data;
                });
            });

            
        }
    }
    
    restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', 'clientService', 'pizzaService', callback]);
})();
