(function() {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($http) {
        var currentPizza = {};
        return {
            setCurrentPizza: function (pizza) {
                currentPizza = pizza;
            },

            getCurrentPizza: function () {
                return currentPizza;
            },

            getPizza: function() {
                return $http.get("/Home/GetAllPizza");
            },

            getPizzaById: function(id) {
                return $http.get("/Home/GetPizzaById/" + id);
            },

            addPizza: function(data) {
                return $http.post("/Home/AddPizzaToOrder", data);
            },

            getPizzaIngredients: function (pizzaId) {
                return $http.get("/Home/GetPizzaIngredients/" + pizzaId);
            }            

        }
    }
    
    restaurantApp.factory('pizzaService', callback);
})();
