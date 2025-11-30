$(function () {
  $('.first-slider').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 736,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        } 
      }
    ]
  });
  $('.gallery').slick({
    variableWidth: true,
    dots: true,
    responsive: [
      {
        breakpoint: 736,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        } 
      }
    ]
  })
});

$(document).ready(function(){
  $('.logo__btn').click(function() {
    $(this).toggleClass('active')
  })
  
  $('.mobile_menu__close').click(function(){
    $('.logo__btn').toggleClass('active')
  })

  $('.mobile_menu__body > ul > li').click(function(e){
    if (['LI', 'UL'].indexOf(e.target.tagName)) {
      $(this).toggleClass('active')
    }
  })

})
