$(document).ready(function () {
    function newcore (){
        if ($(window).width()>992){
            let b = $('.info-block')
            let w = $('.core-info').width() - $('.core-info img.d-lg-block').width()
            b.css('width', w+'px')
        } else {
            ('.info-block').css('width', '100%')
        }
    }


    $(window).on('resize', newcore)
    $('.core-info img').on('load', newcore)

    newcore()

    $('.FAQitem').on('click', function(){
        if ($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('.desk-info').slideUp();
        } else {
            $('.FAQitem').removeClass('active');
            $('.desk-info').slideUp();

            $(this).addClass('active');
            $(this).find('.desk-info').slideDown();
        }
    })
      
});
