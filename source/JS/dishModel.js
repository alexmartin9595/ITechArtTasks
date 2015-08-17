var DishModel = (function () {
    // var Dish = function (name, price, photo, rate) {
    //     this.name = ko.observable(name);
    //     this.price = ko.observable(price);
    //     this.photo = ko.observable(photo);
    //     this.rate = ko.observable(rate);
    //     this.count = ko.observable(0);
    // }    

    return {
        data: [
           {name: 'The Ultimate Burger', price: 100000, photo: '../../images/ultimate-burger.jpg', rate: 7},
           {name: 'Italian Steak Frites', price: 120000, photo: '../../images/italian-steak.jpg', rate: 9.6},
           {name:'Grilled Chicken Puttanesca', price:  115000, photo: '../../images/chicken.jpg', rate: 7.8},
           {name: 'Crispy Italian Duck Leg', price:  90000, photo: '../../images/duck-leg.jpg', rate: 9.3},
           {name: 'Steak Au Poivre', price: 95000, photo: '../../images/steak-au-poivre-fi.jpg', rate: 8.9},
           {name: 'Beef Stroganoff', price: 120000, photo: '../../images/beef-stroganoff.jpg', rate: 9.8},
           {name: 'Omelette', price: 70000, photo: '../../images/classic-french-omelet.jpg', rate: 6.8},
           {name: 'Gnocchi Genovese', price: 140000, photo: '../../images/gnocchi.jpg', rate: 9.2},
           {name: 'Penne Carbonara', price: 165000, photo: '../../images/penne-carbonara.jpg', rate: 9.0},
           {name: 'Summer Truffle Risotto', price: 170000, photo: '../../images/risotto.jpg', rate: 9.3},
           {name: 'Fritto Misto', price: 170000, photo: '../../images/fritto-misto.jpg', rate: 8.2},
           {name: 'Superfood Salad', price: 60000, photo: '../../images/superfood-salad.jpg', rate: 7.6},
           {name: 'Roasted Heritage Carrot', price: 135000, photo: '../../images/carrot.jpg', rate: 7.3},
           {name: 'Salmon Salad', price: 130000, photo: '../../images/salmon-salad.jpg', rate: 6.2},
           {name: 'Fresh Crab Spaghetti', price: 90000, photo: '../../images/spaghetti.jpg', rate: 7.2}
        ]
    }
})();