(function () {
    "use strict"

    function StockOrderController($scope, stockOrderService, vendorsService, stockService) {

        var refreshCart = function () {
            stockOrderService.getOrderList().then(function (result) {
                $scope.orderList = result;
            })
        }

        var refreshIngredients = function () {
            stockService.getIngredients().then(function (response) {
                $scope.ingredients = response;
            });
        }

        var refreshSum = function () {
            stockOrderService.getSum().then(function (result) {
                $scope.sum = result;
            })
        }

        $scope.order = stockOrderService.get();
        refreshSum();
        refreshCart();

        $scope.$watch(
			function ($scope) {
			    return $scope.order.data.Id;
			},

			function (value) {
			    $scope.availableVendors = vendorsService.
					getAvailableVendors(value);
			});

        $scope.pickProduct = function (id) {
            stockOrderService.pickProduct(id).then(function (response) {
                refreshCart();
                refreshSum();
            });
        }

        $scope.removeProduct = function (id) {
            stockOrderService.removeProduct(id).then(function (response) {
                refreshCart();
            });
        }

        $scope.showStory = function () {
            $(".story-popup").bPopup();
        }        

        $scope.confirmSuccess = function () {
            stockService.refill($scope.orderList).then(function (result) {
                refreshIngredients();
            })
            //stockOrderService.confirmOrder();
            //stockService.refill($scope.orderList);
            //$scope.orderList = stockOrderService.getOrderList();
            //$scope.ordersStory = stockOrderService.getOrdersStory();
            $(".success-popup").bPopup();
        }

        $scope.confirmError = function () {
            $(".error-popup").bPopup();
        }

        ///request here
        $scope.confirmOrder = function (success, error) {

            if ($(".wrapper").block(
				function () {
					return (Math.random() * 10) > 5;
            }))
                success();

            else
                error();
        }
    };

    var app = angular.module("restaurantApp");
    app.controller("stockOrderController", ["$scope", "stockOrderService", "vendorsService", "stockService", StockOrderController]);
})();