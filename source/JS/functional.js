var Functional = (function () {
    function Animal(name) {
        this.name = name;
        this.walk = function () {
            console.log(this.name + " is walking ");
        }
    }

    function Rabbit(name) {
        Animal.call(this, name);

        this.run = function (speed) {
            console.log(this.name + " is running with the speed " + speed);
        }
    }

    function Fish(name) {
        Animal.call(this, name);

        this.float = function (speed) {
            console.log(this.name + " is floating with the speed " + speed);
        }

        this.walk = function () {
            console.log("fish don't walk");
        }
    }

    function Carp(name) {
        Fish.call(this, name);
    }

    return {
        Animal: Animal,
        Rabbit: Rabbit,
        Fish: Fish,
        Carp: Carp
    }
 })();