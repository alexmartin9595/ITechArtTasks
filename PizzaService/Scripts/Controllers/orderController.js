(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, ingredientService, pizzaService, orderService, clientService) {              

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
                });
                $scope.getCurrentOrder();
            });
            $('.ingredients').bPopup({
                follow: [false, false],
                position: [500, 100]
            });
        }
        
        $scope.openOrderEditor = function (pizza) {
            console.log(pizza);

            pizzaService.getPizzaIngredients(pizza.Id).then(function (response) {
                $scope.pizzaIngredients = response.data;
                pizzaService.setCurrentPizza(pizza);
            });            
            $('.ingredients').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });            
        }        
        
        $scope.confirmOrder = function () {
            orderService.confirmOrder().then(function(response) {
                $scope.data = response.data;
            });
            $('body').block(data);
            
        }

        $scope.$watch(function () {
            return orderService.getOrder();
        },
        function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.currentOrder = newValue;
            }
        });
    }
    
    restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', 'orderService', 'clientService', callback]);
})();
