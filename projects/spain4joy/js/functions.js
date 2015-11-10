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
	$('.main-slider').bxSlider({
		mode: 'fade',
		pager: false,
		controls: false,
		auto: true
	});
	
	$('.offers-carousel').bxSlider({
		pager: false,
		minSlides: 1,
		maxSlides: 6,
		slideWidth: 140,
		slideMargin: 18,
		moveSlides: 1,
		auto: true,
		autoHover: true
	});
	
	$('body').on('click', '.lastminute-offers .custom-prev', function(e){
		$('.lastminute-offers .bx-prev').trigger('click');
		e.preventDefault();
	})
	
	$('body').on('click', '.lastminute-offers .custom-next', function(e){
		$('.lastminute-offers .bx-next').trigger('click');
		e.preventDefault();
	})
	
	$('.pairs-carousel').bxSlider({
		pager: false,
		minSlides: 1,
		maxSlides: 6,
		slideWidth: 180,
		slideMargin: 12,
		moveSlides: 1,
		autoHover: true
	});
	
	$('body').on('click', '.pairs-carousel-wrap .custom-prev', function(e){
		$('.pairs-carousel-wrap .bx-prev').trigger('click');
		e.preventDefault();
	})
	
	$('body').on('click', '.pairs-carousel-wrap .custom-next', function(e){
		$('.pairs-carousel-wrap .bx-next').trigger('click');
		e.preventDefault();
	})
	
	//preview-carousel
	$('.preview-carousel').bxSlider({
		mode: 'vertical',
		pager: false,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 104,
		moveSlides: 1,
		hideControlOnEnd: true,
		infiniteLoop: false
	});
	
	$('.preview-carousel li a').on('click',function(e) {
		var cur = $(this);
		var cur_img = cur.attr('href');
		var parent = $('.object-img');
		parent.find('img').attr('src',cur_img);
		e.preventDefault();
	});
	
	$('.object-img a').on('click',function(e) {
		var cur = $(this);
		var cur_img = cur.find('img').attr('src');
		var parent = $('.preview-carousel');
		var images = [];
		images.push(cur_img);
		parent.find('a').each(function() {
			var cur_item = $(this);
			if ( cur_item.attr('href') != cur_img ) 
				images.push(cur_item.attr('href'));
		});
		$.fancybox.open(images, {
			wrapCSS : 'gallery-object-style',
			openEffect: 'none',
			closeEffect: 'none'
		});
		e.preventDefault();
	});
	
	$('.promo-slider').bxSlider({
		controls: false
		// auto: true
	});
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
		weekHeader: 'Нед',
		dateFormat: 'dd.mm.yy',
		firstDay: 6,
		showOtherMonths: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
	$('.datepicker').datepicker({
		altField: ".date-today",
		autoSize: true,
		altFormat: "d MM yy"
	});
	// var widget = $( '.datepicker input[type="text"]').datepicker( "widget" );
}
/* datepicker End */

/* Fancybox */
function fancybox(){
	var popupCallback = $(".callback");
	if (popupCallback.length) {
		popupCallback.fancybox({
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none'
		});
	}
}
/* Fancybox End */

/* searchOpen */
function searchOpen(){
	var btnOpener = $('.filter-opener>a');
	var btnCloser = $('.filter-closer>a');
	
	btnOpener.on('click', function(e){
		var cur = $(this);
		var curWrap = cur.parents('.filter-search');
		curWrap.find('.tabs').slideDown('slow');
		setTimeout(function(){
			curWrap.removeClass('minimized');
		}, 1000)
		cur.parent().fadeOut('slow');
		curWrap.find('.filter-closer').fadeIn('slow');
		$('select.cselect').multiselect("refresh");
		e.preventDefault();
	})
	
	btnCloser.on('click', function(e){
		var cur = $(this);
		var curWrap = cur.parents('.filter-search');
		curWrap.find('.tabs').slideUp();
		setTimeout(function(){
			curWrap.addClass('minimized');
		}, 1000)
		curWrap.find('.filter-opener').fadeIn();
		cur.parent().fadeOut();
		e.preventDefault();
	})
}
/* searchOpen End */

/* tabs */
function tabs(){
	var tabWrap = $('.tabs-wrap');
	tabWrap.each(function(){
		var thisTabWrap = $(this);
		// for active overlay
		var tabsetWrap = $('.tab-controls-wrap');
		var activeState = $('.tab-active');
		
		var tabControl = thisTabWrap.find('.tab-controls');
		var controlItem = tabControl.find('a');
		var itemControl = tabControl.find('li.active').index();
		var tabsWrap = thisTabWrap.find('.tabs');
		var tab = tabsWrap.find('.tab');
				
		// position active tab
		var positionThis = $('.filter-search').find('li.active a').position().left;
		$('.tab-active').css({
			left: positionThis
		});
				
		tab.eq(itemControl).fadeIn(0).siblings().fadeOut(0);
		//if(thisTabWrap.parents('.filter-search').hasClass('minimized')) {
			controlItem.on('click', function(e){
				var $this = $(this);
				var thishParents = $this.parents('.filter-search');
				
				// open search area (tabs), if it is closed
				if(thisTabWrap.parents('.filter-search').hasClass('minimized')) {
					tabsWrap.slideDown('slow');
					setTimeout(function(){
						thishParents.removeClass('minimized');
					}, 1000)
					thishParents.find('.filter-opener').fadeOut('slow');
					thishParents.find('.filter-closer').fadeIn('slow');
				}
				
				// position active tab
				var positionThis = $this.position().left;
				
				var index = $this.parents('li').index();
				$this.parents('li').addClass('active').siblings().removeClass('active');
				tab.fadeOut(0).eq(index).fadeIn(300).animate('height');
				
				// transfer position active tab to overlay
				$this.closest('.tabs-wrap').find('.tab-active').animate({
					left: positionThis
				}, 300);
				$('select.cselect').multiselect("refresh");
				e.preventDefault();
			});
	});
}
/* tabs end */

/* UI Multiselect */
function customSelect(){	
	/*.bselect first type*/	
	var selFst = $(".cselect");	
	if (selFst.length){	
		/*placeholder fade delay*/
		var placeholderDelay = 0;
		/*placeholder fade delay end*/
		$(selFst).multiselect({
			multiple: false,
			header:true,
			selectedList: 1,
			minWidth:  'auto',
			height: 'auto',
			position: {
				my: 'left top+2',
				at: 'left bottom-2',
				collision: "flip flip"
			},
			create: function(event, ui){
				var bt = $(this).multiselect("getButton");
				/*placeholder html*/
				bt.prepend('<span class="select-placeholder"><span></span></span>')
				/*placeholder html end*/
				
				bt.children().wrapAll('<span class="select-bt-wrap"></span>');
				
				/*button divider html*/
				bt.find('.select-bt-wrap').append('<span class="divider"></span>');
				/*button divider html end*/
				
				/*placeholder handler*/
				var placTxt = bt.find('.select-placeholder span');
				if ($(this).is('[data-placeholder]') ){
					placTxt.html($(this).attr('data-placeholder'));
					bt.find('.ui-select-value').css({'visibility':'hidden'});
				}else{
					bt.find('.select-placeholder').hide();
				}
				/*placeholder handler end*/
				
				var widg = $(this).multiselect("widget");
				widg.children().wrapAll('<div class="select-widget-wrap"></div>'); 
				widg.find('.select-widget-wrap').prepend('<span class="corner-dropdown"></span>');
			},
			open: function(event, ui){	
				var bt = $(this).multiselect("getButton");
				var widg = $(this).multiselect("widget");
				/*fix scroll drop list*/
				var list = widg.find('.ui-multiselect-checkboxes');
				var maxH = parseInt(list.css('max-height'));
				if(maxH > parseInt(list.height())){
					list.removeClass('list-fix-scroll');
				}else{
					list.addClass('list-fix-scroll');
				}
				
				var bt_top = bt.offset().top;
				var widg_top = widg.offset().top;
				if ( widg_top < bt_top ) {
					widg.find('.corner-dropdown').addClass('corner-dropdown-top');
				} else {
					widg.find('.corner-dropdown').removeClass('corner-dropdown-top');
				}
				
				/*fix scroll drop list end*/
			},
			beforeclose: function(event, ui){
				var bt = $(this).multiselect("getButton");
				/*placeholder handler close*/
				bt.find('.select-placeholder').fadeOut(placeholderDelay);
				bt.find('.ui-select-value').css({'visibility':'visible'});
				/*placeholder handler close end*/
			}
		});	
	}
	/*.bselect first type end*/	
};
/* UI Multiselect End */

/* checkbox/radiobox */
function checkbox(){
		$('.def-ch, .ui-multiselect-checkboxes input[type="checkbox"]').checkbox({cls:'jquery-checkbox'});
		$('.def-radio').checkbox({cls:'jquery-radiobox'});
}
/* checkbox/radiobox end */

/* slider range */
function sliderRange() {
	var sliderRange = $('.slider-range');
	sliderRange.slider({
		range: true,
		min: 100,
		max: 300000,
		values: [ 30000, 200000 ],
		create: function( event, ui) {
			for (var i = 0; i<2 ; i++ ){
				$(this).find('.ui-slider-handle').eq(i).append('<div class="input-holder">'
												+'<span class="text">'+$(this).slider( "values", i )+'</span>'
													+'<span class="arrow-corner-spiner"></span>'
												+'</div>');
			}
		},
		slide: function( event, ui ) {
			for (var i = 0; i<2 ; i++ ){
				$(this).find('.ui-slider-handle').eq(i).find('.text').html(ui.values[i]);
			}
		}
	});
}
/* slider range end */

/* googleMap */
function googleMap(){
	if ( $('.map').length ){
		var cur = $('.map');
		var left = cur.data('left');
		var right = cur.data('right');
		var zoom = cur.data('zoom');
	// coordinates for placemark
	var markPosition = new google.maps.LatLng(left, right);
	function initialize() {
		// map option
		var mapOptions = {
			zoom: zoom,
			center: new google.maps.LatLng(left, right),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// define google map
		cur = new google.maps.Map(document.getElementById('map'),
		mapOptions);
		// placemark option
		var marker = new google.maps.Marker({
			position: markPosition,
			map: cur,
			title: 'spain4joy'
		});
		var infowindow = new google.maps.InfoWindow();
			infowindow.setContent('<div class="infobox"><h2>Вилла 1698</h2>');
			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}
	// init map
		google.maps.event.addDomListener(window, 'load', initialize);
	}
}

function googleMapOffice(){
	if ( $('.map').length ){
		var map = $('.map');
		var left = map.data('left');
		var right = map.data('right');
		var zoom = map.data('zoom');
	// coordinates for placemark
	var markPosition = new google.maps.LatLng(left, right);
	function initialize() {
		// map option
		var mapOptions = {
			zoom: zoom,
			center: new google.maps.LatLng(left, right),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// define google map
		map = new google.maps.Map(document.getElementById('map-office'),
		mapOptions);
		// placemark option
		var marker = new google.maps.Marker({
			position: markPosition,
			map: map,
			title: 'Spain 4 Joy'
		});
		var infowindow = new google.maps.InfoWindow();
			infowindow.setContent('<div class="infobox"><h2>Spain 4 Joy</h2>'
			+ '<p>г. Москва, ул. Красных октябрят,<br> д.16, офис 711, 7 этаж</p>'
			+ '<p>Телефон: +7 499 256 16 46</p>'
			+ '<p>e-mail: <a href="mailto:info@spain4joy.ru">info@spain4joy.ru</a></p>'
			+ '<p>skype: spain4joy</p>');
			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}
	// init map
		google.maps.event.addDomListener(window, 'load', initialize);
	}
}
/* googleMap end */

/* nav fixed */
function navFixed(){
		var fixedBox = $('.nav-holder').offset().top;
		var vscrtop = $(window).scrollTop();
		if(vscrtop >= fixedBox){
			$('.nav-holder').addClass('fixed');
		}
		else{
			$('.nav-holder').removeClass('fixed');
		}
		$(window).scroll(function(){
			var vscrtop = $(window).scrollTop();
			if(vscrtop >= fixedBox){
				$('.nav-holder').addClass('fixed');
			}
				else{
			$('.nav-holder').removeClass('fixed');
		}
	});
}
/* nav fixed end */

/* validator */
function validator(){
	if ( $('.contact-form').length ) {
		var form = $('.contact-form form');
		form.validate({
			rules: {
				contact_form_email: {
					required: true,
					email: true
				},
				contact_form_message: {
					required: true
				}
			},
			errorClass: "error",
			validClass: "valid",
			highlight: function(element, errorClass, validClass) { 
				$(element).addClass(errorClass).removeClass(validClass);
				$(element).parent('.input-holder').addClass(errorClass);
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass).addClass(validClass);
				$(element).parent('.input-holder').removeClass(errorClass);
			},
			invalidHandler: function(event, validator) {
				var errors = validator.numberOfInvalids();
				if (errors) {
					form.find('.error-message').addClass('error');
					} else {
					form.find('.error-message').removeClass('error');
				}
			}
		});
	}
}
/* validator end */

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
	allSlider();
	datepicker();
	fancybox();
	searchOpen();
	tabs();
	customSelect();
	checkbox();
	sliderRange();
	googleMap();
	googleMapOffice();
	navFixed();
	validator();
});
$(window).load(function(){
	footerBottom();
});