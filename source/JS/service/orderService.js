(function () {
    'use strict';
    
    var restaurantApp = angular.module('restaurantApp', []);
    
    function callback (ingredientService, pizzaService) {
        var order = {
            pizza: [],
            sum: 0,
            currentPizzaIndex: 0
        }
    
        function deleteIngredient(ingredient) {
            var currentIndex = order.currentPizzaIndex,
                currentIngredientIndex = getIngredientIndex(ingredient),
                currentPizzaIngredients = order.pizza[currentIndex].ingredients;
    
            currentPizzaIngredients.splice(currentIngredientIndex, 1);
            order.sum -= ingredient.price;
        }
    
        function getIngredientIndex(ingredient) {
            var item = order.pizza[order.currentPizzaIndex].ingredients;
            for (var j = 0; j < item.length; j++) {
                if (item[j].id === ingredient.id)
                    return j;
            }
            return -1;
        }
    
        function getPizzaIndex(pizza) {
            for (var i = 0; i < order.pizza.length; i++) {
                if (order.pizza[i].name === pizza.name)
                    return i;
            }
            return -1;
        }
    
        return {
            getOrder: function () {
                return order;
            },
    
            createOrder: function () {
                var pizza = {},
                    lastIndex = order.pizza.length;                    
    
                pizza.ingredients = [];                               
                order.pizza.push(pizza);
                
                var currentPizza = order.pizza[lastIndex];
                
                currentPizza.name = "Order №" + (lastIndex + 1);
                currentPizza.count = 1;
                order.currentPizzaIndex = lastIndex;
            },
    
            createCustomOrder: function (customPizza) {
                var lastIndex = order.pizza.length,
                    pizzaIndex = getPizzaIndex(customPizza);
    
                if (pizzaIndex === -1) {
                    order.pizza.push(customPizza);
                    order.pizza[lastIndex].count = 1;
                }
                else
                    order.pizza[pizzaIndex].count += 1;
                order.sum += pizzaService.getPizzaPrice(customPizza);
                order.currentPizzaIndex = lastIndex;
            },
    
            deleteOrder: function (pizzaIndex) {
                var currentPizza = order.pizza[pizzaIndex],
                    pizzaCount = currentPizza.count;
                
                order.sum -= pizzaService.getPizzaPrice(currentPizza) * pizzaCount;
                order.pizza.splice(pizzaIndex, 1);
            },
    
            addIngredient: function (ingredient) {
                var currentIndex = order.currentPizzaIndex,
                    currentIngredientIndex = getIngredientIndex(ingredient),                    
                    currentPizzaIngredients = order.pizza[currentIndex].ingredients,
                    lastIngredientIndex = currentPizzaIngredients.length;
    
                if (currentIngredientIndex === -1) {
                    currentPizzaIngredients.push(ingredient);
                    currentPizzaIngredients[lastIngredientIndex].count = 1;
                }
                else
                    currentPizzaIngredients[currentIngredientIndex].count += 1;
                order.sum += ingredient.price;
            },
    
            deleteIngredient: deleteIngredient,
    
            incrementIngredient: function (ingredient) {
                var currentIndex = order.currentPizzaIndex,
                    currentIngredientIndex = getIngredientIndex(ingredient),
                    currentPizzaIngredients = order.pizza[currentIndex].ingredients;
    
                currentPizzaIngredients[currentIngredientIndex].count += 1;
                order.sum += ingredient.price;
            },
    
            decrementIngredient: function (ingredient) {
                var currentIndex = order.currentPizzaIndex,
                    currentIngredientIndex = getIngredientIndex(ingredient),
                    currentPizzaIngredients = order.pizza[currentIndex].ingredients;
    
                currentPizzaIngredients[currentIngredientIndex].count -= 1;
                order.sum -= ingredient.price;
                if (currentPizzaIngredients[currentIngredientIndex].count === 0)
                    deleteIngredient(ingredient);
            }
            
            // confirmationCallback: function () {
            //     $('wrapper').block();
            // }
        }
    }
    
    restaurantApp.factory('orderService', ['ingredientService', 'pizzaService', callback]);    
})();


