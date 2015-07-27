var Prototypal = (function () {
    var animal = {
        name: "",
        walk: function () {
            console.log(this.name + "is walking");
        }
    }

    var rabbit = Object.create(animal, {

    });

    var fish = Object.create(animal, {

    });

    var carp = Object.create(fish, {

    });
})();