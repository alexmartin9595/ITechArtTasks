(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("ingredientService", ["$http", function ($http) {
        //var ingredients = Ingredients.data;

        this.getIngredients = function () {
            return $http.get("/Home/GetAllIngredients"); //ingredients;
        };
        /*
        this.getIngredientById = function (id) {
            return $http.get("/Home/GetIngredientById/" + id);
        }
        */
        this.GetCountIngredientsByPizzaId = function(id) {
            return $http.get("/Home/GetCountIngredientsByPizzaId/" + id);
        }

        this.getIngredientsByPizzaId = function(id) {
            return $http.get("/Home/GetPizzaIngredients/" + id);
        }

        var stockIngredients = [];

        this.isEnoughIngredients = function (currentIngredients) {
            this.getIngredients().then(function(response) {
                stockIngredients = response.data;
            });

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