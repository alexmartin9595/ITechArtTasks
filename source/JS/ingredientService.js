restaurantApp.factory('ingredientService', ['pizzaService', function (pizzaService) {
    var order = {
        pizza: [],
        sum: 0   
    }

    return {
        getOrder: function () {
            return order;
        },

        createOrder: function () {
            var pizza = {},
                lastIndex = order.pizza.length;
            
            order.pizza.push(pizza);           
            order.pizza[lastIndex].name = "Order №" + (lastIndex + 1);
        },        
        
        createCustomOrder: function (customPizza) {
            order.pizza.push(customPizza);
            order.sum += pizzaService.getPizzaPrice(customPizza);
        },
        
        deleteOrder: function (pizzaIndex) {
            //order.sum -= pizzaService.getPizzaPrice(order.pizza[pizzaIndex].price);
            order.pizza.splice(pizzaIndex, 1);            
        },
        
        addIngredient: function (pizzaId, ingredient) {
            order.pizza[pizzaId].ingredients.push(ingredient);  
        },
        
        deleteIngredient: function (pizzaId, ingredient) {
            order.pizza[pizzaId].ingredients.remove(ingredient);
        },
        
        incrementIngredient: function (pizzaId, ingredientIndex) {
            order.pizza[pizzaId].ingredients[ingredientIndex].count += 1;
        },
        
        decrementIngredient: function (pizzaId, ingredientIndex) {
            order.pizza[pizzaId].ingredients[ingredientIndex].count -= 1;
        }
        
        
       
    }
}])