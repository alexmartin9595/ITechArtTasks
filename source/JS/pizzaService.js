restaurantApp.factory('pizzaService',  function () {
    var pizza = PizzaModel.pizza;

    return {
        getIngredientBiId: function (id) {
            for (var item in pizza) {
                for (var ingredient in item.kinds) {
                    if (ingredient.id === id) 
                        return ingredient;
                }
            }   
            return null;
        },
        
        addPizza: function (orderedPizza) {
            pizza.push(orderedPizza);
        },
        
        getPizza: function() {
            return pizza;
        }
    }
})