(function () {
    "use strict";

    function StockOrderService($http) {

        var order = { data: {} };

        this.get = function () {
            return order;
        }

        this.set = function (id) {
            $http.get("/Home/GetIngredientById/" + id)
                .then(function (result) {
                    order.data = result.data;
                });
        }

        this.getSum = function () {
            return $http.get("/Home/GetCartIngredientsSum/").then(function (result) {
                return result.data;
            });
        }


        this.getOrderList = function () {
            return $http.get("/Home/GetCartIngredients/").then(function (result) {
                return result.data;
            })
        }

        this.getOrdersStory = function () {

        }

        this.pickProduct = function (id) {
            return $http.post("/Home/AddToCart/" + id).then(function (response) {
                return response;
            });
        }

        this.removeProduct = function (name, vendor) {
            return $http.post("/Home/DeleteFromCart/" + id).then(function (response) {
                return response;
            });
        }

        this.confirmOrder = function () {

        }

        this.showOrderVendors = function () {
            $(".available-vendors").bPopup();
        }
    }


    var app = angular.module("restaurantApp");
    app.factory("stockOrderService", ["$http", function ($http) {
        return new StockOrderService($http);
    }])
})();