(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, ingredientService, pizzaService, orderService) {              

        $scope.getCurrentOrder = function () {
            orderService.getCurrentOrder().then(function (response) {
                $scope.currentOrder = response.data;
                orderService.setOrder($scope.currentOrder);
            });
        }

        $scope.getCurrentOrder();

        $scope.createPizza = function () {
            orderService.createPizza().then(function () {
                orderService.getCurrentOrderPizza().then(function(response) {
                    $scope.orderPizza = response.data;
                    pizzaService.setCurrentPizza($scope.orderPizza[$scope.orderPizza.length - 1].Pizza);
                    orderService.setOrderPizza(response.data);
                });
                $scope.getCurrentOrder();
            });
            $('.ingredients').bPopup({
                follow: [false, false],
                position: [500, 100]
            });
        }
        
        $scope.openOrderEditor = function (pizza) {
            pizzaService.getPizzaIngredients(pizza.Id).then(function (response) {
                $scope.pizzaIngredients = response.data;
                pizzaService.setCurrentPizza(pizza);
            });            
            $('.ingredients').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });            
        }

        $scope.confirmationCallback = function () {
            bootbox.alert($scope.response);
        }
        
        $scope.confirmOrder = function () {
            orderService.confirmOrder().then(function (response) {
                $scope.response = response.data;
                $scope.getCurrentOrder();
                $scope.orderPizza = [];
                orderService.setOrderPizza($scope.orderPizza);
                $('.content').block($scope.confirmationCallback);
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
    }
    
    restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', 'orderService', callback]);
})();
