(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, pizzaService, ingredientService, orderService) {

        $scope.currentOrder = {};

        $scope.getPizza = function () {
            pizzaService.getPizza().then(function (response) {
                $scope.pizza = response.data;               
            });
        }        

        $scope.getPizzaIngredients = function (pizzaId) {
            pizzaService.getPizzaIngredients(pizzaId).then(function (response) {
                $scope.pizzaIngredients = response.data;
                ingredientService.setPizzaIngredients(response.data);
            });
        }

        $scope.getCurrentOrderPizza = function () {
            orderService.getCurrentOrderPizza().then(function (response) {
                $scope.orderPizza = response.data;
            });
        }        

        $scope.getPizza();
        $scope.getCurrentOrderPizza();        

        $scope.deleteOrderPizza = function (pizza) {
            orderService.deleteOrderPizza(pizza).then(function () {
                bootbox.alert("Order removed successfully");
                orderService.getCurrentOrderPizza().then(function (response) {
                    $scope.orderPizza = response.data;
                    orderService.setOrderPizza($scope.orderPizza);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder(response.data);
                });

            });
        }

        $scope.addPizza = function (pizza) {           
            pizzaService.addPizza(pizza).then(function () {
                orderService.getCurrentOrderPizza().then(function (response) {
                    $scope.orderPizza = response.data;
                    orderService.setOrderPizza($scope.orderPizza);
                });
                orderService.getCurrentOrder().then(function (response) {
                    $scope.currentOrder = response.data;
                    orderService.setOrder(response.data);
                });
                pizzaService.getPizzaIngredients(pizza.Id).then(function (response) {
                    $scope.pizzaIngredients = response.data;
                    ingredientService.setPizzaIngredients(response.data);
                });
                bootbox.alert("Pizza added successfully");                
             });
        }

        $scope.showOrderPizzaIngredients = function (pizza)  {
            $scope.getPizzaIngredients(pizza.Id);
            pizzaService.setCurrentPizza(pizza);
            $('.order-ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });
        }
    
        $scope.showPopup = function (id) {
            $scope.getPizzaIngredients(id);
            $('.ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });
        }

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

        $scope.$watch(function () {
            return ingredientService.getPizzaIngredients();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.pizzaIngredients = newValue;
            }
        });
    }
    
    restaurantApp.controller('PizzaController', ['$scope', 'pizzaService', 'ingredientService', 'orderService', callback]);    
})();
