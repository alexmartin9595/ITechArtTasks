(function () {
    "use strict"

    function StockController($scope, stockService, stockOrderService) {

        var refreshIngredients = function () {
            stockService.getIngredients().then(function (response) {
                $scope.ingredients = response;
            });
        }

        var reset = function () {
            $scope.newProductFamily = null;
            $scope.newProductKind = null;
            $scope.newProductMinAmount = null;
        }

        refreshIngredients();     

        $scope.refill = function (id) {
            stockOrderService.set(id);
            stockOrderService.showOrderVendors();            
        }

        $scope.removeProduct = function (id) {
            stockService.remove(id).then(function (response) {
                refreshIngredients();
            });
            reset();
        }
        
            $scope.addProduct = function () {
            stockService.add($scope.newProductFamily, $scope.newProductKind, 0,
				$scope.newProductMinAmount).then(function (response) {
				    refreshIngredients();
				});
            reset();
        }
    };

    var app = angular.module("restaurantApp");
    app.controller('StockController', ["$scope", "stockService", "stockOrderService", StockController]);
})();
