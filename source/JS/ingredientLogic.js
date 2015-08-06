var restaurantApp = angular.module('restaurantApp', []);
restaurantApp.factory('ingredientLogic', function () {
    var ingredients = Ingredients.data;

    return {       
        getIngredients: function () {
            return ingredients;
        }
    }
    
});