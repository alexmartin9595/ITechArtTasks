$(document).ready(function () {
    $('button').click(function () {		
        $('body').block();
    });
	
	var params = {
		delay: 10000
	}
	
	$('input').focus(function () {		
        $('body').block(params);
    });
});