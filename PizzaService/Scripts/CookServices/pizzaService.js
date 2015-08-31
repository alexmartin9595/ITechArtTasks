(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("pizzaService", ["$http", function ($http) {
        var pizza = [];

        this.getPizzaById = function (id) {
            return $http.get("/Home/GetPizzaByIdWithIngredients/" + id);
        };

        this.setPizza = function(pizzas) {
            pizza = pizzas;
        }

        this.getPizza = function() {
            return pizza;
        }

        this.getPizzasToCook = function () {
            return $http.get("/Home/GetPizzasToCook");
        }

        this.deletePizza = function(id){
            for (var i = 0; i < pizza.length; i++) {
                if (pizza[i].Id === id) {
                    pizza.splice(i, 1);
                    return ;
                }
            }
            return null;
        }

        this.turnPizza = function (id) {
            for (var i = 0; i < pizza.length; i++) {
                if (pizza[i].Id === id) {
                    var item = pizza[i];
                    pizza.splice(i, 1);
                    pizza.push(item);
                    return;
                }
            }
            return null;
        }
    }]);
})();