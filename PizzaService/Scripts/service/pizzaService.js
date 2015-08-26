(function() {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback($http) {
        //var pizza = PizzaModel.pizza;   
        
        //function getPizzaPrice (pizza) {
        //        var sum = 0;
        //        for (var i = 0; i < pizza.ingredients.length; i++) {
        //            var id = pizza.ingredients[i].id,
        //                 ingredient = ingredientService.getIngredientById(id);
        //            sum += ingredient.price *  pizza.ingredients[i].count;                
        //        }
        //        return sum;
        //    }
    
        return {       
            
            //getPizzaPrice: getPizzaPrice,
    
            //getPizzaPriceById: function (pizzaId) {            
            //    var currentPizza = pizza[pizzaId];            
                
            //    return getPizzaPrice(currentPizza);
            //},
            
            //addPizza: function (orderedPizza) {
            //    pizza.push(orderedPizza);
            //},
            
            getPizza: function() {
                return $http.get("/Home/GetAllPizza");
            },

            addPizza: function(data) {
                return $http.post("/Home/AddPizzaToOrder", data);
            }
        }
    }
    
    restaurantApp.factory('pizzaService', callback);
})();
