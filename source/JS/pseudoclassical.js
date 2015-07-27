var Pseudoclassical = (function () {
    function extend(childObject, parentObject) {
        var currentObject = function () { };
        currentObject.prototype = parentObject.prototype;
        childObject.prototype = currentObject();
        childObject.prototype.constructor = childObject;
        childObject.superclass = parentObject.prototype;
    }

    function Animal (name) {
        this.name = name;        
    }

    Animal.prototype = {
        constructor: Animal,
        canWalk: false,
        walk: function () { 
            console.log(this.name + " is walking");
        }
    }

    function Rabbit(name) {
        this.name = name;
    }

    Rabbit.prototype = {
        run: function (speed) {
            console.log(this.name + " is running with the speed " + speed);
        }
    }

    extend(Rabbit, Animal);

    function Fish(name) {
        this.name = name;        
    }

    Fish.prototype = {
        float: function (speed) {
            console.log(this.name + " is floating with the speed " + speed);
        },
        walk: function () {
            console.log(this.name + " is not walking");
        }
    }

    extend(Fish, Animal);

    function Carp(name) {
        this.name = name;
    }

    extend(Carp, Fish);

})();