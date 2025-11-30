$(document).ready(function () {
    var seen = {};
    var imgs = $('.proekt-img-item').filter(function(index, element) {
        var src = $(element).attr('src');
        if (seen[src]) {
            return false; // повтор — исключаем
        } else {
            seen[src] = true; // первое вхождение — запоминаем
            return true;
        }
    });
    console.log(imgs)

    var idimgs = 0;
    if (imgs.length<2){
        $('.prevImg, .nextImg ').css('display', 'none')
    }
    $(document).on('click','.proekt-img-item' , function(){
        idimgs = imgs.toArray().findIndex(function(el) {
            return $(el).attr("src") === $(this).attr('src');
        });
        console.log(idimgs,$(this).attr('src') )
        $('.modalImg').attr('src', $(this).attr('src'))
        console.log(idimgs)
    })
    $('.prevImg').on('click', function(){
        if (idimgs< imgs.length-1){
            idimgs+=1;
            $('.modalImg').attr('src', $(imgs[idimgs]).attr('src'))
        } else{
            idimgs=0;
            $('.modalImg').attr('src', $(imgs[idimgs]).attr('src'))
        }
    })

    $('.nextImg').on('click', function(){
        if (idimgs> 0){
            idimgs-=1;
            $('.modalImg').attr('src', $(imgs[idimgs]).attr('src'))
        } else{
            idimgs=imgs.length-1;
            $('.modalImg').attr('src', $(imgs[idimgs]).attr('src'))
        }
    })
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