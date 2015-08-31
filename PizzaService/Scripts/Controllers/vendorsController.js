(function () {
    "use strict"

    function VendorsController($scope, vendorsService) {

        var refreshVendors = function () {
            vendorsService.getVendors().then(function (response) {
                $scope.vendors = response;
            });
        }

        var reset = function () {
            $scope.newVendorName = null;
            $scope.newVendorQuickness = null;
            $scope.newVendorProduct = null;
            $scope.newVendorProductPrice = null;
        }

        refreshVendors();

        $scope.removeVendor = function (id) {
            vendorsService.removeVendor(id).then(function (response) {
                refreshVendors();
            });
        }

        $scope.addVendor = function () {
            vendorsService.addVendor($scope.newVendorName, $scope.newVendorProduct,
            	$scope.newVendorQuickness, $scope.newVendorProductPrice).then(function (response) {
            	    refreshVendors();
            	});
            reset();
        }
    };

    var app = angular.module("restaurantApp");
    app.controller("vendorsController", ["$scope", "vendorsService", VendorsController])
})();