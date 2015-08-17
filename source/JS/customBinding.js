ko.bindingHandlers.bookDish = {
        update: function (element, valueAccessor, allBindings, bindingContext) {
            var value = ko.unwrap(valueAccessor());	
            var duration = allBindings.get('duration') || 400;
            
            for (var i = 0; i < value.length; i++) {
                if (value[i].name === bindingContext.name) {                   
                    $(element).animate({
                        'background-color': "#d3d3d3",
                        'color': "#000000",
                        'opacity': '1'
                    }, duration);
                    return;
                }              							
            }      
            $(element).animate({
                'background-color': "#252525",
                'color': "#ffffff",
                'opacity': '0.9'
            }, duration);                                 
        }
    }        