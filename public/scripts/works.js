$(document).ready(function() {
  $('.regions').click(function(event) {
    $('.works_map').hide();
    $('.work_items').show();
  });
  $('.map').click(function(event) {
    $('.work_items').hide();
    $('.works_map').show();
  });
});