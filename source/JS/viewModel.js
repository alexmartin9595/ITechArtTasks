DishViewModel = (function () {
    function dishViewModel() {
        var self = this;

        self.dishes = ko.observableArray([
            new DishModel.Dish('The Ultimate Burger', 100000, '../../images/ultimate-burger.jpg', 7),
            new DishModel.Dish('Italian Steak Frites', 120000, '../../images/italian-steak.jpg', 9.6),
            new DishModel.Dish('Grilled Chicken Puttanesca', 115000, '../../images/chicken.jpg', 7.8),
            new DishModel.Dish('Crispy Italian Duck Leg', 90000, '../../images/duck-leg.jpg', 9.3),
            new DishModel.Dish('Steak Au Poivre', 95000, '../../images/steak-au-poivre-fi.jpg', 8.9),
            new DishModel.Dish('Beef Stroganoff', 120000, '../../images/beef-stroganoff.jpg', 9.8),
            new DishModel.Dish('Omelette', 70000, '../../images/classic-french-omelet.jpg', 6.8),
            new DishModel.Dish('Gnocchi Genovese', 140000, '../../images/gnocchi.jpg', 9.2),
            new DishModel.Dish('Penne Carbonara', 165000, '../../images/penne-carbonara.jpg', 9.0),
            new DishModel.Dish('Summer Truffle Risotto', 170000, '../../images/risotto.jpg', 9.3),
            new DishModel.Dish('Fritto Misto', 170000, '../../images/fritto-misto.jpg', 8.2),
            new DishModel.Dish('Superfood Salad', 60000, '../../images/superfood-salad.jpg', 7.6),
            new DishModel.Dish('Roasted Heritage Carrot', 135000, '../../images/carrot.jpg', 7.3),
            new DishModel.Dish('Salmon Salad', 130000, '../../images/salmon-salad.jpg', 6.2),
            new DishModel.Dish('Fresh Crab Spaghetti', 90000, '../../images/spaghetti.jpg', 7.2)
        ]);

        self.userDishes = ko.observableArray("");

        self.findDishIndex = function (dish) {
            for (var i = 0; i < self.userDishes().length; i++) {
                if (dish.name() === self.userDishes()[i].name())
                    return i;
            }
            return -1;
        }

        self.rewoveUserDish = function (dish) {
            var currentIndex = self.findDishIndex(dish),
                currentCount = self.userDishes()[currentIndex].count();

            if (currentCount === 0)
                return;
            if (currentCount === 1) {
                self.userDishes()[currentIndex].count(currentCount - 1);
                self.userDishes.remove(dish);
                return;
            }
            self.userDishes()[currentIndex].count(currentCount - 1);
        }

        self.addDish = function (dish) {
            if (self.findDishIndex(dish) === -1) {
                self.userDishes.push(dish);
            }
            var currentIndex = self.findDishIndex(dish),
                currentCount = self.userDishes()[currentIndex].count();

            self.userDishes()[currentIndex].count(currentCount + 1);
        }

        self.clearOrder = function () {
            for (var i = 0; i < self.dishes().length; i++) {
                self.dishes()[i].count(0);
            }
            self.userDishes.removeAll();
        }

        self.fullSum = ko.computed(function () {
            sum = 0;
            for (i = 0; i < self.userDishes().length; i++) {
                sum += self.userDishes()[i].price() * self.userDishes()[i].count();
            }
            return sum;
        }, self);
    }

    ko.bindingHandlers.bookDish = {
        update: function (element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var duration = allBindings.get('duration') || 400;
            if (ko.unwrap(value))
                $(element).animate({
                    'background-color': "#d3d3d3",
                    'color': "#000000",
                    'opacity': '1'
                }, duration);

            else
                $(element).animate({
                    'background-color': "#252525",
                    'color': "#ffffff",
                    'opacity': '0.9'
                }, duration);
        }
    }

    $('.watch').click(function () {
        $('.user-choice').bPopup();
    });

    $('.confurm').click(function () {
        $('.mainwrapper').block();        
    });

    ko.applyBindings(new dishViewModel());
})();