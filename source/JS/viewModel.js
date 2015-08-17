DishViewModel = (function () {
	'use strict';       
    
    function dishViewModel() {
        
        var self = this;
        
        self.dishes = DishModel.data;
        
        self.userDishes = ko.observableArray("");
        
        self.orderedItem = function (name, price) {       
            var self = this;    
            self.name = name;
            self.price = price;
            self.count = ko.observable(1);
            self.incrementCount = function () {
                self.count(self.count() + 1);
            }
            
            self.decrementCount = function () {
                self.count(self.count() - 1);
            }
            
        }                           

        self.findDishIndex = function (dish) {
            for (var i = 0; i < self.userDishes().length; i++) {
                if (dish.name === self.userDishes()[i].name)
                    return i;
            }
            return -1;
        }

        self.rewoveUserDish = function (userDish) {           
            if (userDish.count() > 1) 
                userDish.decrementCount();            
            else                           
                self.userDishes.remove(userDish);               
          
        }

        self.addDish = function (dish) {
            var currentIndex = self.findDishIndex(dish);
           
            if (currentIndex === -1) {
                self.userDishes.push(new self.orderedItem(dish.name, dish.price));
                return;
            }                                     
            self.userDishes()[currentIndex].incrementCount();
        }

        self.clearOrder = function () {
            for (var i = 0; i < self.userDishes().length; i++) {
                self.userDishes()[i].count(0);
            }
            self.userDishes.removeAll();
        }
        
        self.watchOrder = function () {
            $('.user-choice').bPopup();
        }

        self.fullSum = ko.computed(function () {
            var sum = 0;
            for (var i = 0; i < self.userDishes().length; i++) {
                sum += self.userDishes()[i].price * self.userDishes()[i].count();
            }
            return sum;
        }, self);
        
        self.succesCallback = function () {
            bootbox.alert("Your order is successfully confirmed");
        }  
        
        self.errorCallback = function () { 
            bootbox.alert("Your order wasn't confirmed");
        }  
        
        self.confirmationCallback = function (callback) {
                var randomValue = Math.floor(Math.random() * (9 - 0 + 1));
                if (randomValue === 0)                    
                    return false;                                  
                else                   
                    return true;                
        }           
        
        self.confirmOrder = function () {
            if (self.confirmationCallback) {
                self.clearOrder();
                $('.mainwrapper').block(self.succesCallback);
            }
            else 
                $('.mainwrapper').block(self.errorCallback);
        }
    }
    
    
    ko.applyBindings(new dishViewModel());
})();