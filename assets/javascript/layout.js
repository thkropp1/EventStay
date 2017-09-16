$(document).ready(function() {
  // parallax image js
  $('.parallax').parallax();


  $('.collapsible').collapsible();
});
var options = [{
  selector: '#eventResults',
  offset: 400,
  callback: function(el) {
    Materialize.showStaggeredList($(el));
  }
}, ];
Materialize.scrollFire(options);



//click function to move to anchor element
function scrollToAnchor(aid) {
  var aTag = $("a[name='" + aid + "']");
  $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
}

$("#submit-search").click(function() {
  scrollToAnchor('id3');
});