(function () {
    'use strict';

    var restaurantApp = angular.module('restaurantApp');

    function callback($http) {
        
        return {            

            getAllUsers: function () {
                return $http.get("/Home/GetAllUsers");
            },

            getAllRoles: function () {
                return $http.get("/Home/GetAllRoles");
            },

            addRole: function (data) {
                return $http.post("/Home/AddRole", data);
            },

            deleteRole: function (data) {
                return $http.post("/Home/DeleteRole", data);
            },

            editUserRole: function (data) {
                return $http.post("/Home/EditUserRole", data);
            }

        }
    }

    restaurantApp.factory('userService', callback);
})();
