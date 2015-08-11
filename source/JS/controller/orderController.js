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
        
        $scope.openOrderEditor = function (pizzaIndex) {
            $scope.currentPizza = $scope.order.pizza[pizzaIndex];
            $('.ingredients').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });            
        }
        
        $scope.successCallback = function () {            
            bootbox.alert("Your order is successfully confirmed");                      
        }
        
        $scope.errorCallback = function () {
            bootbox.alert("Your order wasn't confirmed");            
        }
        
        $scope.clearOrder = function () {
            $scope.order.pizza = [];
            $scope.order.sum = 0;
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
            if (orderService.confirmationCallback) {
                $('.wrapper').block($scope.successCallback); 
                $scope.clearOrder();               
            }
            else
                $('.wrapper').block($scope.errorCallback);                                                       
        }
    }
    
    restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', 'orderService', callback]);    
})();
