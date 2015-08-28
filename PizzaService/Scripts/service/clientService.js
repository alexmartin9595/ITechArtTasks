(function () {
    'use strict';
   
    var restaurantApp = angular.module('restaurantApp');

    function callback() {

        var data = {
            ingredients: [],
            pizzaIngredients: [],
            pizza: [],
            orderPizza: []
        };
       
        return {

            setPizza: function(newPizza) {
                data.pizza = newPizza;
            },

            getPizza: function() {
                return data.pizza;
            },

            setIngredients: function (newIngredients) {
                data.ingredients = newIngredients;
            },

            getIngredients: function() {
                return data.ingredients;
            },

            setPizzaIngredients: function (newPizzaIngredients) {
                data.pizzaIngredients = newPizzaIngredients;
            },

            getPizzaIngredients: function() {
                return data.pizzaIngredients;
            },

            setOrderPizza: function (newOrderPizza) {
                data.orderPizza = newOrderPizza;
            },

            getOrderPizza: function() {
                return data.orderPizza;
            }


           

        }
    }

    restaurantApp.factory('clientService', callback);
})();
