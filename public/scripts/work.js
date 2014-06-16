$(document).ready(function() {
	$(document).on('dragstart', function(e) {
		if (e.target.nodeName.toUpperCase() == 'IMG') {
			return false;
		}
	});

	$('.content_block').mapNavigate({
	    speed: 500
	});
});