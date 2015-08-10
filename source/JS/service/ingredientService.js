restaurantApp.factory('ingredientService', function () {   
    var ingredients = Ingredients.data;

    function getIngredientById(id) {
        for (var i = 0; i < ingredients.length; i++) {
            var item = ingredients[i].kinds;
            for (var j = 0; j < item.length; j++) {
                if (item[j].id === id)
                    return item[j];
            }
        }
        return null;
    }


    return {
        getIngredients: function () {
            return ingredients;
        },

        getIngredientById: getIngredientById,

        getPriceById: function (id) {
            return getIngredientById(id).price;
        },

        getNameById: function (id) {
            return getIngredientById(id).name;
        },

        getPhotoById: function (id) {
            return getIngredientById(id).photo;
        }                                          
    }
})