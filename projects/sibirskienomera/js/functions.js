/* inputFocus */
var parentArray = ['.input-holder'];
//inputFocus(parentArray);
function inputFocus(parent){
	var parentSize = parent.length;
	var n = 0;
	for ( n; n < parentSize; n++ ) {
		var obj = parent[n];
		var input = $(obj).find(':text, textarea');
		if ( $(input).length ) {
			$(obj).each(function(){
				$(this).on('click', function(e){
					var thisObj = $(this);
					input = thisObj.find(':text, textarea, :password');
					$(this).addClass('focus');
					$(input).trigger('focus');
					$(input).on('blur', function(){
						thisObj.removeClass('focus');
					});
					e.preventDefault();
				});
			});
		}
	}
}
/* inputFocus end */

/* all sliders */
function allSlider(){
	$('.room-list').bxSlider({
		mode: 'fade',
		pager: false
	});
	
	apartamentSlider = $('.apartament-list').bxSlider({
		minSlides: 2,
		maxSlides: 3,
		slideWidth: 325,
		slideMargin: 15,
		pagerCustom: '.apartament-pager'
	});
	
	$('body').on('click', '.apartament-prev', function(e){
		$('.apartament>.bx-wrapper>.bx-controls .bx-prev').trigger('click');
		e.preventDefault();
	})
	$('body').on('click', '.apartament-next', function(e){
		$('.apartament>.bx-wrapper>.bx-controls .bx-next').trigger('click');
		e.preventDefault();
	})
}
function otherSliders(){
	$('.main-slider').bxSlider({
		adaptiveHeight: true,
		pagerCustom: '.main-slider-pager',
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			$('.slider-description').find('.title-holder').fadeOut(0).html($slideElement.data('title')).fadeIn();
		},
		onSliderLoad: function(currentIndex){
			$('.slider-description').find('.title-holder').html($('.main-slider').find('li:eq('+(currentIndex+1)+')').data('title'));
		},
		auto: true
	});
	
	$('.gallery-albums').bxSlider({
		mode: 'fade',
		pagerCustom: '.albums-pager'
	});
}

function resizeSlider(){
	var windowWidth = $(window).width();
	if (windowWidth <= 1360) {
		$('.apartament').addClass('two-slides');
	} else {
		$('.apartament').removeClass('two-slides');
	}
}
/* all sliders end */

/*add ui position add class*/
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );	
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
};
/*add ui position remove class*/
function removePositionClass(obj){
	obj.removeClass('top');
	obj.removeClass('bottom');
	obj.removeClass('center');
	obj.removeClass('left');
	obj.removeClass('right');
};


function vmiddleBottom(obj){
	$(obj).each(function(){
		var bl = $(this);
		var bl_h = bl.height();
		var img_h = bl.find('img').height();
		var marg = bl_h - img_h;
		bl.find('img').css('margin-top', marg);
	});
}
function vmiddle(obj){
	$(obj).each(function(){
		var bl = $(this);
		var bl_h = bl.height();
		var img_h = bl.find('img').height();
		var marg = (bl_h/2) - (img_h/2);
		bl.find('img').css('margin-top', marg);
	});
}
function vmiddleObject(obj, img){
	$(obj).each(function(){
		var bl = $(this);
		var bl_h = bl.height();
		var img_h = bl.find(img).height();
		var marg = (bl_h/2) - (img_h/2);
		bl.find(img).css('margin-top', marg);
	});
}

/* yandexMap */
function yandexMap(){
	var placemartArray = {
		'stadium': {
			'left': 55.796832,
			'right': 49.099028,
			'title': 'stadium',
			'icon': 'img/balloons/balloon-01.png'
		},
		'museum': {
			'left': 55.798748,
			'right': 49.106189,
			'title': 'museum',
			'icon': 'img/balloons/balloon-02.png'
		},
		'hotel':{
			'left': 55.793014,
			'right': 49.109783,
			'title': 'hotel',
			'icon': 'img/balloons/balloon-03.png'
		}
	}
	if ( $('.map').length ) {
		$('.map').each(function(index){
			var obj = $(this);
			var objIndex = index + 1;
			var className = obj.attr('class');
			obj.attr('id', 'map-'+objIndex);
			var id = obj.attr('id');
			var left = obj.data('left');
			var right = obj.data('right');
			var title_placemark = obj.data('title');
			var zoom = obj.data('zoom');
			ymaps.ready(function () {
				// Create map
				var myMap = new ymaps.Map(id, {
					center: [left, right],
					zoom: zoom
				});
				stadium = new ymaps.Placemark([placemartArray.stadium.left, placemartArray.stadium.right], {
					hintContent: placemartArray.stadium.title,
					help_hint: placemartArray.stadium.title,
					balloonContent: '<div>'+placemartArray.stadium.title+'</div>'
				}, {
					iconImageHref: placemartArray.stadium.icon,
					iconImageSize: [31, 38],
					iconImageOffset: [-16, -37]
				});
				museum = new ymaps.Placemark([placemartArray.museum.left, placemartArray.museum.right], {
					hintContent: placemartArray.museum.title,
					help_hint: placemartArray.museum.title,
					balloonContent: '<div>'+placemartArray.museum.title+'</div>'
				}, {
					iconImageHref: placemartArray.museum.icon,
					iconImageSize: [22, 55],
					iconImageOffset: [-9, -51]
				});
				hotel = new ymaps.Placemark([placemartArray.hotel.left, placemartArray.hotel.right], {
					hintContent: placemartArray.hotel.title,
					help_hint: placemartArray.hotel.title,
					balloonContent: '<div>'+placemartArray.hotel.title+'</div>'
				}, {
					iconImageHref: placemartArray.hotel.icon,
					iconImageSize: [34, 46],
					iconImageOffset: [-16, -46]
				});
				// Add buttons and placemarks
				myMap.geoObjects.add(stadium);
				myMap.geoObjects.add(museum);
				myMap.geoObjects.add(hotel);
			});
			
		});
	}
	
}
/* yandexMap end */

/* datepicker */
function datepicker() {
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3C;Пред',
		nextText: 'След&#x3E;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Нед',
		dateFormat: 'd MM',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
	// $('.datepicker input').datepicker({
		// dateFormat: "d MM"
	// });
	
	$('.date-from').datepicker({
		minDate:0,
		dateFormat: "d MM",
		onClose: function( selectedDate ) {
			if(selectedDate) {
				var maxDate = selectedDate.split('.');
				if (maxDate[1] != 12){
					maxDate[1]++;
				} else {
					maxDate[1] = 1;
					maxDate[2]++;
				}
				maxDate = maxDate.join('.');
				$(this).parents('.date-box').eq(0).find('.date-to').datepicker( 'option', 'minDate', selectedDate );
			}
		}
	});
	
	$('.date-to').datepicker({
		minDate:0,
		dateFormat: "d MM",
		onClose: function( selectedDate ) {
			if(selectedDate) {
				$(this).parents('.date-box').eq(0).find('.date-from').datepicker( 'option','maxDate', selectedDate );
			}
		}
	});
}
/* datepicker End */

/* Fancybox */
function fancybox(){	
	var popup = $('.fancybox-figure');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'fancybox-figure-wrap',
			padding: 0,
			margin: [40, 20, 20, 20],
			openEffect: 'none',
			closeEffect: 'none',
			afterLoad: function() {
				$('.fancybox-figure-wrap').append('<span class="fancybox-figure-corner" />');
			}
		});
		
		$('body').on('click', '.jq-close-popup', function(e){
			$(this).parents('.fancybox-wrap').find('.fancybox-close').trigger('click');
			e.preventDefault();
		})
	}
	
	var popupLarge = $('.fancybox-figure-large');
	if (popupLarge.length) {
		popupLarge.fancybox({
			wrapCSS: 'fancybox-figure-large-wrap',
			padding: 0,
			margin: [40, 20, 20, 20],
			openEffect: 'none',
			closeEffect: 'none',
			afterLoad: function() {
				$('.fancybox-figure-large-wrap').append('<span class="fancybox-figure-large-corner" />');
			}
		});
	}
	
	$('.fancybox-gallery').fancybox({
		wrapCSS: 'fancybox-gallery-wrap',
		padding: 14,
		margin: [40, 20, 20, 20],
		openEffect: 'none',
		closeEffect: 'none'
	});
	
	var fancyAtr = $('.album-list li a').attr('data-fancybox-group', 'photo-gallery').addClass('fancybox-gallery');
}
/* Fancybox End */

/* loadList */
function loadList(){
	$('.jq-show-list').each(function(){
		var list = $(this);
		var showItem = list.data('show-item');
		var slideItem = list.data('slide-item');
		var showItemIndex = showItem - 1;
		list
			.find('li:gt('+showItemIndex+')')
				.hide(0)
					.addClass('hidden');
		list
			.parents('.jq-show-container')
				.find('.jq-show-more')
					.on('click', function(e){
						var toShow = list.find('li.hidden:lt('+slideItem+')');
						toShow.slideDown().removeClass('hidden');
						if ( list.find('li.hidden').length ) {} else {
							$(this).hide(0);
						}
						e.preventDefault();
						equalHeightItem();
		});
	});
}
/* loadList */

/* spinnerMan */
function spinnerMan(){
	$( ".spinner" ).spinner({
		min: 0,
		max: 99
	})
}
/* spinnerMan */

/* showForm */
function showForm(){
	var mainWrap = $('.reservation');
	if (mainWrap.length){
		var opener = mainWrap.find('.switcher-area>a');
		var curWrap = opener.parents('.reservation-switcher');
		var form = mainWrap.find('.reservation-form');
		var formWidth = form.width();
		var closer = mainWrap.find('.reservation-closer>a');
		form.css({
			right: formWidth*-1
		})
		opener.on('click', function(e){
			var curWrapWidth = curWrap.outerWidth();
			curWrap.animate({
				right: curWrapWidth*-1
			}, 200);
			setTimeout(function() {
				form.animate({
					right: 0
				}, 200);
			}, 300);
			e.preventDefault();
		})
		closer.on('click', function(e){
			form.animate({
				right: formWidth*-1
			}, 200);
			setTimeout(function() {
				curWrap.animate({
					right: 0
				}, 200);
			}, 300);
			e.preventDefault();
		});
	}
}
/* showForm end */

/* drop */
function drop(){
	$( '.drop' ).hover(function() {
		$(this).parents('li').addClass('hover');
	}, function () {
		$(this).parents('li').removeClass('hover');
	});
	$('.nav-list>li:last-child').addClass('last-item');
	
	
	$('.sidebar .nav-list>li>a').each(function(){
		var cur = $(this);
		var parent = cur.parent();
		var drop = cur.parent().find('.drop');
		var parentOther = parent.siblings();
		var dropOther = parentOther.find('.drop');
		cur.hover(function(){
			var _this = $(this);
			drop.slideDown(200);
			if(drop.length){
				cur.addClass('open');
			}
			parentOther.filter(':not(.active)').find('.drop').slideUp(200);
			cur.parent().siblings().find('a').removeClass('open');
		});
		parent.mouseleave(function(){
			parent.filter(':not(.active)').find('.drop').slideUp(200);
			cur.removeClass('open');
		});
	})
}
/* drop */

/* equalHeightItem */
function equalHeightItem(){
	// album list
	allH = new Array();
	$('.album-list h4').each(function(i, el){
		allH.push(el);
	});
	$(allH).equalHeight({
		amount : 2,
		useParent: true,
		parent: $('.album-list'),
		resize: true
	});
	
	// rooms list (height for "gallery-room")
	allDescription = new Array();
	$('.rooms-list .gallery-room').each(function(i, el){
		allDescription.push(el);
	});
	$(allDescription).equalHeight({
		amount : 2,
		useParent: true,
		parent: $('.rooms-list'),
		resize: true
	});
	
	// rooms list (height for "room-description")
	allDescription = new Array();
	$('.rooms-list .room-description').each(function(i, el){
		allDescription.push(el);
	});
	$(allDescription, allDescription).equalHeight({
		amount : 2,
		useParent: true,
		parent: $('.rooms-list'),
		resize: true
	});
}
/* equalHeightItem */

/* footer at bottom */
function footerBottom(){
	var footerBox = $('.footer');
	var footerHeight = $('.footer').height();
	var spacerBox = $('.spacer');
	footerBox.css({
		'height': footerHeight,
		'margin-top': -(footerHeight)
	});
	spacerBox.css({
		'height': footerHeight
	});
}
/* footer at bottom end */

/** ready/load/resize document **/

$(document).ready(function(){
	inputFocus($('.input-holder'));
	datepicker();
	yandexMap();
	fancybox();
	loadList();
	spinnerMan();
	resizeSlider();
	showForm();
	drop();
	otherSliders();
});
$(window).load(function(){
	footerBottom();
	allSlider();
	equalHeightItem();
});
$(window).resize(function(){
	resizeSlider();
});