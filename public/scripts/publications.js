$(document).ready(function() {
	$('.publications_items').mousemove(function(event) {
		$(this).scrollLeft(event.pageX * 1.57);
	});
});