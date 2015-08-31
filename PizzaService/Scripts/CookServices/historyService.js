(function () {
    "use strict";
    var restaurantApp = angular.module("restaurantApp");
    restaurantApp.service("historyService", function () {
        var done = [];

        this.getDone = function () {
            return done;
        }

        this.addDone = function (pizza) {
            done.push(pizza);
        }

        var deleted = [];

        this.getDeleted = function () {
            return deleted;
        }

        this.addDeleted = function (pizza) {
            deleted.push(pizza);
        }

    });
})();