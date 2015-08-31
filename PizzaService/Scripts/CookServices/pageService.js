(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("pageService", function () {
        this.isHideMain = false;

        var page = "history";

        this.changePage = function () {
            this.isHideMain = !this.isHideMain;
            if (page == "history") {
                page = "order";
            }
            else {
                page = "history"
            }
        }

        this.getPage = function () {
            return page;
        }

    });
})();