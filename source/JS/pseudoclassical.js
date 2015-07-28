var Pseudoclassical = (function () {
    function extend(childObject, parentObject) {
        var currentObject = function () { };

        currentObject.prototype = parentObject.prototype;
        childObject.prototype = new currentObject();
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
        Rabbit.superclass.constructor.apply(this, arguments);
        this.run = function (speed) {
            console.log(this.name + " is running with the speed " + speed);
        }
    }   

    extend(Rabbit, Animal);

    function Fish(name) {
        Fish.superclass.constructor.apply(this, arguments);

        this.walk = function () {
            console.log("fish don't walk");
        }

        this.float = function (speed) {
            console.log(this.name + " is floating with the speed " + speed);
        }
    }

    extend(Fish, Animal);

    function Carp(name) {
        Carp.superclass.constructor.apply(this, arguments);
    }

    extend(Carp, Fish);

    return {
        Animal: Animal,
        Rabbit: Rabbit,
        Fish: Fish,
        Carp: Carp
    }

})();