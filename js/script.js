
////////// STARTING ANIMATION //////////
setTimeout(()=> {
	document.querySelector('.menu').style.transform = "scale(1)"
	for ( let secondLine of document.getElementsByClassName('hero-text-line') ) {
		secondLine.style.transform = "translateY(0)"
	}
	setTimeout(()=> {
		document.querySelector('.hero-text').classList.add('active')
		for ( let line of document.getElementsByClassName('hero-text-line') ) {
			line.style.transitionDelay = "0s"
		}
		setTimeout(()=> {
			document.querySelector('body').classList.add('active')
		}, 1000)
	}, 1000)
}, 100)

////////// SCROLL EVENT LISTENER //////////
window.addEventListener('scroll', ()=> {

	////////// UPDATED VARIABLES //////////
	var scrolled = window.pageYOffset
	var pageHeight = window.innerHeight

	////////// SPINNING MENU //////////
	document.querySelector('.spin-one').style.transform = "rotate("+scrolled / 3.6+"deg)"
	document.querySelector('.spin-two').style.transform = "rotate("+((scrolled / 3.6) * -1)+"deg)"

	////////// SECTION ACTIVE CLASS TOGGLE //////////
	for ( let section of document.getElementsByClassName('section') ) {
		scrolled + pageHeight >= section.offsetTop + 75 ? document.querySelector('main').classList.add(""+section.getAttribute('data-value')+"") : document.querySelector('main').classList.remove(""+section.getAttribute('data-value')+"")
		scrolled + pageHeight >= section.offsetTop + pageHeight / 3 ? section.classList.add('active') : section.classList.remove('active')
	}

	////////// SECTION2 EACH LINE TRIGGER //////////
	if ( document.querySelector('.s2').classList.contains('active') ) {
		let s2ScrollValue = scrolled - (pageHeight / 3)
		if ( s2ScrollValue >= pageHeight ) {
			document.querySelector('.s2-intro').style.opacity = 0
			return false
		} else {
			for ( let article of document.getElementsByClassName('skill') ) {
				s2ScrollValue + 50 > article.offsetTop ? article.classList.add('active') : article.classList.remove('active')
			}
			if ( 1 - (s2ScrollValue / pageHeight ) > 0.95 ) {
				document.querySelector('.s2-intro').style.opacity = 0
			} else {
				document.querySelector('.s2-intro').style.opacity = 1 - (s2ScrollValue / pageHeight)
				// 
				if ( (s2ScrollValue / pageHeight) * 5 >= 2.8 ) {
					return false
				} else {
					document.querySelector('.s2-intro').style.transform = "translateX(-50%) scale("+ (s2ScrollValue / pageHeight) * 5 +")"
					document.querySelector('.s2-intro').style.bottom = ""+s2ScrollValue * 1.5+"px"

				}
			}
		}
	}
	////////// HERO AREA TEXT ANIMATION //////////
	for ( let line of document.getElementsByClassName('line') ) {
		line.style.transition = "0.1s ease-out"
		line.style.transform = "translateX("+(scrolled / line.getAttribute('data-value'))+"px)"
	}

	////////// HERO TEXT OPACITY //////////
	for ( let secondLine of document.getElementsByClassName('second-hero-text-line') ) {
		if ( (scrolled / pageHeight) * 1.5 > 0 && (scrolled / pageHeight) * 1.5 < 1 ) {
			secondLine.style.opacity = (scrolled / pageHeight) * 1.5
		} else { return false }
	}

	////////// END OF SCROLL EVENT //////////
})



////////// MENU CLICK EVENT //////////
document.querySelector('.menu-trigger').onclick = () => {
	for ( let link of document.getElementsByClassName('link') ) {
		if ( link.classList.contains('active') ) {
			link.classList.remove('active')
			document.querySelector('.menu').classList.remove('active')
			setTimeout(()=>{
				link.classList.add('invisible')
			},300)
		} else {
			link.classList.remove('invisible')
			setTimeout(()=>{
				link.classList.add('active')
				document.querySelector('.menu').classList.add('active')
			},1)
		}
	}
}
var string = ""
function request() {
	const request = new XMLHttpRequest();
	var url = "https://cdn.jsdelivr.net/gh/miodragvukovic/cricket/index.html";
	request.open('get', url, true);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200 ) {
			// var data = JSON.parse(request.responseText);
			console.log(request.responseText)
			document.querySelector('.rrr').innerHTML = request.responseText
		}
	}
	request.send();
}
document.querySelector('.bla').addEventListener('click', request)


