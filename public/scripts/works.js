$(document).ready(function() {
  $('.regions').click(function(event) {
    $('.works_map').hide();
    $('.work_items').show();
    $('.work_item').css('width', '20%');
    $('.work_img').css('display', 'block');
  });
  $('.list').click(function(event) {
    $('.works_map').hide();
    $('.work_items').show();
    $('.work_item').css('width', '50%');
    $('.work_img').css('display', 'none');
  });
  $('.map').click(function(event) {
    $('.work_items').hide();
    $('.works_map').show();
  });
});