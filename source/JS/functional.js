var Functional = (function () {
    function Animal(name) {
        var currentObject = {};
        currentObject.name = name;
        currentObject.walking = function () {
            console.log(currentObject.name + " is walking");
        }
    }

    function Rabbit(name) {
        var currentObject = Animal(name);
        return currentObject;
    }

    function Fish(name) {
        var currentObject = Animal(name);
        return currentObject;
    }

    function Carp(name) {
        var currentObject = Fish(name);
        return currentObject;
    }
 })();