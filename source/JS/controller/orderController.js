(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback ($scope, ingredientService, pizzaService, orderService) {
        $scope.order = orderService.getOrder();    
        $scope.currentPizza = $scope.order.pizza[0];    
    
        $scope.addIngredient = orderService.addIngredient;
        
        $scope.deleteIngredient = orderService.deleteIngredient;
        
        $scope.incrementIngredient = orderService.incrementIngredient;
        
        $scope.decrementIngredient = orderService.decrementIngredient;
        
        $scope.deleteOrder = orderService.deleteOrder;
        
        $scope.getPizzaPriceById = pizzaService.getPizzaPriceById;
        
        $scope.getNameById = ingredientService.getNameById;
        
        $scope.getPriceById = ingredientService.getPriceById;
        
        $scope.getPhotoById = ingredientService.getPhotoById;
    
        $scope.setCurrentPizzaIndex = function (index) {
            $scope.order.currentPizzaIndex = index;
        }
        
        $scope.showIngredients = function (index) { 
            $scope.currentPizza = $scope.order.pizza[index];
            $scope.setCurrentPizzaIndex(index);
            $('.order-ingredients-popup').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });                  
        }
        
        $scope.confirmOrder = function () {
            $('.wrapper').block();
            orderService.confirmOrder();
        }
    }
    
    restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', 'orderService', callback]);    
})();
