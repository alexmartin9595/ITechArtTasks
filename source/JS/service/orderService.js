var restaurantApp = angular.module('restaurantApp', []);
restaurantApp.factory('orderService', ['ingredientService', 'pizzaService', function (ingredientService, pizzaService) {
    var order = {
        pizza: [],
        sum: 0,
        currentPizzaIndex: 0
    }

    function deleteIngredient(ingredient) {
        var currentIndex = order.currentPizzaIndex,
            currentIngredientIndex = getIngredientIndex(ingredient);

        order.pizza[currentIndex].ingredients.splice(currentIngredientIndex, 1);
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
            order.pizza[lastIndex].name = "Order №" + (lastIndex + 1);
            order.pizza[lastIndex].count = 1;
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
            order.sum -= pizzaService.getPizzaPrice(order.pizza[pizzaIndex]);
            order.pizza.splice(pizzaIndex, 1);
        },

        addIngredient: function (ingredient) {
            var currentIndex = order.currentPizzaIndex,
                currentIngredientIndex = getIngredientIndex(ingredient),
                lastIngredientIndex = order.pizza[currentIndex].ingredients.length;

            if (currentIngredientIndex === -1) {
                order.pizza[currentIndex].ingredients.push(ingredient);
                order.pizza[currentIndex].ingredients[lastIngredientIndex].count = 1;
            }
            else
                order.pizza[currentIndex].ingredients[currentIngredientIndex].count += 1;
            order.sum += ingredient.price;
        },

        deleteIngredient: deleteIngredient,

        incrementIngredient: function (ingredient) {
            var currentIndex = order.currentPizzaIndex,
                currentIngredientIndex = getIngredientIndex(ingredient);

            order.pizza[currentIndex].ingredients[currentIngredientIndex].count += 1;
            order.sum += ingredient.price;
        },

        decrementIngredient: function (ingredient) {
            var currentIndex = order.currentPizzaIndex,
                currentIngredientIndex = getIngredientIndex(ingredient);

            order.pizza[currentIndex].ingredients[currentIngredientIndex].count -= 1;
            order.sum -= ingredient.price;
            if (order.pizza[currentIndex].ingredients[currentIngredientIndex].count === 0)
                deleteIngredient(ingredient);
        }
    }
}])
