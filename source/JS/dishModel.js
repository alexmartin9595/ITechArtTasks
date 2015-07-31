var DishModel = (function () {
    var Dish = function (name, price, photo, rate) {
        this.name = ko.observable(name);
        this.price = ko.observable(price);
        this.photo = ko.observable(photo);
        this.rate = ko.observable(rate);
        this.count = ko.observable(0);
    }    

    return {
        Dish: Dish
    }
})();