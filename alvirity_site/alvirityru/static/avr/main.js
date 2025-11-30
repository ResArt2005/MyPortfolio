temp = []; assets = []; i_lang = -1; lang_list = ['ru', 'en']

function emi(id) { if (document.getElementById(id)) { return document.getElementById(id) } }

function percent(this_num, of_the) { return Math.round((100 * this_num) / of_the) }

function print(...msg) {

  var em = emi("log")

  msg.forEach(function (message) {

    if (em) {

      em.innerHTML = em.innerHTML + '[' + time() + '] ' + message

      em.appendChild(document.createElement('br'))

    }

    console.log('[' + time() + '] ' + message)

  })

}

function log(msg, lvl) {

  var em = emi("log")

  var levels = ['userdata', 'info', 'warning', 'error', 'crash']

  if (em) {

    em.innerHTML = em.innerHTML + '[' + time() + '] <@' + levels[lvl || 0] + '> ' + msg

    em.appendChild(document.createElement('br'))

  }

  console.log('[' + time() + '] <@' + levels[lvl || 0] + '> ' + msg)

}

function time() {

  var get_time = new Date()

  var hour = get_time.getHours()

  var min = get_time.getMinutes()

  var sec = get_time.getSeconds()

  if (hour.toString().length == 1) { hour = '0' + hour }

  if (min.toString().length == 1) { min = '0' + min }

  if (sec.toString().length == 1) { sec = '0' + sec }

  return hour + ":" + min + ':' + sec

}

function fullscreen() {

  var em = document.body

  if (!em.fs || em.fs === 'false') {

    if (em.requestFullscreen) { em.requestFullscreen() }

    else if (em.webkitRequestFullscreen) { em.webkitRequestFullscreen() }

    else if (em.msRequestFullscreen) { em.msRequestFullscreen() }

    em.fs = 'true'

  }

  else if (em.fs === 'true') {

    if (document.exitFullscreen) { document.exitFullscreen() }

    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }

    else if (document.msExitFullscreen) { document.msExitFullscreen() }

    em.fs = 'false'

  }

}





// Set/change CSS variable

function pattern(CSSVar, val) { document.documentElement.style.setProperty('--' + CSSVar, val) }

// Set functions for device type

function vport(func_desktop, func_mobile) {

  let h = window.innerHeight

  let w = window.innerWidth

  if (percent(h, w) > 100) { func_mobile() }

  else { func_desktop() }

}

// Remove one or multiple elements

function rm(...ids) {

  ids.forEach(function (id) {

    if (emi(id)) {

      emi(id).remove()

    } else { log('rm :: Element with id [' + id + '] does not exist', 1) }

  })

}

// Make one or multiple elements/write data within a specific root body

function mk(root_id, html_or_array) {

  root = emi(root_id)

  if (root) {

    if (typeof html_or_array === 'object') {

      for (var index in html_or_array) {

        root.innerHTML = root.innerHTML + html_or_array[index]

      }

    } else { root.innerHTML = root.innerHTML + html_or_array }

  } else { log('mk :: Root element with id [' + root_id + '] does not exist', 1) }

}



function scroll_top(id) {

  if (id) { emi(id).scrollTop = 0 }

  else { document.body.scrollIntoView() }

}

function render() {

  var scr = document.querySelectorAll(".scr");

  for (var i = 0; i < scr.length; i++) {

    /* var windowHeight = window.innerHeight;

    var elementTop = scr[i].getBoundingClientRect().top;

    var elementVisible = 150; */

    /* if (elementTop < windowHeight - elementVisible) { */ 

    scr[i].classList.add("rend"); scr[i].style.opacity = 1;

    /* } */

    /* else {

      scr[i].classList.remove("rend"); scr[i].style.opacity = 0;

    } */

  }

}



function slide(id, dir, _init) {

  // Create [slides] and slides[id] arrays if they doesn't exist

  if (typeof slides == 'undefined') { slides = {} }

  if (!slides[id] && _init) { slides[id] = []; for (let i = 0; i < (_init + 1); i++) { slides[id].push(i) } }

  if (dir == 'R') { // Change class for this [id] and switch to next

    if (emi(id + slides[id][0])) {

      emi(id + slides[id][0]).classList.remove("slide", "slideR", "slideL")

      emi(id + slides[id][0]).style.animation = null

      emi(id + slides[id][0]).classList.add("slided")

    }

    slides[id][0] = slides[id][0] + 1

    if (emi(id + slides[id][0])) { // Change class for the new [id]

      emi(id + slides[id][0]).classList.remove("slided")

      emi(id + slides[id][0]).classList.add("slide", "slideR")

    } else { // If next [id] doesn't exist, set index to 1 and change class

      slides[id][0] = 1

      emi(id + slides[id][0]).classList.remove("slided")

      emi(id + slides[id][0]).classList.add("slide", "slideR")

    }

  }

  if (dir == 'L') { // Change class for this [id] and switch to previous

    if (emi(id + slides[id][0])) {

      emi(id + slides[id][0]).classList.remove("slide", "slideL", "slideR")

      emi(id + slides[id][0]).style.animation = null

      emi(id + slides[id][0]).classList.add("slided")

    }

    slides[id][0] = slides[id][0] - 1

    if (emi(id + slides[id][0])) { // Change class for the new [id]

      emi(id + slides[id][0]).classList.remove("slided")

      emi(id + slides[id][0]).classList.add("slide", "slideL")

    } else { // If previous [id] doesn't exist, set index to [max] and change class

      slides[id][0] = (slides[id].length - 1)

      emi(id + slides[id][0]).classList.remove("slided")

      emi(id + slides[id][0]).classList.add("slide", "slideL")

    }

  }

  // Check if [id] with [dir] index exists and change classes for this and selected [id]

  if (typeof dir == 'number' && emi(id + dir)) {

    if (emi(id + slides[id][0])) {

      emi(id + slides[id][0]).classList.remove("slide", "slideR", "slideL")

      emi(id + slides[id][0]).style.animation = null

      emi(id + slides[id][0]).classList.add("slided")

    }

    slides[id][0] = dir

    emi(id + slides[id][0]).classList.remove("slided")

    emi(id + slides[id][0]).classList.add("slide")

  }

}



function init() {

  vport(

    function () { //desktop

      pattern('fontMain', "400 2.6vmin 'Montserrat'")

      pattern('fontTitle', "500 4.5vmin 'Montserrat'")

      pattern('fontSub', "200 3.5vmin 'Montserrat'")

    },

    function () { // mobile

      pattern('fontMain', "400 3.4vmin 'Montserrat'")

      pattern('fontTitle', "500 4.8vmin 'Montserrat'")

      pattern('fontSub', "200 3.8vmin 'Montserrat'")

    }

  )

  /*qr-code*/

  $('.open_qr').click(function () {

    $('.qr_block').show();

    $('body').css({ 'overflow-y': 'hidden' })

  })

  $(document).click(function (event) {

    if ($(event.target).closest(".qr_sector").length || $(event.target).closest(".open_qr").length) {

      // клик внутри элемента

      return;

    }

    // клик снаружи элемента

    $(".qr_block").hide();

    $('body').css({ 'overflow-y': 'auto' });

  });

}



// Window events

window.addEventListener('resize', function () { init() }, false)

window.addEventListener("scroll", render); render()

setInterval(function () { slide('bx', 'R'); slide('bs', 'R') }, 5000)

/*Soft scroll*/

$("#foo10").click(function() {

  $('html, body').animate({

      scrollTop: $("#top").offset().top

  }, 2000);

});
