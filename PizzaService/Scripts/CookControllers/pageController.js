(function () {
    "use strict"
    function callback($scope, pageService) {
        $scope.page = pageService.getPage();

        $scope.changePage = function () {
            pageService.changePage();
            $scope.page = pageService.getPage();
        }
        
    }

    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.controller("pageController", ["$scope", "pageService", callback]);
})();