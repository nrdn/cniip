$(document ).ready(function() {
  $('.svgblock img').each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');
          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');
          // Replace image with new SVG
          $img.replaceWith($svg);
      }, 'xml');
  });
function svg_hover(event){
		var this_svg_name = $(this).attr('id');
		console.log(this_svg_name);
		var text_link = $('.'+this_svg_name+' li').find('a');
  	console.log(text_link);
	  $.each(text_link, function(){
	  	console.log($(this).attr('href'));
	  	console.log($(this).text());
	  	alert(this_svg_name);
	  	console.log($('.svgblock svg g#'+this_svg_name+' #'+this_svg_name+'-hover').height());
	  	$('.svgblock svg g#'+this_svg_name+'').prepend('<a xlink:href="'+$(this).attr('href')+'"><text x="10" y="20">'+$(this).text()+'</text></a>');
	  })
	 }

 $(document).on('mouseover','.svgblock-container svg g#seventh-block, .svgblock-container svg g#sixth-block, .svgblock-container svg g#fifth-block, .svgblock-container svg g#forth-block, .svgblock-container svg g#third-block, .svgblock-container svg g#second-block, .svgblock-container svg g#first-block', svg_hover);

  $('.header-inner-menu>li').hover(function(event) {
  	var class_attr = $(this).attr('class');


  	$('.svgblock svg g#'+class_attr+' #'+class_attr+'-hover').attr({'fill':'#f8f8f8'});
  	$('.svgblock svg g#'+class_attr+' #'+class_attr+'-hover *').attr('fill','#f8f8f8');
  },
  	function(event) {
  		var class_attr = $(this).attr('class');
  		$('.svgblock svg g#'+class_attr+' #'+class_attr+'-hover').attr('fill','none');
  		$('.svgblock svg g#'+class_attr+' #'+class_attr+'-hover *').attr('fill','none');
  	}
  );
});