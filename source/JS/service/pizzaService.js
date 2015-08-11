(function() {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp');
    
    function callback (ingredientService) {
        var pizza = PizzaModel.pizza;   
        
        function getPizzaPrice (pizza) {
                var sum = 0;
                for (var i = 0; i < pizza.ingredients.length; i++) {
                    var id = pizza.ingredients[i].id,
                         ingredient = ingredientService.getIngredientById(id);
                    sum += ingredient.price;                
                }
                return sum;
            }
    
        return {       
            
            getPizzaPrice: getPizzaPrice,
    
            getPizzaPriceById: function (pizzaId) {            
                var currentPizza = pizza[pizzaId];            
                
                return getPizzaPrice(currentPizza);
            },
            
            addPizza: function (orderedPizza) {
                pizza.push(orderedPizza);
            },
            
            getPizza: function() {
                return pizza;
            }
        }
    }
    
    restaurantApp.factory('pizzaService', ['ingredientService', callback]);
})();
