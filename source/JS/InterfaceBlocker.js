(function ($) {
    $.fn.block = function (params) {
		var defaultParams = {
			text: "Wait, please...",
			delay: 3000
		}
		var params = $.extend({}, defaultParams, params);
		
        this.each(function () {            
            var block = "<div class='additional-block'></div>";			
            $(this).append(block);
            $('.additional-block')
                .append("<img src='../../images/loader.gif'/>")
                .append("<p>" + params.text + "</p>");
            setTimeout(function () {
                $('.additional-block').remove();
            }, params.delay);                
        });          
    }
})(jQuery);