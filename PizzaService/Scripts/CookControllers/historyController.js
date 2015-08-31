(function () {
    "use strict";
    function callback($scope, pageService, historyService, ingredientService) {

        $scope.done = historyService.getDone();

        $scope.deleted = historyService.getDeleted();

        $scope.getIngredientById = function (id) {
            //return ingredientService.getIngredientById(id);
        }

        $scope.isShowHistory = function () {
            return !pageService.isHideMain;
        }


    }

    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.controller("historyController", ["$scope", "pageService", "historyService", "ingredientService", callback]);
})();