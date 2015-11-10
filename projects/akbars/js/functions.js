/* inputFocus */
var parentArray = ['.input-holder'];
inputFocus = function(parent){
	var parentSize = parent.length;
	var n = 0;
	for ( n; n < parentSize; n++ ) {
		var obj = parent[n];
		var input = $(obj).find(':text, textarea, :password');
		if ( $(input).length ) {
			$(obj).each(function(){
				var el = $(this);
				$(input).on('focus', function(){$(this).parent(obj).addClass('focus');});
				var inputBlur = function(){
					$(input).on('blur', function(){$(this).parent(obj).removeClass('focus');});
				}
				inputBlur();
				el.on('click', function(e){
					var thisObj = $(this);
					input = thisObj.find(':text, textarea, :password');
					$(this).addClass('focus');
					$(input).trigger('focus');
					$(input).on('blur', inputBlur);
				});
			});
		}
	}
}
/* inputFocus end */

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

/* all sliders */
function allSlider(){
	// main slider
	$('.slider-list').bxSlider({
		pager: false
		// auto: true
	});
	$('.news-slider-list').bxSlider({
		pager: false
		// auto: true
	});
	$('.review-slider-list').bxSlider({
		pager: false
		// auto: true
	});
	
	//preview-carousel
	$('.preview-carousel').bxSlider({
		pager: false,
		minSlides: 5,
		maxSlides: 5,
		slideWidth: 46,
		slideMargin: 8,
		moveSlides: 1,
		hideControlOnEnd: true,
		infiniteLoop: false
	});
	$('.preview-carousel li a').on('click',function(e) {
		var cur = $(this);
		cur.addClass('active');
		cur.parent('li').siblings().find('a').removeClass('active');
		var cur_img = cur.attr('href');
		var parent = cur.parents('.object-photo').find('.large-img');
		parent.find('img').attr('src',cur_img);
		e.preventDefault();
	});
	
	$('.object-photo .large-img a').on('click',function(e) {
		var cur = $(this);
		var images = [];
		
		var cur_img = cur.find('img').attr('src');
		var parent = cur.parents('.object-photo').find('.preview-carousel');
		var parent_size = parent.children().length;
		
		var cur_index = parent.find('[href="'+cur_img+'"]').parents('li:eq(0)').index();
		for(var i=cur_index;i<parent_size;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		for(var i=0;i<cur_index;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		$.fancybox.open(images, {
			wrapCSS: 'gallery-object-style'
		});
		e.preventDefault();
	});
	
	//preview-carousel
	
	allbxSlider = new Array();
	var slider = $('.popup-holder .card-preview-list');
	slider.each(function(i, el){
		$(this).attr('data-slider-index',i);
		allbxSlider[i] = $(el).bxSlider({
			pager: false,
			minSlides: 6,
			maxSlides: 6,
			slideWidth: 39,
			slideMargin: 17,
			moveSlides: 1,
			hideControlOnEnd: true,
			infiniteLoop: false
		})
	})
		
	// cardPreviewSlider = $('.card-preview-list').bxSlider({
// 		
	// });
	
	$('.card-preview-list li a').on('click',function(e) {
		var cur = $(this);
		cur.parent('li').addClass('active');
		cur.parent('li').siblings().removeClass('active');
		var cur_img = cur.attr('href');
		var parent = cur.parents('.card-gallery').find('.large-img');
		parent.find('img').attr('src',cur_img);
		e.preventDefault();
	});
	
	$('.card-gallery .large-img a').on('click',function(e) {
		var cur = $(this);
		var images = [];
		
		var cur_img = cur.find('img').attr('src');
		var parent = cur.parents('.card-gallery').find('.card-preview-list');
		var parent_size = parent.children().length;
		
		var cur_index = parent.find('[href="'+cur_img+'"]').parents('li:eq(0)').index();
		for(var i=cur_index;i<parent_size;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		for(var i=0;i<cur_index;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		$.fancybox.open(images, {
			wrapCSS: 'card-gallery-style',
			afterClose: function(){
				setTimeout(function(){
					$.fancybox.open('#card-popup', {
						wrapCSS: 'card-popup-wrap',
						padding: 0,
						openEffect: 'none',
						closeEffect: 'none'
					});
				},0);
			}
		});
		e.preventDefault();
	});
}
/* all sliders end */

/* yandexMap */
function yandexMapMulti(){
	var placemartArray = {
		'object_01': {
			'left': 55.786981,
			'right': 49.188475,
			'title': 'Головной офис',
			'icon': 'img/balloon.png'
		},
		'object_02': {
			'left': 55.81735,
			'right': 49.116646,
			'title': 'Контакты для СМИ и по вопросам сотрудничества',
			'icon': 'img/balloon.png'
		},
		'object_03':{
			'left': 55.752323,
			'right': 49.160852,
			'title': 'Офис продаж',
			'icon': 'img/balloon.png'
		},
		'object_04':{
			'left': 55.732535,
			'right': 49.179465,
			'title': 'Офис продаж',
			'icon': 'img/balloon.png'
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
				
				if(obj.hasClass('map-contacts')){
					var iconSize = [35, 56];
					var iconOffsetValue = [-15, -55];
				} else {
					var iconSize = [24, 38];
					var iconOffsetValue = [-12, -37];
				}
				// Create map
				var myMap = new ymaps.Map(id, {
					center: [left, right],
					zoom: zoom
				});
				object_01 = new ymaps.Placemark([placemartArray.object_01.left, placemartArray.object_01.right], {
					hintContent: placemartArray.object_01.title,
					help_hint: placemartArray.object_01.title,
					balloonContent: '<div>'+placemartArray.object_01.title+'</div>'
				}, {
					iconImageHref: placemartArray.object_01.icon,
					iconImageSize: iconSize,
					iconImageOffset: iconOffsetValue
				});
				object_02 = new ymaps.Placemark([placemartArray.object_02.left, placemartArray.object_02.right], {
					hintContent: placemartArray.object_02.title,
					help_hint: placemartArray.object_02.title,
					balloonContent: '<div>'+placemartArray.object_02.title+'</div>'
				}, {
					iconImageHref: placemartArray.object_02.icon,
					iconImageSize: iconSize,
					iconImageOffset: iconOffsetValue
				});
				object_03 = new ymaps.Placemark([placemartArray.object_03.left, placemartArray.object_03.right], {
					hintContent: placemartArray.object_03.title,
					help_hint: placemartArray.object_03.title,
					balloonContent: '<div>'+placemartArray.object_03.title+'</div>'
				}, {
					iconImageHref: placemartArray.object_03.icon,
					iconImageSize: iconSize,
					iconImageOffset: iconOffsetValue
				});
				object_04 = new ymaps.Placemark([placemartArray.object_04.left, placemartArray.object_04.right], {
					hintContent: placemartArray.object_04.title,
					help_hint: placemartArray.object_04.title,
					balloonContent: '<div>'+placemartArray.object_04.title+'</div>'
				}, {
					iconImageHref: placemartArray.object_04.icon,
					iconImageSize: iconSize,
					iconImageOffset: iconOffsetValue
				});
				// Add buttons and placemarks
				myMap.geoObjects.add(object_01);
				myMap.geoObjects.add(object_02);
				myMap.geoObjects.add(object_03);
				myMap.geoObjects.add(object_04);
			});
			
		});
	}
}
/* yandexMap end */

/* Fancybox */
function fancybox(){
	//popupCalculator
	popupCalculator = $('.calculator-popup');
	if (popupCalculator.length) {
		popupCalculator.fancybox({
			wrapCSS: 'calculator-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none',
			beforeShow: function () {
				$('select.cselect').multiselect("refresh");
			},
			afterShow:function() {
				var popup = $('.mortgage-calculator');
				popup.parents('.fancybox-overlay').css('overflow','auto');
				popup.parents('.calculator-popup-wrap').css('padding-bottom','20px');
				$('html').css({'margin-right':'17px','overflow':'hidden'});
			},
			afterClose:function(){
				$('html').css({'margin-right':'0','overflow':'visible'});
			}
		});
	}
	
	//card popup
	popupCard = $('.card-popup-link');
	if (popupCard.length) {
		popupCard.fancybox({
			wrapCSS: 'card-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none',
			afterShow:function() {
				var popup = $('.card-popup');
				popup.parents('.fancybox-overlay').css('overflow','auto');
				popup.parents('.card-popup-wrap').css('padding-bottom','20px');
				$('html').css({'margin-right':'17px','overflow':'hidden'});
			},
			afterClose:function(){
				$('html').css({'margin-right':'0','overflow':'visible'});
			},
			afterLoad: function(){
				setTimeout(function(){
					var popup = $('.fancybox-overlay .card-popup');
					var slider_index = popup.find('.card-preview-list').attr('data-slider-index');
					allbxSlider[slider_index].reloadSlider();
				}, 100)
			}
		});
		$('.card-popup .calculator-popup-inner').on('click', function(e){
			$('.result-calculation').hide();
			$('.btn-calculate').removeClass('open');
			$(this).parents('.fancybox-wrap').find('.fancybox-close').trigger('click');
			$.fancybox.showLoading();
			setTimeout(function(){
				$.fancybox.hideLoading();
				$.fancybox.open('#calculator-popup',{
					wrapCSS: 'calculator-popup-wrap',
					padding: 0,
					openEffect: 'none',
					closeEffect: 'none',
					beforeShow: function () {
						$('select.cselect').multiselect("refresh");
					},
					afterShow:function() {
						var popup = $('.mortgage-calculator');
						popup.parents('.fancybox-overlay').css('overflow','auto');
						popup.parents('.calculator-popup-wrap').css('padding-bottom','20px');
						$('html').css({'margin-right':'17px','overflow':'hidden'});
					},
					afterClose:function(){
						$('html').css({'margin-right':'0','overflow':'visible'});
					}
				});
			}, 300);
			e.preventDefault();
		})
	}
	
	// result of calculation
	$('.btn-calculate').on('click', function(e){
		var cur = $(this);
		if(!cur.hasClass('open')){
			cur.parents('.calculator-popup-wrap').find('.result-calculation').fadeIn();
		}
		cur.addClass('open');
		e.preventDefault();
	});
	
	// popupUrl
	var url = window.location.href;
	var url_hash = window.location.hash;

	if ( url_hash.indexOf('#card-popup') + 1 ) 
		$.fancybox.open(url_hash);		
	
	//legal popup
	popupLegal = $('.legal-popup-link');
	if (popupLegal.length) {
		popupLegal.fancybox({
			wrapCSS: 'legal-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none',
			afterShow:function() {
				var popup = $('.legal-popup');
				popup.parents('.fancybox-overlay').css('overflow','auto');
				popup.parents('.legal-popup-wrap').css('padding-bottom','20px');
				$('html').css({'margin-right':'17px','overflow':'hidden'});
			},
			afterClose:function(){
				$('html').css({'margin-right':'0','overflow':'visible'});
			}
		});
	}
	
	//default popup
	popupContest = $('.contest-popup-link');
	if (popupContest.length) {
		popupContest.fancybox({
			wrapCSS: 'default-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none'
		});
		
		var popupItem = $('.contest-popup');
		var list = $('.gallery-list');
		var listLength = list.children().length;
		$('.contest-popup-link').on('click', function(){
			var cur = $(this);
			var parent = cur.parents('li:eq(0)');
			contestIndex = parent.index();
			console.log('index'+contestIndex);
			var title = parent.find('h4>a').text();
			var author = parent.find('.author').text();
			var likes = parent.find('.likes').text();
			var img = parent.find('img').attr('data-src');
			popupItem.find('h4').text(title);
			popupItem.find('.author').text(author);
			popupItem.find('.likes').text(likes);
			popupItem.find('h2 .serial-number').text(contestIndex+1);
			popupItem.find('.contest-img img').attr('src',img);
		});
		popupItem.find('.popup-prev').on('click', function(e){
			if((contestIndex-1)<0){
				contestIndex=listLength-1;
				list.find('li:eq('+contestIndex+') .contest-popup-link').trigger('click');
			} else
			list.find('li:eq('+(contestIndex-1)+') .contest-popup-link').trigger('click');	
			
			e.preventDefault();
		});
		popupItem.find('.popup-next').on('click', function(e){
			if((contestIndex+1)>listLength-1){
				contestIndex=0;
				list.find('li:eq('+contestIndex+') .contest-popup-link').trigger('click');
			} else
			list.find('li:eq('+(contestIndex+1)+') .contest-popup-link').trigger('click');	
			
			e.preventDefault();
		});
	}
	
	popupLayot = $('.layout-popup-link');
	if (popupLayot.length) {
		popupLayot.fancybox({
			wrapCSS: 'layout-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none'
		});
	}
	
	if ($('.images-list').length) {
		$('.fancybox-gallery').fancybox({
			openEffect: 'none',
			closeEffect: 'none'
		});
		
		var fancyAtr = $('.images-list li a').attr('data-fancybox-group', 'photo-gallery');
	}
	
	if ($('.images-list').length) {
		$('.fancybox-gallery-plans').fancybox({
			openEffect: 'none',
			closeEffect: 'none'
		});
		
		var fancyAtr = $('.images-list li a').attr('data-fancybox-group', 'photo-gallery-plans');
	}
}
/* Fancybox End */

/* tabs */
function tabs(){
	var tabWrap = $('.tabs-wrap');
	tabWrap.each(function(){
		var thisTabWrap = $(this);
		var tabControl = thisTabWrap.find('.tab-controls');
		var controlItem = tabControl.find('a');
		var itemControl = tabControl.find('li.active').index();
		tabControl.find('li.active').prev().addClass('prev-item');
		var tabsWrap = thisTabWrap.find('.tabs');
		var tab = tabsWrap.find('.tab');
		tab.eq(itemControl).fadeIn(0).siblings().fadeOut(0);
		controlItem.on('click', function(e){
			var $this = $(this);
			var index = $this.parents('li').index();
			$this.parents('li').addClass('active').siblings().removeClass('active prev-item');
			$this.parents('li').prev().addClass('prev-item');
			$this.parents('li.active').removeClass('prev-item');
			tab.fadeOut(0).eq(index).fadeIn(300);
			$('select.cselect').multiselect("refresh");
			e.preventDefault();
		});
	});
}
/* tabs end */

/* UI Multiselect */
function customSelect(objSelName){	
	/*.bselect first type*/		
	if (objSelName.length){	
		/*placeholder fade delay*/
		var placeholderDelay = 0;
		/*placeholder fade delay end*/
		objSelName.multiselect({
			multiple: false,
			header:true,
			selectedList: 1,
			minWidth:  'auto',
			height: 'auto',
			position: {
				my: 'left top',
				at: 'left bottom',
				collision: "flip flip",
				using: function( position, feedback ) {
					addPositionClass(position, feedback, $(this));
				}
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
				
				/*auto completion html*/
				widg.find('.ui-multiselect-header').append('<div class="select-search-wrap"><input class="select-search-input" type="text" /></div>');	
				/*auto completion html end*/
				
				/*add icons html */
				widg.find('.ui-multiselect-checkboxes li label').append('<em></em>');
				/*add icons html end */
			},
			open: function(event, ui){
				var widg = $(this).multiselect("widget");
				
				/*adding to the last item class 'last' */
				widg.find('.ui-multiselect-checkboxes li:last')
					.addClass('last')
					.siblings().removeClass('last');
				/*adding to the last item class 'last' end */
				
				/*fix scroll drop list*/
				var list = widg.find('.ui-multiselect-checkboxes');
				var maxH = parseInt(list.css('max-height'));
				if(maxH > parseInt(list.height())){
					list.removeClass('list-fix-scroll');
				}else{					
					list.addClass('list-fix-scroll');
				}
				/*fix scroll drop list end*/
				
				/*auto completion handler*/
				var arrValPar = ('.ui-multiselect-checkboxes  li');	
				widg.find(arrValPar).show();
				widg.find('.select-search-input').val('');
				widg.find('.select-search-input').on('change keyup', function(){
					var inpVal = $(this).val().toLowerCase(); 
					var arrVal = widg.find('label.ui-corner-all span');
									
					arrVal.each(function(i){
						var curVal = arrVal.eq(i).text().toLowerCase().slice(0, inpVal.length);
						if (inpVal == curVal){
							$(this).parents(arrValPar).show();
						}else{
							$(this).parents(arrValPar).hide();
						}
					})
				});
				/*auto completion handler end*/	
			},
			beforeclose: function(event, ui){
				var bt = $(this).multiselect("getButton");
				
				/*placeholder handler close*/
				bt.find('.select-placeholder').fadeOut(placeholderDelay);
				bt.find('.ui-select-value').css({'visibility':'visible'});
				/*placeholder handler close end*/
				
				var widg = $(this).multiselect("widget");
				removePositionClass(widg);
			}
		});	
	}
	/*.bselect first type end*/	
};
/* UI Multiselect End */

/* placeholder */
function placeholderEdit() {
	if ($.browser.webkit || $.browser.mozilla) {
		$('input,textarea').on('focus', function(){
			var placeholder = $(this).attr('placeholder');
			$(this).removeAttr('placeholder');
			// var input_text = $(this).attr('value');
			// $(this).removeAttr('value');
			
			$(this).on('blur', function(){
				$(this).attr('placeholder',placeholder);
			});
		});
	}
}
/* placeholder end */

/* show content */
function showContent(){
	$('.filter-form').each(function(){
		var cur = $(this);
		cur.find('[class*=filter-district] .cselect, [class*=filter-complex] .cselect').change(function(e){
			cur.parents('.tabs-wrap').find('.btn-open-map').fadeIn();
		});
	});
	
	$('.btn-open-map').on('click', function(e){
		var cur = $(this);
		if ( cur.hasClass('open') ) {
			cur.html('<i class="icon-pin"></i>Смотреть объекты на карте').removeClass('btn-close-map').fadeOut();
			$('.intro-heading-holder').animate({
				marginTop: 0
			},300);
		} else {
			cur.html('Свернуть карту').addClass('btn-close-map');
			$('.intro-heading-holder').animate({
				marginTop: -160
			},300);
		}
		cur.toggleClass('open');
		cur.siblings('.map-wrap').slideToggle(300);
		
		e.preventDefault();
	});
	// team drop
	$('.team .team-switcher a').on('click', function(e){
		if ( $(this).hasClass('open') ) {
			$(this).html('Развернуть всю команду (еше 23 человека)');
		} else {
			$(this).html('Свернуть команду');
		}
		$(this).toggleClass('open');
		$('.team .team-drop').slideToggle(700);
		
		// equalHeight sctipt for team list
		$('.employee-box').each(function(){
			var amount = $('.team-slider-wrap h3', this).length;
			$('.team-slider-wrap h3', this).equalHeight({
				amount: amount
			});
		});
		$('.team-list').each(function(){
			var amount = $('li', this).length;
			$('li', this).equalHeight({
				amount: amount
			});
		});
		
		// sliderTeam.reloadSlider();
		var boxPage = $('.team').width();
		$('.team-slider-wrap').each(function() {
			var boxWidth = $(this).width();
			if(boxWidth < boxPage){
				$(this).find('.team-list').removeClass('team-slider');
				$(this).find('.team-list').addClass('small-team');
			}
		});
		
		// bx slide team list
		sliderTeam = $('.team-slider').bxSlider({
			pager: false,
			slideWidth: 312,
			minSlides: 3,
			maxSlides: 3,
			moveSlides: 1,
			slideMargin: 31,
			infiniteLoop: false,
			hideControlOnEnd: true
		});
		e.preventDefault();
	});
	// object search
	$('.btn-find-object').on('click', function(e){
		var btn = $(this);
		if ( btn.hasClass('open') ) {
			btn.html('<i class="arrow-open"></i>подобрать квартиру');
			var as = $('.header-holder').find('.overlay-white').fadeOut();
			setTimeout(function(){
				as.remove();
			}, 300);
		} else {
			btn.html('<i class="arrow-open"></i>свернуть поиск');
			$('.header-holder').append('<span class="overlay-white" />');
			$('.overlay-white').fadeOut(0).fadeIn();
		}
		btn.toggleClass('open');
		
		$('.object-search-holder').slideToggle();
		// if ( $('.object-search').hasClass('fixed') ) {
			// $('.object-search').toggleClass('fixed');
		// } else {
			// setTimeout(function(){
				// $('.object-search').toggleClass('fixed');
			// },300);
		// }
		$('select.cselect').multiselect("refresh");
		var yourClick = true;
		
		$(document).bind('click.popupFind', function (e) {
			if ($(e.target).closest('.cselect').length == 1) {}
			else if ( !yourClick  && $(e.target).closest('.object-search-holder').length == 0 )
			{
				console.log(1);
				$('.object-search-holder').slideUp();
				var as = $('.header-holder').find('.overlay-white').fadeOut();
				setTimeout(function(){
					as.remove();
				}, 300);
				$('.btn-find-object').removeClass('open').html('<i class="arrow-open"></i>подобрать квартиру');
				$(document).unbind('click.popupFind');
			}
			yourClick  = false;
		});
		e.preventDefault();
	});
	// added flats box
	if ($('.added-flats-box').length) {
		$('.user-links-list>li>a').on('click',function(e){
			$('.ui-tooltip').fadeOut();
			var cur = $(this);
			if(cur.nextAll('.added-flats-box').length){
				var popup = cur.siblings('.added-flats-box');
				popup.fadeIn();
				var overlay = '<div class="fancybox-overlay fancybox-overlay-fixed"></div>';
				cur.parent().append(overlay);
				$('.fancybox-overlay').fadeIn();
				var yourClick = true;
				
				$(document).bind('click.flatsPopup', function (e) {
					if ( !yourClick  && $(e.target).closest(popup).length == 0 )
					{
						popup.fadeOut();
						$('.fancybox-overlay').fadeOut(function(){
							$('.fancybox-overlay').remove();
						});
						$(document).unbind('click.flatsPopup');
					}
					yourClick  = false;
				});
			}
			e.preventDefault();
		});
	}
	// work days drop
	$('.work .work-days-switcher a').each(function(){
		var cur = $(this);
		var drop = cur.parents('.work').find('.work-days');
		var dropOther = cur.parents('.work').find('.work-days');
		cur.on('click', function(e){
			cur.toggleClass('open');
			drop.slideToggle();
			e.preventDefault();
		});
	})
}
/* show content end */

/* checkbox */
function checkbox(){
	$('.def-ch').checkbox({
		cls:'jquery-checkbox'
	});
}
/* checkbox end */

/* showInput */
function showInput(){
	$('.search-form .submit-search').on('click', function(e){
		if ( $(this).parents('form').find(':text').val().length && $(this).parents('.search-form').find('.input-holder-wrap').is(':visible') ){
			$(this).parents('form').submit();
		} else {
		$('.search-form .input-holder-wrap')
					.show(0)
						.animate({
							width: 199
						}, 200, function(){
								$('.search-form .input-holder-wrap input').val('');
								$('.search-form .input-holder-wrap input').trigger('focus');
							});
	var yourClick = true;
	$(document).on('click.EventSearch', function (e) {
		if ( !yourClick && $(e.target).closest($('.input-holder-wrap')).length  == 0 || $(e.target).closest('.btn-search-close').length == 1) {
			$('.search-form .input-holder-wrap').animate({
				width:0
			}, 200, function(){
				$('.search-form .input-holder-wrap').hide(0);
			});
			$(document).unbind('click.EventSearch');
		}
		yourClick = false;
	});
		e.preventDefault();
		}
	});
}
/* showInput end  */

/* add item class */
function itemClass(){
	$('table tbody tr:odd').addClass('even-item');
	$('.tab-controls li:last-child').addClass('last-item');
	$('.team-slider li:last-child').addClass('last-item');
	$('.paymant-list li:last-child').addClass('last-item');
	$('.card-price-list li:last').addClass('last-item');
	$('.compare-table tbody tr td:last-child').addClass('last-item');
	$('.compare-table tbody tr:last-child').addClass('last-tr');
}
/* add item class end  */

/* equalHeight */
function equalHeight(){
	$('.about-list .about-item').equalHeight({
		amount: 3
	});
}
/* equalHeight end */

/* popupPosition */
function popupPosition(){
	if ($('.callback').length) {
		$('.callback').on('click',function(e){
			var cur = $(this);
			var popup = $('.callback-form');
			popup.fadeIn();
			popup.position({
				of: $(this),
				my: "right bottom",
				at: "right bottom",
				collision: "flip flip",
				using: function( position, feedback ) {
					addPositionClass(position, feedback, $(this));
				}
			});
			var yourClick = true;
			
			$(document).bind('click.popupCallback', function (e) {
				if ( !yourClick  && $(e.target).closest(popup).length == 0 || $(e.target).is('.btn-close')  )
				{
					popup.fadeOut();
					$(document).unbind('click.popupCallback');
				}
				yourClick  = false;
			});
			$('.btn-close').on('click', function (e) {
				e.preventDefault();
			});
			if(cur.parents('.footer').length){
				$('.callback-confirm').addClass('bottom-position')
			} else {
				$('.callback-confirm').removeClass('bottom-position')
			}
			e.preventDefault();
		});
	}
}
/* popupPosition end */

/* tooltip */
function tooltipItem(){
	 $( '.header' ).tooltip({
	position: {
		my: "left+24 bottom-7",
		at: "left top"
		}
	});
}
/* tooltip end */

/* validator */
function validator(){
	if ( $('.callback-form').length ) {
		var form_item = $('.callback-form form');
		form_item.validate({
			rules: {
				callback_form_name: {
					required: true
				},
				callback_form_phone: {
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
			errorPlacement: function(error, element) {},
			invalidHandler: function(event, validator) {},
			submitHandler: function(form) {
				var formParent = form_item.parent('.callback-form');
				$('.callback-form').fadeOut();
				var popup = $('.callback-confirm');
				popup.fadeIn().addClass('active');
				if(popup.hasClass('bottom-position')){
					popup.position({
						of: formParent,
						my: "right bottom",
						at: "right bottom",
						collision: "flip flip",
						using: function( position, feedback ) {
							addPositionClass(position, feedback, $(this));
						}
					});
				} else {
					popup.position({
						of: formParent,
						my: "right top",
						at: "right top",
						collision: "flip flip",
						using: function( position, feedback ) {
							addPositionClass(position, feedback, $(this));
						}
					});
				}
				var yourClick = true;
				$(document).bind('click.popupConfirm', function (e) {
					if ( yourClick && $(e.target).closest(popup).length == 0 || $(e.target).is('.btn-close, .close')  )
					{
						popup.fadeOut().removeClass('active');
						$(document).unbind('click.popupConfirm');
					}
					yourClick  = false;
				});
				$('.btn-close, .close').on('click', function (e) {
					e.preventDefault();
				});
			}
		});
	}
}
/* validator end */

/* delete Row */
function deleteRow() {
	$('.del-col').on('click', function(e) {
		e.preventDefault();
		var cur = $(this);
		var row = cur.parents('tr').fadeOut();
		setTimeout( function() {
			row.remove();
		},400);
	});
}
/* delete Row End */

/* hover Effect */
function hoverEffect(){
	$('.objects-list .objects-item').each(function(){
		var _this = $(this);
		var btn = _this.find('.btn-more');
		var parent = _this.find('.objects-holder');
		_this.hover(function(){
			invalidId = setTimeout(function(){
				parent.animate({
					left:"-116px"}, 200);
			}, 200);
		},function(){
			clearInterval(invalidId);
			parent.animate({
				left:"0"}, 200);
		});
	});
}
/* hover Effect End */

/* nav fixed */
function navFixed(){
		var fixedBox = $('.nav-box').offset().top;
		var vscrtop = $(window).scrollTop();
		if(vscrtop >= fixedBox){
			$('.nav-box').addClass('fixed');
		}
		else{
			$('.nav-box').removeClass('fixed');
		}
		$(window).scroll(function(){
			var vscrtop = $(window).scrollTop();
			if(vscrtop >= fixedBox){
				$('.nav-box').addClass('fixed');
			}
				else{
			$('.nav-box').removeClass('fixed');
		}
	});
}
/* nav fixed end */

/* loadList */
function loadList(){
	$('.jq-show-box tbody').each(function(){
		var list = $(this);
		var showItem = list.parents('table').data('show-item');
		var slideItem = list.parents('table').data('slide-item');
		var showItemIndex = showItem - 1;
		list
			.find('tr:gt('+showItemIndex+')')
				.hide(0)
					.addClass('hidden');
		list
			.parents('.jq-show-container')
				.find('.jq-show-more')
					.on('click', function(e){
						var toShow = list.find('tr.hidden:lt('+slideItem+')');
						var toHide = list.find('tr.visible');
						if ( $(this).hasClass('open')) {
							toHide.fadeOut().removeClass('visible').addClass('hidden');
						} else {
							toShow.fadeIn().removeClass('hidden').addClass('visible');
						}
						if ( list.find('tr.hidden').length ) {
							$(this).html('Развернуть весь список квартир (еще 123)').removeClass('open');
						} else {
							$(this).html('Свернуть выдачу').addClass('open');
						}
						e.preventDefault();
		});
	});
}
/* loadList */



/* Scroll the background layers */
var globalCounF = 0;
var globalCoun = 0;
function parallaxScroll(){
	var heightIntro = $('.intro').height();
	$('.parallax-box-holder').css('height',heightIntro+150);
	$('.intro').on('mousemove', function(e){
		if(globalCounF == 0){
			globalCoun = e.pageX;
		}
		globalCounF = 1;
		var scrolledFires = e.pageX;
		var scrolled = scrolledFires - globalCoun;
		if ( scrolled ) {
			$('#parallax-end').css({
				'left':(0-(scrolled*.01))+'px'
			});
			$('#parallax-middle').css({
				'left':(0+(scrolled*.02))+'px'
			});
			$('#parallax-front').css({
				'left':(0+(scrolled*.05))+'px'
			});
		}
	});
	$('.intro').hover(
	function(){
		
	},
	function(){
		globalCounF = 0;
	});
}

/* navDrop */
function navDrop(){
	$('.nav-list>li').each(function(){
		var cur = $(this);
		var drop = cur.find('.sub-nav');
		cur.hover(function(){
			invalidId = setTimeout(function(){
				drop.fadeIn(200);
			}, 200);
		},function(){
			clearInterval(invalidId);
			drop.fadeOut(200);
		});
	})
}
/* navDrop end */

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

function openPopup(url){
	$.fancybox.open(url,{
			wrapCSS: 'card-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none',
			afterShow:function() {
				var popup = $('.card-popup');
				popup.parents('.fancybox-overlay').css('overflow','auto');
				popup.parents('.card-popup-wrap').css('padding-bottom','20px');
				$('html').css({'margin-right':'17px','overflow':'hidden'});
			},
			afterClose:function(){
				$('html').css({'margin-right':'0','overflow':'visible'});
			},
			afterLoad: function(){
				setTimeout(function(){
					var popup = $('.fancybox-overlay .card-popup');
					var slider_index = popup.find('.card-preview-list').attr('data-slider-index');
					allbxSlider[slider_index].reloadSlider();
				}, 100)
			}
		});
}
/* footer at bottom end */

/** ready/load/resize document **/

$(document).ready(function(){
	inputFocus($('.input-holder'));
	yandexMapMulti();
	tabs();
	customSelect($('.cselect'));
	checkbox();
	allSlider();
	fancybox();
	placeholderEdit();
	showInput();
	itemClass();
	equalHeight();
	showContent();
	popupPosition();
	tooltipItem();
	validator();
	deleteRow()
	hoverEffect();
	navFixed();
	loadList();
	parallaxScroll();
	navDrop();
});
$(window).load(function(){
	footerBottom();
});