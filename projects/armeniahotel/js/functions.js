/* inputFocus */
inputFocus = function(parent){
	var parentSize = parent.length;
	var n = 0;
	for ( n; n < parentSize; n++ ) {
		var obj = parent[n];
		var input = $(obj).find(':text, textarea, :password');
		if ( $(input).length ) {
			$(obj).each(function(){
				var el = $(this);
				$(input).on('focus', function(){el.addClass('focus');});
				var inputBlur = function(){
					$(input).on('blur', function(){el.removeClass('focus');});
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

/* placeholder */
function placeholder(){
	$('[placeholder]').placeholder();
	$('[placeholder]').each(function(index, item){
		var placeholderAttr = $(item).attr('placeholder');
		if ( !$(item).val().length ) {
			$(item).val(placeholderAttr).addClass('hinted');
		}
		$(item).on({
			focus: function(){
				if ( $(item).val() === placeholderAttr ) {
					$(item).val('').removeClass('hinted');
				}
			},
			blur: function(){
				if ( !$(item).val().length ) {
					$(item).val(placeholderAttr).addClass('hinted');
				}
			}
		});
	});
}
/* placeholder end */

/* custom inputs */
function customInputs(objBlockInput){
	if(objBlockInput.length){
		var inp = ':text, :password, textarea';
		objBlockInput.on('click', function(e){
			var self = $(this);
			self.addClass('focus');
			var objInp = self.find(inp);
			self.find(inp).trigger('focus');
		});
		objBlockInput.on('blur', inp, function(e){
			$(e.delegateTarget).removeClass('focus');
		});
	}
};
/* custom inputs end */

/* modification placeholder */
function placeholderMod() {	
	var UA = window.navigator.userAgent;
	var brIE = /MSIE *\d+\.\w+/i;	/*IE browser*/
	var brSafari = /Version\/\w+\.\w+/i;	/*Safari browser*/
	/*Keeps out IE*/
	var brResult = UA.match(brIE);
	if (! brResult){
		var inp = ':text, :password, textarea';
		/*Keeps out Safari*/
		brResult = UA.match(brSafari);
		if (! brResult){
			$(inp).on('click, focus', function(){
				var self = $(this);
				var plac = self.attr('placeholder');
					self.removeAttr('placeholder');
					self.on('blur', function(){
						$(this).attr('placeholder', plac);
					});
				}
			);
		} else{
			/*fix alignment placeholder safari*/
			$(inp).focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					if (this.originalType) {
						this.type = this.originalType;
						delete this.originalType;
					}
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '') {
					if (this.type == 'password') {
						this.originalType = this.type;
						this.type = 'text';
					}
					input.addClass('placeholder');
				input.val(input.attr('placeholder'));
				}
			}).blur();
			/*fix alignment placeholder safari end*/
		}
	}
};
/* modification placeholder end */

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

function vmiddleObject(obj, img){
	$(obj).each(function(){
		var bl = $(this);
		var bl_h = bl.height();
		var img_h = bl.find(img).height();
		var marg = (bl_h/2) - (img_h/2);
		bl.find(img).css('margin-top', marg);
	});
}

/* googleMap */
function googleMap(){
	if ( $('#map-box').length ) {
		var map;
		// coordinates for placemark
		var fl = new google.maps.LatLng(54.19406388, 37.61135581);
		function initialize() {
			// map option
			var mapOptions = {
				zoom: 16,
				scrollwheel: false,
				center: new google.maps.LatLng(54.19406388, 37.61135581),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			// define google map
			map = new google.maps.Map(document.getElementById('map-box'),
				mapOptions);
			// placemark option
			var marker = new google.maps.Marker({
				position: fl,
				map: map
			});
		}
		// init map
		google.maps.event.addDomListener(window, 'load', initialize);
	}
}
/* googleMap end */

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
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
	$('.date-from').datepicker({
		minDate:0,
		dateFormat: 'dd.mm.y',
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
				$(this).parents('.datepickers').eq(0).find('.date-to').datepicker( 'option', 'minDate', selectedDate );
			}
		},
		beforeShow: function(input, element) {
			setTimeout(function () {
				element.dpDiv.append('<span class="datepicker-corner" />');
				$(element.dpDiv).insertAfter(input);
			}, 10);
		}
	});
	
	$('.date-to').datepicker({
		minDate:0,
		dateFormat: 'dd.mm.y',
		onClose: function( selectedDate ) {
			if(selectedDate) {
				$(this).parents('.datepickers').eq(0).find('.date-from').datepicker( 'option','maxDate', selectedDate );
			}
		},
		beforeShow: function(input, element) {
			setTimeout(function () {
				element.dpDiv.append('<span class="datepicker-corner" />');
				$(element.dpDiv).insertAfter(input);
			}, 10);
		}
	});
}
/* datepicker End */

/* Fancybox */
function fancybox(){
	/*default popup*/
	var popup = $('.popup-open');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'popup-wrapper',
			padding: 0,
			afterShow: function () {
				var selectItem = $('.popup-wrapper').find('select.cselect');
				selectItem.each(function(index, item){
					$(item).multiselect('refresh');
					$(item).multiselect('uncheckAll');
				});
				$(window).scroll(function(){
					selectItem.multiselect('close');
				});
			}
		});
	}
}
/* Fancybox End */

/* UI Multiselect */
function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var placeholderText = $(selectItem).attr('data-placeholder');
			var flag = true;
			if ( placeholderText === undefined ) {
				placeholderText = $(selectItem).find(':selected').html();
				flag = false;
			}
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: false,
				height: 'auto',
				minWidth: 50,
				selectedList: 1,
				classes: classes,
				multiple: false,
				noneSelectedText: placeholderText,
				show: ['fade', 100],
				hide: ['fade', 100],
				create: function(event){
					var button = $(this).multiselect('getButton');
					var widget = $(this).multiselect('widget');
					button.wrapInner('<span class="select-inner"></span>');
					button.find('.ui-icon').append('<i class="arrow-select"></i>')
						.siblings('span').addClass('select-text');
					widget.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');
					if ( flag ) {
						$(selectItem).multiselect('uncheckAll');
						$(selectItem)
							.multiselect('widget')
							.find('.ui-state-active')
							.removeClass('ui-state-active')
							.find('input')
							.removeAttr('checked');
					}
				},
				selectedText: function(number, total, checked){
					var checkedText = checked[0].title;
					return checkedText;
				},
				position: {
					my: 'left top',
					at: 'left bottom'
				}
			});
		});
		$(window).resize(selectResize);
	}
}
function selectResize(){
	if ( selectArray.length ) {
		$.each(selectArray, function(i, el){
			var checked = $(el).multiselect('getChecked');
			var flag = true;
			if ( !checked.length ) {
				flag = false
			}
			$(el).multiselect('refresh');
			if ( !flag ) {
				$(el).multiselect('uncheckAll');
				$(el)
					.multiselect('widget')
					.find('.ui-state-active')
					.removeClass('ui-state-active')
					.find('input')
					.removeAttr('checked');
			}
			$(el).multiselect('close');
		});
	}
}
/* UI Multiselect End */

/* footer at bottom */
function footerBottom(){
	var footer = $('.footer');
	var footerOuterHeight = footer.outerHeight();
	footer.css({
		'margin-top': -footerOuterHeight
	});
	$('.spacer').css({
		'height': footerOuterHeight
	});
}
/* footer at bottom end */

/*equalHeight*/
function equalHeightInit(){
	$('.attraction-description').equalHeight({
		amount: 3
	});
}
/*equalHeight end*/

/* inputMask */
function inputMask(){
	$('.phone-mask').mask('+9 (999) 999-99-99');
}
/* inputMask end */

/*browse photos*/
function browsePhotos(){
	if(!$('.browse-photos').length){return;}
	var previewSlider = $('.previews-photos-list');
	var sliderSize = previewSlider.data('size');
	var sliderWidth = previewSlider.data('width');
	var sliderMargin = previewSlider.data('margin');
	previewSlider.each(function () {
		var countSlider = $(this).find('li').length;
		console.log(countSlider);
		if(countSlider <= sliderSize){
			$(this).closest('.browse-photos').addClass('no-slider');
		}
	});
	/*slider large images*/
	$('.browse-list').bxSlider({
		mode: 'fade',
		pagerCustom:'.previews-photos-list',
		infiniteLoop: false,
		hideControlOnEnd: true,
		onSlideNext: function($slideElement, oldIndex, newIndex){
			if (newIndex >= sliderSize)(
				$('.previews-photos .bx-controls .bx-next').trigger('click')
				)
		},
		onSlidePrev: function($slideElement, oldIndex, newIndex){
			if (newIndex <= sliderSize)(
				$('.previews-photos .bx-controls .bx-prev').trigger('click')
				)
		},
		onSliderLoad:function(){
			var largeImage = $('.large-img');
			largeImage.find('.bx-prev').append('<span class="arrow-slide-prev"></span>');
			largeImage.find('.bx-next').append('<span class="arrow-slide-next"></span>');
		}
	});

	/*slider previews images*/
	previewSlider.bxSlider({
		minSlides: sliderSize,
		maxSlides: sliderSize,
		slideWidth: sliderWidth,
		slideMargin: sliderMargin,
		moveSlides: 1,
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true,
		onSliderLoad:function(){
			$('.previews-photos .bx-prev').append('<span class="arrow-slide-prev"></span>');
			$('.previews-photos .bx-next').append('<span class="arrow-slide-next"></span>');
		}
	});

	/*zoom popup*/
	$('.browse-photos-zoom')
		.attr('data-fancybox-group', 'photo-gallery')
		.fancybox({
			padding: 4,
			openEffect: 'none',
			closeEffect: 'none'
		});
}
/*browse photos end*/

/*accordion init*/
function accordionInit() {
	$( ".reminder" ).accordion({
		collapsible: true,
		active: 1,
		heightStyle: "content"
	});
}
/*accordion init end*/

/*click init*/
function clickInit() {
	$('.input-holder').mousedown(function () {
		$(this).addClass('click');
	}).mouseup(function(){
		$(this).removeClass('click');
	});
}
/*click init enc*/

/** ready/load/resize document **/

$(document).ready(function(){
	var inputInit = $('.input-holder');
	inputFocus(inputInit);
	customInputs(inputInit);
	placeholder();
	placeholderMod();
	vmiddleObject($('.rooms-content'), $('.rooms-frame'));
	googleMap();
	datepicker();
	fancybox();
	customSelect($('select.cselect'));
	equalHeightInit();
	inputMask();
	browsePhotos();
	accordionInit();
	clickInit();
});
$(window).load(function(){
	footerBottom();
});