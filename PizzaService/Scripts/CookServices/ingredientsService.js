(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("ingredientService", ["$http", function ($http) {

        this.getIngredients = function () {
            return $http.get("/Home/GetAllIngredients"); 
        };

        this.GetCountIngredientsByPizzaId = function(id) {
            return $http.get("/Home/GetCountIngredientsByPizzaId/" + id);
        }

        this.getIngredientsByPizzaId = function(id) {
            return $http.get("/Home/GetPizzaIngredients/" + id);
        }

        var stockIngredients = [];

        this.setStockIngredients = function(ingredients) {
            stockIngredients = ingredients;
        }

        this.isEnoughIngredients = function (currentIngredients) {

            var decrise = [];
            for (var i = 0; i < currentIngredients.length; i++) {
                for (var j = 0; j < stockIngredients.length; j++) {
                    if (currentIngredients[i].IngredientId == stockIngredients[j].StockIngredient[0].Id) {
                        if (currentIngredients[i].Count > stockIngredients[j].StockIngredient[0].Count) {
                            decrise = [];
                            return {
                                name: stockIngredients[j].Name,
                                isEnough: false
                            }
                        }
                        decrise.push(
                        {
                            Id: currentIngredients[i].IngredientId,
                            Count: currentIngredients[i].Count
                        });
                        break;
                    }
                }
            }

            

            for (var i = 0; i < decrise.length; i++) {
                this.editStock(decrise[i]);
            }

            return {
                name: "",
                isEnough: true
            }
            
        }

        this.editStock = function(data) {
            return $http.post("/Home/UpdateStock", data);
        }

    }]);
})();