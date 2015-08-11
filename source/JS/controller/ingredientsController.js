(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback ($scope, ingredientService, orderService) {
        $scope.model = ingredientService.getIngredients();
        
        $scope.order = orderService.getOrder();
        
        $scope.currentPizzaIndex = $scope.order.currentPizzaIndex;
        
        $scope.getNameById = ingredientService.getNameById;
        
        $scope.getPriceById = ingredientService.getPriceById;
        
        $scope.getPhotoById = ingredientService.getPhotoById;
            
        $scope.addIngredient = orderService.addIngredient;           
        
        $scope.createPizza = function () {
            $('.ingredients').bPopup();             
            orderService.createOrder();            
        }                    
    }
    
    restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', callback]);    
})();
