$(document).ready(function() {
	$('.publications_items').mousemove(function(event) {
		var scroller_offset = event.pageX - 25;
		var scroller_width = $(document).width() - 60;

		$(this).scrollLeft(event.pageX * 1.7);
		if (scroller_offset >= 5 && scroller_offset <= scroller_width)
			$('.pub_scroller').css('margin-left', event.pageX - 32)
	});
});