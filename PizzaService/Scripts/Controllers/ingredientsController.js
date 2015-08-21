(function () { 
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($scope, ingredientService, orderService) {

        var promiseIngredients = ingredientService.getIngredients();

        promiseIngredients.then(function(response) {
            $scope.model = response.data;
        });
        
        $scope.order = orderService.getOrder();
        
        $scope.currentPizzaIndex = $scope.order.currentPizzaIndex;
        
        $scope.getNameById = ingredientService.getNameById;
        
        $scope.getPriceById = ingredientService.getPriceById;
        
        $scope.getPhotoById = ingredientService.getPhotoById;
            
        $scope.addIngredient = orderService.addIngredient;

        
        $scope.createPizza = function () {
            $('.ingredients').bPopup({
                follow: [false, false], 
                position: [500, 100] 
            });             
            orderService.createOrder();            
        }
    }
    
    restaurantApp.controller('IngredientsController', ['$scope', 'ingredientService', 'orderService', callback]);    
})();
