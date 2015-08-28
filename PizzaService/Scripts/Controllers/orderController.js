(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, ingredientService, pizzaService, orderService, clientService) {
        
        $scope.$watch(function () {
            return clientService.getOrderPizza();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.orderPizza = newValue;
            }
        });

        orderService.getCurrentOrder().then(function (response) {
            $scope.currentOrder = response.data;
        });

        orderService.getCurrentOrderPizza().then(function (response) {
            clientService.setOrderPizza(response.data);
            $scope.orderPizza = clientService.getOrderPizza();
            for (var i = 0; i < $scope.orderPizza.length; i++) {
                $scope.getPizzaCount(i);
            }
        });
        
        $scope.deleteOrderPizza = function (order) {
            orderService.deleteOrderPizza(order).then(function () {
                bootbox.alert("Order removed successfully");
                orderService.getCurrentOrderPizza().then(function (response) {
                    $scope.orderPizza = response.data;
                    for (var i = 0; i < $scope.orderPizza.length; i++) {
                        $scope.getPizzaCount(i);
                    }
                });
            });
        }

        $scope.getPizzaCount = function(pizzaIndex) {
            orderService.getPizzaCount($scope.orderPizza[pizzaIndex].Id).then(function(response) {
                $scope.orderPizza[pizzaIndex].Count = response.data;
            });
        }

        $scope.createPizza = function () {
            orderService.createPizza().then(function () {
                orderService.getCurrentOrderPizza().then(function (response) {
                    $scope.orderPizza = response.data;
                    for (var i = 0; i < $scope.orderPizza.length; i++) {
                        $scope.getPizzaCount(i);
                    }
                    $scope.currentPizza = $scope.orderPizza[$scope.orderPizza.length - 1];
                });
            });
            $('.ingredients').bPopup({
                follow: [false, false],
                position: [500, 100]
            });
        }
        
        $scope.openOrderEditor = function (pizza) {
            ingredientService.getPizzaIngredients(pizza.Id).then(function (response) {
                $scope.pizzaIngredients = response.data;
            });
            $scope.currentPizza = pizza;
            $('.ingredients').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });            
        }

        $scope.showIngredients = function (pizzaId) {
            ingredientService.getPizzaIngredients(pizzaId).then(function(response) {
                $scope.pizzaIngredients = response.data;
                clientService.setPizzaIngredients(response.data);
                console.log($scope.pizzaIngredients);
               
                pizzaService.getPizzaById(pizzaId).then(function (response) {
                    $scope.currentPizza = response.data;
                });
            });
            
            $('.order-ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });                  
        }              
        
        $scope.confirmOrder = function () {
            orderService.confirmOrder().then(function(response) {
                bootbox.alert(response.data);
            });
        }
    }
    
    restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', 'orderService', 'clientService', callback]);
})();
