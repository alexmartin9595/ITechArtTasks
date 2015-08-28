(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp', []);
    
    function callback($http, ingredientService, pizzaService) {
        return {
            getCurrentOrder: function() {
                return $http.get("/Home/GetCurrentOrder");
            },

            getCurrentOrderPizza: function() {
                return $http.get("/Home/GetCurrentOrderPizza");
            },

            deleteOrderPizza: function(data) {
                return $http.post("/Home/DeleteOrderPizza", data);
            },

            createPizza: function() {
                return $http.post("/Home/CreatePizza");
            },

            confirmOrder: function() {
                return $http.post("/Home/ConfirmOrder");
            },

            getPizzaCount: function(pizzaId) {
                return $http.get("/Home/GetPizzaCount/" + pizzaId);
            },

            GetIngredientsCount: function(pizzaId, ingredientId) {
                return $http.get("/Home/GetPizzaCount/" + pizzaId + "");
            }
    }
    }
    
    restaurantApp.factory('orderService', ['$http', 'ingredientService', 'pizzaService', callback]);    
})();


