(function () {
    "use strict";
    var callback = function ($scope, shiftService, ingredientService) {

        shiftService.takeShifts().then(function (response) {
            shiftService.shifts = response.data;
            $scope.shift = shiftService.getShift();
        })

        $scope.shift = null;

        $scope.currentShift = null;

        $scope.doneOnShift = [];

        $scope.shiftEndBtnDisable = true;

        $scope.usedIngredients = [];

        $scope.isShiftOn = false;

        $scope.changeShift = function () {
            $scope.shiftEndBtnDisable = true;
            $scope.doneOnShift = shiftService.getDoneOnShift();
            if ($scope.doneOnShift.length == 0) {
                $('.end-shift').bPopup();
                shiftService.nextShift($scope.shift);
                $scope.shift = shiftService.getShift();
                $scope.isShiftOn = shiftService.getShifOn();
                return;
            }

            $scope.getIngredients($scope.doneOnShift);

            shiftService.getUsedIngredients().then(function(response) {
                var ingredients = response.data;

                var ingredientsCount = shiftService.getUsedIngredientsCount();
                for (var i = 0; i < ingredientsCount.length; i++) {
                    $scope.usedIngredients.push({ name: ingredients[i].Name, count: ingredientsCount[i].count });
                }
                $('.end-shift').bPopup();
                shiftService.nextShift($scope.shift);
                $scope.shift = shiftService.getShift();
                $scope.isShiftOn = shiftService.getShifOn();
            });
        }

        $scope.startShift = function () {
            $scope.currentShift = $scope.shift;
            $scope.shiftEndBtnDisable = false;
            $scope.usedIngredients = [];
            shiftService.setShiftOn();
            $scope.isShiftOn = shiftService.getShifOn();
        }

        $scope.getIngredients = function (pizzas) {
            for (var i = 0; i < pizzas.length; i++) {
                var ingredients = pizzas[i].PizzaIngredients;
                for (var j = 0; j < ingredients.length; j++) {
                    shiftService.addIngredients(ingredients[j].IngredientId, ingredients[j].Count);
                }
            }
        }
    }
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.controller("shiftController", ["$scope", "shiftService", "ingredientService", callback]);
})();