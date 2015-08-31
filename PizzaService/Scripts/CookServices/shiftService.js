(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("shiftService", ["$http", function ($http) {
        var doneOnShift = [];

        this.shifts = [];
        var shift = null;

        this.takeShifts = function() {
            return  $http.get("/Home/GetAllShifts");
        }

        this.getDoneOnShift = function () {
            return doneOnShift;
        }

        this.getShift = function () {
            if (shift == null) {
                if (this.shifts.length > 0) {
                    shift = this.shifts[0];
                }
            }
            return shift;
        }

        var isShiftOn = false;

        this.getShifOn = function () {
            return isShiftOn;
        }

        this.setShiftOn = function () {
            isShiftOn = true;
        }

        var usedIngredients = [];

        this.getUsedIngredients = function () {


            var usedId = [];
            for (var i = 0; i < usedIngredients.length; i++) {
                usedId.push(usedIngredients[i].id);
            }
            if (usedId.length == 0) {
                return null;
            }
            return $http({
                url: "/Home/GetIngredientsNameByIds",
                method: "GET",
                params: { ids: usedId }
            });

        }

        this.getUsedIngredientsCount = function() {
            return usedIngredients;
        }

        this.nextShift = function (currentShift) {
            isShiftOn = false;
            for (var i = 0; i < this.shifts.length; i++) {
                if (currentShift.Id === this.shifts[i].Id) {
                    if (i == this.shifts.length - 1) {
                        shift = this.shifts[0];
                        doneOnShift = [];
                        usedIngredients = [];
                        return;
                    }
                    else {
                        shift = this.shifts[i + 1];
                        doneOnShift = [];
                        usedIngredients = [];
                        return;
                    }
                }
            }
            return null;
        }

        this.addDone = function (pizza) {
            doneOnShift.push(pizza);
        }

        this.addIngredients = function (ingredientId, count) {
            for (var i = 0; i < usedIngredients.length; i++) {
                if (ingredientId == usedIngredients[i].id) {
                    usedIngredients[i].count += count;
                    return;
                }
            }
            usedIngredients.push({ id: ingredientId, count: count });
        }

    }]);
})();