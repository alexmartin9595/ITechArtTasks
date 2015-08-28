(function () {
    'use strict';

    var restaurantApp = angular.module('restaurantApp');

    function callback($http) {
        return {
            getIngredients: function () {
                return $http.get("/Home/GetAllIngredients");
            },

            getIngredientById: function(id) {
                return $http.get("/Home/GetIngredientById/" + id);
            },

            getPizzaIngredients: function(pizzaId) {
                return $http.get("/Home/GetPizzaIngredients/" + pizzaId);
            },

            addIngredient: function (data) {
                return $http.post("/Home/AddIngredient", data);
            },

            deleteIngredient: function(data) {
                return $http.post("/Home/DeleteIngredient", data);
            },

            incrementIngredient: function(data) {
                return $http.post("/Home/IncrementIngredient", data);
            },

            decrementIngredient: function(data) {
                return $http.post("/Home/DecrementIngredient", data);
            }

        }
    }

    restaurantApp.factory('ingredientService', callback);
})();
