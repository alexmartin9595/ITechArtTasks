var Prototypal = (function () {

    var newObject = function (parentObject) {
        var currentObject = function () { };

        currentObject.prototype = parentObject;

        return new currentObject();
    };

    function Animal(name) {
        var animal = {
            name: name,
            walk: function () {
                console.log(this.name + " is walking ");
            }
        }
        animal.constructor = Animal;

        return animal;
    }

    function Rabbit(name) {
        var baseObject = Animal.call(this, name);
        var rabbit = newObject(baseObject);

        rabbit.run = function (speed) {
            console.log(this.name + " is running with the speed " + speed);
        }

        rabbit.constructor = Rabbit;

        return rabbit;
    }    

    function Fish(name) {
        var baseObject = Animal.call(this, name);
        var fish = newObject(baseObject);

        fish.float = function (speed) {
            console.log(this.name + " is floating with the speed " + speed);
        }

        fish.walk = function (speed) {
            console.log("fish doesn't walk");
        }

        fish.constructor = Fish;

        return fish;
    }

    function Carp(name) {
        var baseObject = Fish.call(this, name);
        var carp = newObject(baseObject);

        carp.constructor = Carp;

        return carp;
    }

    return {
        Animal: Animal,
        Rabbit: Rabbit,
        Fish: Fish,
        Carp: Carp
    }
})();