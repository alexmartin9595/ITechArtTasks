restaurantApp.factory('pizzaService', function () {
    var pizza = PizzaModel.pizza,
        ingredients = Ingredients.data;

    function getIngredientById(id) {
        for (var i = 0; i < ingredients.length; i++) {
            var item = ingredients[i];
            for (var j = 0; j < item.kinds.length; j++) {
                if (item.kinds[j].id === id)
                    return item.kinds[j];
            }           
        }   
        return null;
    }  
    
    function getPizzaPrice (pizza) {
            var sum = 0;
            for (var i = 0; i < pizza.ingredients.length; i++) {
                var id = pizza.ingredients[i].id,
                     ingredient = getIngredientById(id);
                sum += ingredient.price;                
            }
            return sum;
        }

    return {
        getIngredientById: getIngredientById,

        getPriceById: function (id) {
            return getIngredientById(id).price;
        },

        getNameById: function (id) {
            return getIngredientById(id).name;
        },

        getPhotoById: function (id) {
            return getIngredientById(id).photo;
        },
        
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
})