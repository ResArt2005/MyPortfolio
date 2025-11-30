var flag = true;

var selectionCount = document.querySelectorAll(".projects-slider > a").length;

if (selectionCount < 5) {

  flag = false;

  itms = 3;
}

else {

  flag = true;

}
$('.projects-slider').each(function() {
  let loop
  if ($(this).hasClass('slider-loop') || $(this).find('a').length > 5){
    loop = true
  } else {
    loop = false
  }
  let customcenter = true
  if ($(this).hasClass('slider-customcenter')){
    if ($(this).find('a').length > 5){
      $(this).removeClass('slider-customcenter')
    }
    customcenter=false
  }
  $(this).owlCarousel({

    dots: false,
  
    center: true,
  
    loop: loop,
  
    nav: false,
  
    items: 1.4,
  
    margin: 20,
  
    responsive: {
  
      767: {
  
        items: 1.65
  
      },
  
      768: {
  
        items: 3
  
      },
  
      1024: {
  
        items: 3,
        center:customcenter
  
      },
  
      1200: {
  
        items: 5,
        center:customcenter
  
      },
  
      3000: {
  
        items: 6,
        center:customcenter
  
      }
  
    }
  
  });
  
});

//

$('.empoyee-slider').owlCarousel({

  dots: false,

  center: true,

  nav: false,

  margin: 10,

  items: 1.65,

  loop: true,

  responsive: {

    767: {

      items: 1.65

    },

    768: {

      items: 2

    },

    1000: {

      items: 3

    },

    1200: {

      items: 3

    }

  }

});

//

(function ($) {

  var $window = $(window),

    $html = $('.flex-uslugi'), $part = $('.part-mob-ners');

  function resize() {

    if ($window.width() < 768) {

      return $html.addClass('owl-carousel').addClass("flex-uslugi-mob").addClass("owl-theme").removeClass("flexH") && $part.addClass('owl-carousel').addClass("flex-uslugi-mob").addClass("owl-theme");

    }

    $html.removeClass('owl-carousel').removeClass("flex-uslugi-mob").removeClass("owl-theme").addClass("flexH");

    $part.removeClass('owl-carousel').removeClass("flex-uslugi-mob").removeClass("owl-theme");

  }

  $window

    .resize(resize)

    .trigger('resize');

})(jQuery);

//

$('.flex-uslugi-mob').owlCarousel({

  dots: false,

  center: true,

  loop: true,

  nav: false,

  items: 1.65,

  margin: 20,

  responsive: {

    767: {

      items: 1.65

    }

  }

})

//////////

$(".mob-menu-open").click(function () {

  $(".mob-menu-pelena").animate({ left: "0" }, 0);

  $(".mob-menu").animate({ left: "0" }, "slow");

  $(".switch-mob").show("slow");

  $("body").css("overflow-y", "hidden");

});

$(document).click(function (event) {

  if ($(event.target).closest(".full-menu").length || $(event.target).closest(".mob-menu").length || $(event.target).closest(".menu-button").length || $(event.target).closest(".mob-menu-open").length) {

    // клик внутри элемента

    return;

  }

  // клик снаружи элемента

  var $window = $(window);

  if ($window.width() < 768) {

    $(".mob-menu-pelena").animate({ left: "-100vw" }, "slow");

    $(".mob-menu").animate({ left: "-100vw" }, "slow");

    $(".switch-mob").hide("slow");

    $("body").css("overflow-y", "auto");

    $(".pelena").animate({ left: "100vw" }, "slow");

    $(".full-menu").animate({ left: "100vw" }, "slow");

    $("body").css("overflow-y", "auto");

  }

});

$(".cross-close-mob").click(function () {

  $(".mob-menu-pelena").animate({ left: "-100vw" }, 0);

  $(".mob-menu").animate({ left: "-100vw" }, "slow");

  $(".switch-mob").hide("slow");

  $("body").css("overflow-y", "auto");

})

$(".menu-button").click(function () {

  $(".pelena").animate({ left: "0vw" }, 0);

  $(".full-menu").animate({ left: "15vw" }, "slow");

  $("body").css("overflow-y", "hidden");

})

$(".cross-close-main").click(function () {

  $(".pelena").animate({ left: "100vw" }, 0);

  $(".full-menu").animate({ left: "100vw" }, "slow");

  $("body").css("overflow-y", "auto");

})

$('.polityk-conf').click(function () {

  $('.pol-block').animate({ left: '25vw' }, 'slow');

  $("body").css("overflow-y", "hidden");

      $.ajax({
      url: '/politic/',
      method: "GET",
      success: function (data,) {
        if (data.status == 'ok') {
          $('.pol-txt').html(data.result)
        }
      }
    });

  

})

$(".cross-close-pol").click(function () {

  $(".pol-block").animate({ left: "100vw" }, "slow");

  $("body").css("overflow-y", "auto");

})



$('.obj_button').click(function () {

  $('.obj_order').animate({ left: '0' }, "slow");

})





$(document).click(function (event) {

  if ($(event.target).closest(".obj_order .form-style div").length || $(event.target).closest(".pol-block").length || $(event.target).closest(".obj_button").length) {

    // клик внутри элемента

    return;

  }

  // клик снаружи элемента

  $(".obj_order").animate({ left: '100vw' }, "slow");

});

/*slider*/

$('.img-slider').owlCarousel({

  dots: false,

  center: true,

  loop: true,

  nav: false,

  items: 1

})

/*vk-video*/

$('.vktube').click(function () {

  $(".video-hide").show();

})

$(document).click(function (event) {

  if ($(event.target).closest(".vk-frame").length || $(event.target).closest(".vktube").length) {

    // клик внутри элемента

    return;

  }

  // клик снаружи элемента

  $(".video-hide").hide();

  var leg = $('.vk-frame').attr("src");

  $('.vk-frame').attr("src", leg);

});

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {

  anchor.addEventListener('click', function (e) {

    e.preventDefault()



    const blockID = anchor.getAttribute('href').substr(1);



    document.getElementById(blockID).scrollIntoView({

      behavior: 'smooth',

      block: 'start'

    })

  })

}

/*max-height*/

function reHeightPr() {

  var max_col_height = 0; // максимальная высота, первоначально 0

  $('.pr-item').each(function () { // цикл "для каждой из колонок"

    if ($(this).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,

      max_col_height = $(this).height(); // то она сама становится новой максимальной высотой

    }

  });

  $('.pr-item').height(max_col_height); // устанавливаем высоту каждой колонки равной значению максимальной высоты

};

/* Перезагружает страницу */

function reFrashPage() {

  window.setTimeout('location.reload()', 0);

}

var pathname = window.location.pathname;

if ("/proekty/" === pathname) {

  $(window).on("resize", reFrashPage);

}

jQuery(reHeightPr);

$('.bxS').hover(
  function () {
    $(this).closest('.objs_us_page').css('box-shadow', '-8px 8px 0 #bd71eb');
  },
  function () {
    $(this).closest('.objs_us_page').css('box-shadow', 'none');
  }
);
if ($('.pettern-text').length > 0){
  $('.pettern-text').html(function(_, html) {
    return html.replace(/&nbsp;/g, ' ');
  });
}

$('#phone').inputmask({
  mask: "+7 (999) 999 - 99 - 99",
  placeholder: " ",
  showMaskOnHover: false
});
let send = false
$('#messageForm').on('submit', function(e) {
  e.preventDefault(); 
  let er = true
  if ($('#phone').inputmask('unmaskedvalue').length<10){
      $('#phone').focus();
      er=false
  } 
  if ($('#name').val().length<2){
    $('#name').focus();
    er=false
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if ($('#email').val().length<5 || !emailPattern.test($('#email').val())){
    $('#email').focus();
    er=false
  }
  if (er && !send){
    send = true
    $.ajax({
      url: '/send-form/',
      method: "POST",
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        message: $('#message').val(),
        nameform: $('#nameform').val(),
        csrfmiddlewaretoken: $('input[name=csrf_token]').val(),
      },
      success: function (data, textStatus) {
        if (data.status == 'ok') {
          $('#name').val('')
          $('#email').val('')
          $('#phone').val('')
          $('#message').val('')
          $('body').append($('#form-ok'))
          $('#form-ok').modal('show')
        }
        if (data.status == 'error') {
          $('body').append($('#form-error'))
          $('#form-error').modal('show')
        }
        send=false
      }
    });
  }
})
