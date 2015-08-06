restaurantApp.factory('ingredientService', function () {
    var order = {
        names: [],
        photos: [],
        sum: 0,
        weight: 0        
    }

    return {
        getOrder: function () {
            return order;
        },

        addIngredient: function (ingredient) {            
            order.names.push(ingredient.name);
            order.photos.push(ingredient.photo);
            order.sum += ingredient.price;
            order.weight += ingredient.weight;
        }       
    }
})