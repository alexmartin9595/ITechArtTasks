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
            }
            //getIngredientById: function(id) {
            //    return $http.get("/Home/GetIngredientById" + id);
            //}

            //getPriceById: function (id) {
            //    return getIngredientById(id).price;
            //},

            //getNameById: function (id) {
            //    return getIngredientById(id).name;
            //},

            //getPhotoById: function (id) {
            //    return getIngredientById(id).photo;
            //}
        }
    }

    restaurantApp.factory('ingredientService', callback);
})();
