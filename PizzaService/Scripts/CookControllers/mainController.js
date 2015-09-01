(function () {
    "use strict";
    function callback($scope, pizzaService, ingredientService, pageService, historyService, shiftService) {
        pizzaService.getPizzasToCook().then(function (response) {
            $scope.pizzas = response.data;
            pizzaService.setPizza($scope.pizzas);

            $scope.pizzasQueue = [];

            $scope.cookBtns = [];
            for (var i = 0; i < $scope.pizzas.length; i++) {
                $scope.pizzasQueue.push({queue: i, pizza: $scope.pizzas[i]});
                $scope.cookBtns.push({ id: $scope.pizzasQueue[i].queue, isCooking: false });
            }

            $scope.currentPizza = { name: "" };
            if ($scope.pizzasQueue.length > 0) {
                $scope.currentPizza = $scope.pizzasQueue[0];
            }
        });

        

        $scope.setCookBtn = function (id) {
            for (var i = 0; i < $scope.cookBtns.length; i++) {
                if ($scope.cookBtns[i].id == id) {
                    return $scope.cookBtns[i].isCooking;
                }
            }
            return false;
        }

        $scope.setCookBtnToTrue = function (id) {
            for (var i = 0; i < $scope.cookBtns.length; i++) {
                if ($scope.cookBtns[i].id == id) {
                    $scope.cookBtns[i].isCooking = true;
                }
            }
        }

        $scope.deleteCookBtn = function (id) {
            for (var i = 0; i < $scope.cookBtns.length; i++) {
                if ($scope.cookBtns[i].id == id) {
                    $scope.cookBtns.splice(i, 1);
                }
            }
        }

        $scope.response = { isEnough: true };

        $scope.isHideMain = function () {
            return pageService.isHideMain;
        }

        $scope.getIngredientsForPizza = function(pizza) {
            ingredientService.getIngredientsByPizzaId(pizza.pizza.Id).then(function(response) {
                $scope.pizzaIngredients = response.data;

                $scope.checkPizza(pizza);
                $('.ingredients-show').bPopup();
            });
        }

        $scope.takeIngredientCount = function(id) {
            var ingredients = $scope.currentPizza.pizza.PizzaIngredients;
            for (var i = 0; i < ingredients.length; i++) {
                if (ingredients[i].IngredientId == id) {
                    return ingredients[i].Count;
                }
            }
        }

        $scope.checkPizza = function (pizza) {
            $scope.currentPizza = pizza;
        }
        
        $scope.deletePizza = function (pizza, isDelete) {
            if (isDelete) {
                historyService.addDeleted(pizza.pizza);
            }
            pizzaService.deletePizza(pizza.pizza.Id);
            $scope.pizzas = pizzaService.getPizza();
            $scope.deleteCookBtn(pizza.queue);
            $scope.pizzasQueue = [];
            $scope.cookBtns = [];
            for (var i = 0; i < $scope.pizzas.length; i++) {
                $scope.pizzasQueue.push({ queue: i, pizza: $scope.pizzas[i] });
                $scope.cookBtns.push({ id: $scope.pizzasQueue[i].queue, isCooking: false });
            }
            $('.not-enough-products').bPopup().close();
        }

        $scope.turnPizza = function (pizza) {
            pizzaService.turnPizza(pizza.pizza.Id);
            $scope.pizzas = pizzaService.getPizza();
            $scope.pizzasQueue = [];
            $scope.cookBtns = [];
            for (var i = 0; i < $scope.pizzas.length; i++) {
                $scope.pizzasQueue.push({ queue: i, pizza: $scope.pizzas[i] });
                $scope.cookBtns.push({ id: $scope.pizzasQueue[i].queue, isCooking: false });
            }
            $('.not-enough-products').bPopup().close();
        }

        $scope.errorCallback = function () {
            $('.not-enough-products').bPopup();
        }

        $scope.closePopup = function () {
            $('.pizza-done').bPopup().close();
        }

        $scope.successCallback = function () {
            $('.pizza-done').bPopup();
        }

        $scope.callback = function () {
            if ($scope.response.isEnough) {
                $scope.successCallback();
            }
            else {
                $scope.errorCallback();
            }
        }

        $scope.startCook = function (pizza) {
            ingredientService.getIngredients().then(function(response) {
                ingredientService.setStockIngredients(response.data);

                ingredientService.GetCountIngredientsByPizzaId(pizza.pizza.Id).then(function(response) {
                    $scope.pizzaIngredients = response.data;

                    $scope.response = ingredientService.isEnoughIngredients($scope.pizzaIngredients);
                    if (!$scope.response.isEnough) {
                        $('.main').block($scope.callback);
                        $scope.checkPizza(pizza);
                    } else {
                        $('.main').block($scope.callback);
                        $scope.checkPizza(pizza);
                        $scope.setCookBtnToTrue(pizza.queue);
                        historyService.addDone(pizza.pizza);
                        shiftService.addDone(pizza.pizza);
                    }
                });
            });
        }
    }

    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.controller("mainController", ["$scope", "pizzaService", "ingredientService", "pageService", "historyService", "shiftService", callback]);
})();