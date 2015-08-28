(function() {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($http) {
    
        return {       
            getPizza: function() {
                return $http.get("/Home/GetAllPizza");
            },

            getPizzaById: function(id) {
                return $http.get("/Home/GetPizzaById/" + id);
            },

            addPizza: function(data) {
                return $http.post("/Home/AddPizzaToOrder", data);
            }
        }
    }
    
    restaurantApp.factory('pizzaService', callback);
})();
