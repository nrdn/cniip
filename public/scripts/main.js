$(document).ready(function() {
	$('img[usemap]').rwdImageMaps();
	$('.maps').on({
	    mouseout: function() {
	        var index = $(this).index();
	        $('.map_item').eq(index).css('z-index', 0);
	    },
	    mouseover: function() {
	        var index = $(this).index();
	        $('.map_item').eq(index).css('z-index', 1);
	    }
	});
});