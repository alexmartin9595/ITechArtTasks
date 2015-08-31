(function () {
    'use strict';

    var restaurantApp = angular.module('restaurantApp');

    function callback($scope, userService) {

        $scope.getAllUsers = function () {
            userService.getAllUsers().then(function (response) {
                $scope.users = response.data;
            });
        }

        $scope.getAllRoles = function () {
            userService.getAllRoles().then(function (response) {
                $scope.roles = response.data;
            });
        }

        $scope.getAllUsers();
        $scope.getAllRoles();

        $scope.addRole = function () {
            if ($('#role').val() === "")
                bootbox.alert("Incorrect values");
            else {
                var role = {
                    Name: $('#role').val()
                }
                userService.addRole(role).then(function () {
                    $scope.getAllRoles();
                });
                $('.create-role-popup').bPopup().close();
            }
        }

        $scope.deleteRole = function (role) {           
            userService.deleteRole(role).then(function () {
                $scope.getAllRoles();
            });           
        }

        $scope.editUserRole = function () {
            var role = {
                Id: $('#selector option:selected').val(),
                Name: $('#selector option:selected').text()
            }
            var user = {
                Role: role,
                User: $scope.currentUser
            }
            userService.editUserRole(user).then(function () {
                $scope.getAllUsers();
                $scope.getAllRoles();
            });
            $('.edit-role-popup').bPopup().close();
        }

        $scope.showRoleCreator = function () {
            $('.create-role-popup').bPopup({
                follow: [false, false],
                position: [500, 100]
            });
        }

        $scope.showRoleEditor = function (user) {
            $scope.currentUser = user;
            $('.edit-role-popup').bPopup({
                follow: [false, false],
                position: [500, 100]
            });
        }
    }

    restaurantApp.controller('UserController', ['$scope', 'userService', callback]);
})();
