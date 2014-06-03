$(document).ready(function() {
		var body_size = $('body').width();
		var new_container_count = Math.floor((body_size/185));
		var new_container_size = body_size/new_container_count;

		var $person_container_inner = $('.publication_line_inner');
		var person_container_inner_width = new_container_size*new_container_count;

		var scroll_amount = body_size/4;
		var scroll_amount_border = body_size/8;
		var margin_scroll = 0;
		var margin_scroll3 = 0;
		var delta_scroll;
		var old_event_pageX;
		var margin_index = 1;

		var $person = $('.publication_line_person');
		var $person_container = $('.publications_line');

		$('.grid1').css({'left': (body_size - scroll_amount)});
		$('.grid2').css({'left': scroll_amount});
		$('.grid3').css({'left': (body_size - scroll_amount_border)});
		$('.grid4').css({'left': scroll_amount_border});

		$person.css({'width':new_container_size+'px','display':'inline-block'}).mouseover(function() {
				var active_person = $('.publication_line_person').removeClass('active').eq($(this).index()).addClass('active');
				$('.publication_navigation_scroller').css({'margin-left':active_person.offset().left});
		});

		$person_container.css({'background':'rgba(5, 5, 133, 0.14)'}).mousemove(function(event){
				delta_scroll = event.pageX - old_event_pageX;

				if (delta_scroll > 0) {
							margin_index = -1;
						}
				else if (delta_scroll < 0) {
							margin_index = 1;
						}

				if (event.pageX < (scroll_amount) && margin_index > 0) {
						console.log('<<< '+ margin_scroll + 'delta' + delta_scroll);
						margin_scroll = 5*margin_index;
							if (event.pageX < (scroll_amount_border)) {
									margin_scroll = 20*margin_index;
									console.log('10');
							}
						margin_scroll3 = margin_scroll3 + margin_scroll;
				}
				else if (event.pageX > (body_size - (scroll_amount)) && margin_index < 0) {
						margin_scroll = 5*margin_index;
						console.log('delta' + delta_scroll + ' ' + margin_scroll +' >>>');
								if (event.pageX > (scroll_amount_border)) {
									margin_scroll = 20*margin_index;
									console.log('10');
							}
							margin_scroll3 = margin_scroll3 + margin_scroll;
				}
				old_event_pageX = event.pageX;

						console.log('margin_scroll3 '+margin_scroll3);
						$person_container_inner.css({'margin-left':margin_scroll3});

		});
});