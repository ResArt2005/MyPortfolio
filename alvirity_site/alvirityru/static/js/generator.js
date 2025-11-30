$(document).ready(function () {
     $('#carouselProject').each(function() {
        let loop=true
        let customcenter = true
        if ($(this).hasClass('slider-customcenter')){
                if ($(this).find('a').length > 5){
                $(this).removeClass('slider-customcenter')
            }
            customcenter=false
        }
        $(this).owlCarousel({

            dots: false,

            nav: true,
        
            loop: loop,
            navText: [
                    '<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0007 37.1654C29.2057 37.1654 36.6673 29.7037 36.6673 20.4987C36.6673 11.2937 29.2057 3.83203 20.0007 3.83203C10.7957 3.83203 3.33398 11.2937 3.33398 20.4987C3.33398 29.7037 10.7957 37.1654 20.0007 37.1654Z" stroke="currentColor" stroke-width="3.33333" stroke-linejoin="round"/><path d="M22.5 28L15 20.5L22.5 13" stroke="currentColor" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    '<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9994 3.83463C10.7944 3.83463 3.33269 11.2963 3.33268 20.5013C3.33268 29.7063 10.7943 37.168 19.9993 37.168C29.2043 37.168 36.666 29.7063 36.666 20.5013C36.666 11.2963 29.2044 3.83464 19.9994 3.83463Z" stroke="currentColor" stroke-width="3.33333" stroke-linejoin="round"/><path d="M17.5 13L25 20.5L17.5 28" stroke="currentColor" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                ],
                
            smartSpeed: 400,
            navSpeed: 400,
            dragEndSpeed: 400,
            
            items: 1.3,
        
            margin: 40,
        
            responsive: {
        
            1024: {
        
                items: 3,
                center:customcenter
        
            },
        
            }
        
        });
    });

    $('.phone').inputmask({'mask':"+7(999) 999-99-99"});
    $('.politic, .cross-close-pol').on('click', function(){
        let block = $('.pol-block')
        if (block.hasClass('open')){
            block.removeClass('open');
        } else {
            block.addClass('open');
        }
    });
    let send=false;
    console.log($('#form-ok'))
    $('#autoForm').on('submit', function(e){
         e.preventDefault();
          if (!send){
            send = true
            $.ajax({
            url: '/send-form/',
            method: "POST",
            data: {
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                message: $('#message').val(),
                nameform: "Автоматизированное ведение сообществ в Telegram",
                csrfmiddlewaretoken: $('input[name=csrf_token]').val(),
            },
            success: function (data, textStatus) {
                if (data.status == 'ok') {
                $('#name').val('')
                $('#email').val('')
                $('#phone').val('')
                $('#message').val('')
                let myModal = new bootstrap.Modal(document.getElementById('form-ok'));
                    myModal.show();
                }
                if (data.status == 'error') {
                        var myModal = new bootstrap.Modal(document.getElementById('form-error'));
                        myModal.show();
                }
                send=false
            }
            });
        }
    });

});
