temp = []; print = console.log

function time() {
	var get_time = new Date()
	var hour = get_time.getHours()
	var min = get_time.getMinutes()
	var sec = get_time.getSeconds()
	if (hour.toString().length==1) {hour = '0'+hour}
	if (min.toString().length==1) {min = '0'+min}
	if (sec.toString().length==1) {sec = '0'+sec}
	return hour+":"+min+':'+sec
}
function pcnt(this_num, of_the) { return (100 * this_num) / of_the }

// Require a script into HTML
function require(source) {
	var script = document.createElement('script')
	script.src = source
	document.documentElement.appendChild(script)
}

// Set functions for viewport width size
function vwMatch(minMax_px, func) {
	var mediaQuery = window.matchMedia('screen and ('+minMax_px[0]+'-width: '+minMax_px[1]+'px)')
	if (mediaQuery.matches) {
		if (func instanceof Function) { func() }
		else { print('['+time()+'] vwMatch :: third argument is not a type of <function>') }
	}
}

// Set/change a global CSS variable
function pattern(CSSVar, val) { document.documentElement.style.setProperty('--'+CSSVar, val) }

// Erase all internal data of an element
function wipe(id) {
	if ( document.getElementById(id) ) {
		document.getElementById(id).innerHTML = ''
	} else { print('['+time()+'] wipe :: Element with id <'+id+'> does not exist') }
}

// Remove one or multiple elements
function rm(...ids) {
	ids.forEach(function(id) {
		if ( document.getElementById(id) ) {
			document.getElementById(id).remove()
		} else { print('['+time()+'] rm :: Element with id <'+id+'> does not exist') }
	})
}

// Make one or multiple elements/write data within a specific root body
function mk(root_id, html_or_array) {
	root = document.getElementById(root_id)
	if ( root ) {
		if ( typeof html_or_array === 'object' ) {
			for (var index in html_or_array) {
				root.innerHTML = root.innerHTML + html_or_array[index]
			}
		} else { root.innerHTML = root.innerHTML + html_or_array }
	} else { print('['+time()+'] mk :: Root element with id <'+root_id+'> does not exist') }
}

// Animate an element, optionally add a second animation and set an interval
function a8(id, animation, a8opt, int_opt) {
	var a8em = document.getElementById(id)
	if ( a8em ) {
		if ( !a8opt && !int_opt ) { a8em.style.animation = animation }
		else {
			setInterval( function() { a8em.style.animation = animation }, int_opt )
			setInterval( function() { a8em.style.animation = a8opt }, int_opt*2 )
		}
	} else { print('['+time()+'] a8 :: Element with id <'+id+'> does not exist') }
}
// Add a switch-state expression to an element and assign 2 animations to it
function a8ss(id, a8A, a8B) {
	var a8em = document.getElementById(id)
	if ( a8em ) {
		if ( !a8em.value || a8em.value === 'false' ) {
			a8em.style.animation = a8A
			a8em.value = 'true'
		}
		else if ( a8em.value === 'true' ) {
			a8em.style.animation = a8B
			a8em.value = 'false'
		}
	} else { print('['+time()+'] a8 :: Element with id <'+id+'> does not exist') }
}
// Animate multiple objects on interval
// <str: name> Name for a loop; <int: interval> Execution interval (ms);
// <array: table> Array with element IDs; <str: a8x2> CSS Animations
function a8x(name, interval, table, a8show, a8hide) {
	if (!temp[name+'_i']) { temp[name+'_i'] = -1 } // Set [i] for loop
	if (!temp[name+'Switch']) { temp[name+'Switch'] = true } // Set a switch
	setInterval( function() {
		if ( temp[name+'Switch'] ) {
			if ( temp[name+'_i'] < table.length-1 ) {
				temp[name+'_i']++
				a8(table[ temp[name+'_i'] ], a8hide)
			} else {
				temp[name+'_i'] = table.length
				temp[name+'Switch'] = false
			} // {a, b, c} ex :: (0.hide[init]) -> 1.hide -> 2.hide -> false
		}
		if ( !temp[name+'Switch'] ) {
			if ( temp[name+'_i'] > 0 ) {
				temp[name+'_i']--
				a8(table[ temp[name+'_i'] ], a8show)
			} else {
				temp[name+'_i'] = 0
				temp[name+'Switch'] = true
				a8(table[ temp[name+'_i'] ], a8hide)
			} // {a, b, c} ex :: 2.show -> 1.show -> 0.show -> true -> 0.hide
		}
	}, interval) // P.S: Not gonna debug it, it's already huge and complicated
}

// Add a switch-state expression to an element and assign 2 functions to it
function trig(id, funcON, funcOFF) {
	em = document.getElementById(id)
	if (em) {
		if ( !em.state || em.state === 'OFF' ) {
			funcON()
			em.state = 'ON'
		}
		else if ( em.state === 'ON' ) {
			funcOFF()
			em.state = 'OFF'
		}
	}
	else { print('['+time()+'] trig :: Element with id <'+id+'> does not exist') }
}

// Scroll back to top on call
function scroll_top() { document.body.scrollIntoView() }
// Trigger a function/animation when an element is visible at a certain depth in px
function render(id, depth, func, func_false) {
	if (document.body.scrollTop > (window.innerHeight*depth) || document.documentElement.scrollTop > (window.innerHeight*depth)) {
		if (func instanceof Function) { func() }
		else { document.getElementById(id).style.opacity = 1 }
	}
	else {
		if (func_false instanceof Function) { func_false() }
		else { document.getElementById(id).style.opacity = 0 }
	}
}

// Local function for [#team]
function mbrTap(ind, ref) {
	var id = 'mbr'+ind+'b'
	if (document.getElementById(id)) {
		if (_VER === 'mobile') {
			document.getElementById(id).onclick = function() {
				trig(id,
					function() {
						document.getElementById(id).href = '#nil'
						document.getElementById(id).target = ''
					},
					function() {
						document.getElementById(id).href = ref
						document.getElementById(id).target = '_blank'
					})
			}
		} else {
			document.getElementById(id).href = ref
			document.getElementById(id).target = '_blank'
			document.getElementById(id).onclick = null
		}
	}
}
// Local function for [#partners]
function ptnrTap(ind, ref) {
	var id = 'ptnr'+ind+'i'
	if (_VER === 'mobile') {
		document.getElementById(id).onclick = function() {
			trig(id,
				function() {
					document.getElementById(id).href = '#nil'
					document.getElementById(id).target = ''
				},
				function() {
					document.getElementById(id).href = ref
					document.getElementById(id).target = '_blank'
				})
		}
	} else {
		document.getElementById(id).href = ref
		document.getElementById(id).target = '_blank'
		document.getElementById(id).onclick = null
	}
}
// Local function for [#projects]
function projects(state) {
	if (state === 'show') {
		document.getElementById('projects').style.animation = null
		document.getElementById('projects').style.display = 'flex'
		setTimeout(function(){ document.getElementById('display_main').style.display = 'none'; scroll_top() }, 2000)
	} else if (state === 'hide') {
		document.getElementById('projects').style.animation =  'fadeIn 0.5s linear forwards'
		document.getElementById('display_main').style.display = 'flex'; scroll_top()
		setTimeout(function(){ document.getElementById('projects').style.display = 'none' }, 500)
	}
}

// Initial function, same as 'element.onload()'
_VER = null
function init() {
	var desktop = ['min', '1080'] // 550 / 1080
	var mobile = ['max', '1080']
	
	vwMatch(desktop, function(){
		pattern('fontMain', "300 3vmin 'Source Sans Pro'")
		pattern('fontSub', "200 4vmin 'Raleway'")
		pattern('fontTitle', "400 6vmin 'Raleway'")
		pattern('blockWidth', '44%')
		pattern('blockMargin', '0.5% 3%')
		pattern('gcap', "none")
		
		_VER = 'desktop'; print('@root :: _VER = '+_VER)
		
		mbrTap(1, 'https://vk.com/asvorobyov')
		mbrTap(2, 'https://vk.com/vanya_63')
		mbrTap(3, 'https://vk.com/rodibandit')
		mbrTap(4, 'https://vk.com/loc_carnal')
		mbrTap(5, 'https://vk.com/ahristos')
		mbrTap(6, 'https://vk.com/danikkonovalov')
		mbrTap(7, 'https://vk.com/id189832506')
		mbrTap(8, 'https://t.me/cradle_of_yore')
		mbrTap(9, 'https://vk.com/goocode')
		mbrTap(10, 'https://t.me/d4rasmus')
		
		ptnrTap(1, 'https://www.samregion.ru/')
		ptnrTap(2, 'https://tlt.tpprf.ru/ru/')
		ptnrTap(3, 'https://dolinatlt.ru/')
		ptnrTap(4, 'https://www.tltsu.ru/')
		ptnrTap(5, 'https://legalists.ru/')
		ptnrTap(6, 'https://www.pcofe.ru/')
		ptnrTap(7, 'https://proffaliance.ru/')
		ptnrTap(8, 'https://www.polymatica.ru/')
	})
	
	vwMatch(mobile, function(){
		pattern('fontMain', "300 4vmin 'Source Sans Pro'")
		pattern('fontSub', "200 5vmin 'Raleway'")
		pattern('fontTitle', "400 7vmin 'Raleway'")
		pattern('blockWidth', '90%')
		pattern('blockMargin', '7% 2% 0 2%')
		pattern('gcap', "scale(0.75) translateX(-14vmin)")
		
		_VER = 'mobile'; print('@root :: _VER = '+_VER)
		
		mbrTap(1, 'https://vk.com/asvorobyov')
		mbrTap(2, 'https://vk.com/vanya_63')
		mbrTap(3, 'https://vk.com/rodibandit')
		mbrTap(4, 'https://vk.com/loc_carnal')
		mbrTap(5, 'https://vk.com/ahristos')
		mbrTap(6, 'https://vk.com/danikkonovalov')
		mbrTap(7, 'https://vk.com/id189832506')
		mbrTap(8, 'https://t.me/cradle_of_yore')
		mbrTap(9, 'https://vk.com/goocode')
		mbrTap(10, 'https://t.me/d4rasmus')
		
		ptnrTap(1, 'https://www.samregion.ru/')
		ptnrTap(2, 'https://tlt.tpprf.ru/ru/')
		ptnrTap(3, 'https://dolinatlt.ru/')
		ptnrTap(4, 'https://www.tltsu.ru/')
		ptnrTap(5, 'https://legalists.ru/')
		ptnrTap(6, 'https://www.pcofe.ru/')
		ptnrTap(7, 'https://proffaliance.ru/')
		ptnrTap(8, 'https://www.polymatica.ru/')
	})
	
	vwMatch(['min', '1300'], function(){
		pattern('topFontSize', "2vmin")
		pattern('topEmWidth', '7vmin')
		pattern('topSpacerWidth', '0')
		pattern('topEmMargin', 'auto 0 auto 4vmin')
		pattern('topEmColor', '#fff1')
	})
	vwMatch(['max', '1300'], function(){
		pattern('topFontSize', "4vmin")
		pattern('topEmWidth', '100%')
		pattern('topSpacerWidth', '100%')
		pattern('topEmMargin', '0')
		pattern('topEmColor', '#0000')
	})
}
function assetsInit() {
	for (let i = 1; i < 11; i++) {
		if (document.getElementById('mbr'+i+'a')) {
			document.getElementById('mbr'+i+'a').style.backgroundImage = "url('/static/studio/assets/img/member"+i+".jpg')"
			document.getElementById('mbr'+i+'b').style.backgroundImage = "url('/static/studio/assets/img/member"+i+"art.jpg')"
		}
		if (document.getElementById('ptnr'+i)) {
			document.getElementById('ptnr'+i).style.backgroundImage = "url('/static/studio/assets/logo/partner"+i+".svg')"
		}
	}
}

// Window scroll trigger
window.onscroll = function() {
	render('backToTop', 0.3)
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
	var scrolled = (winScroll / height) * 100;
	document.getElementById("scroll_indicator").style.height = scrolled + "%";
}

// Window resize trigger
window.addEventListener('resize', function(){ init() }, false)
