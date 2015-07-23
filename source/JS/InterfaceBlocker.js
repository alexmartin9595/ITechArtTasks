(function ($) {
    $.fn.block = function (text, delay) {
        $(this).each(function () {            
            var block = "<div class='additional-block'></div>";
            $(this).append(block);
            $('.additional-block')
                .append("<img src='../../images/loader.gif'/>")
                .append("<p>" + text + "</p>");
            setTimeout(function () {
                $('.additional-block').remove();
            }, delay);                
        });          
    }
})(jQuery);