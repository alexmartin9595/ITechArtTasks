restaurantApp.controller('OrderController', ['$scope', 'ingredientService', 'pizzaService', function ($scope, ingredientService, pizzaService) {
    $scope.order = ingredientService.getOrder();  
    $scope.addIngredient = ingredientService.addIngredient;
    $scope.deleteOrder = ingredientService.deleteOrder;
    $scope.getPizzaPriceById = pizzaService.getPizzaPriceById;
    $scope.getNameById = pizzaService.getNameById; 
    $scope.getPriceById = pizzaService.getPriceById;
    $scope.currentPizza = $scope.order.pizza[0];     
    
    $scope.showIngredients = function (index) { 
        $scope.currentPizza = $scope.order.pizza[index];   
        $('.order-ingredients-popup').bPopup();    
        var item = $('.order-ingredients-popup');
        $('.order-ingredients-popup').detach();
        item.appendTo('body');        
    }
}]);