(function ($) {
    $.fn.block = function (response, params) {
		var defaultParams = {
			text: "Wait please ",
			delay: 100000
		}
		var params = $.extend({}, defaultParams, params);
		
        this.each(function () {            
            var block = "<div class='additional-block'></div>";			
			var self = $(this);
            $('body').append(block);			
			self.hide();
            $('.additional-block')
                .append("<img src='../../images/loader.gif'/>")
                .append("<p>" + params.text + "</p>");
            setTimeout(function () {
				self.show();
				bootbox.alert(response);
                $('.additional-block').remove();				
            }, params.delay);                
        });          
    }
})(jQuery);