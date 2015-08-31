(function () {
    "use strict"

    function StockItem(family, name, amount, minAmount) {
        this.Family = family;
        this.Name = name;
    }
    

    function StockService($http) {                

        this.getIngredients = function () {
            return $http.get("Home/GetIngredients")
            .then(function (result) {
                return result.data;
            });
        }

        //this.add = function (family, name, amount, minAmount) {
        //    return $http.post("Stock/CreateIngredient", new StockItem(family, name));
        //}

        this.refill = function (orderList) {
            return $http.post("Home/RefillStock/", orderList);
        }

        this.remove = function (id) {
            return $http.post("Home/DeleteIngredient/" + id);
        }     
    };


    var app = angular.module("restaurantApp");
    app.factory("stockService", ["$http", function ($http) {
        return new StockService($http);
    }]);
})()