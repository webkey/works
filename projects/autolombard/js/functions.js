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
	$('input[placeholder], textarea[placeholder]').placeholder();
};
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

/* yandexMap */
function yandexMap(){
	if ( $('#map').length ) {
		var markArray01 = new Array();
		markArray01 = [
			{
				left: 56.865294,
				right: 35.916228,
				hintContent: 'Evrovideo',
				help_hint: 'Evrovideo',
				balloonContent:
					'<div class="info-popup js-info-popup">' +
						'<div class="info-popup-holder">' +
							'<h3>Василиостровский ломбард</h3>' +
							'<table class="card-table">' +
								'<tbody>' +
									'<tr>' +
										'<td>Город:</td>' +
										'<td>Тверь</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Адрес:</td>' +
										'<td>ул. Горького 56</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Телефоны:</td>' +
										'<td>+7 (4822) 255-14-58</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Метро:</td>' +
										'<td>ст. Комсомольская</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Кол-во отзывов:</td>' +
										'<td><span class="card-reviews">15</span></td>' +
									'</tr>' +
									'<tr>' +
										'<td>Рейтинг:</td>' +
										'<td>' +
											'<div class="rating">' +
												'<div class="stars-rating">' +
													'<div class="stars"><span style="width: 80%;"></span></div>' +
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>'
			}
		]
		ymaps.ready(function () {
			// Create map
			var myMap = new ymaps.Map("map", {
				center: [56.865294, 35.916228],
				zoom: 16
			});
			// Add buttons and placemarks
			$.each(markArray01, function(index, element){
				var left = element.left;
				var right = element.right;
				var hintContent = element.hintContent;
				var help_hint = element.help_hint;
				var balloonContent = element.balloonContent;
				var myPlacemark = new ymaps.Placemark([left, right], {
					hintContent: hintContent,
					help_hint: help_hint,
					balloonContent: balloonContent
				}, {
					iconImageHref: './img/balloon.png',
					iconImageSize: [40, 48],
					iconImageOffset: [-19, -46]
				});
				// Add buttons and placemarks
				myMap.geoObjects.add(myPlacemark);
			});
		});
	}
}

function yandexMapMulti() {
	if ( $('#map-multi').length ) {
		var markArray = new Array();
		markArray = [
			{
				left: 56.865776,
				right: 35.909275,
				hintContent: 'Evrovideo',
				help_hint: 'Evrovideo',
				balloonContent:
					'<div class="info-popup js-info-popup">' +
						'<div class="info-popup-holder">' +
							'<h3>Авалон автоломбард</h3>' +
							'<table class="card-table">' +
								'<tbody>' +
									'<tr>' +
										'<td>Город:</td>' +
										'<td>Тверь</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Адрес:</td>' +
										'<td>ул. Горького 56</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Телефоны:</td>' +
										'<td>+7 (4822) 255-14-58</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Метро:</td>' +
										'<td>ст. Комсомольская</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Кол-во отзывов:</td>' +
										'<td><span class="card-reviews">15</span></td>' +
									'</tr>' +
									'<tr>' +
										'<td>Рейтинг:</td>' +
										'<td>' +
											'<div class="rating">' +
												'<div class="stars-rating">' +
													'<div class="stars"><span style="width: 60%;"></span></div>' +
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>'
			},
			{
				left: 56.865247,
				right: 35.913288,
				hintContent: 'Evrovideo',
				help_hint: 'Evrovideo',
				balloonContent:
					'<div class="info-popup js-info-popup">' +
						'<div class="info-popup-holder">' +
							'<h3>Синдикат авто</h3>' +
							'<table class="card-table">' +
								'<tbody>' +
									'<tr>' +
										'<td>Город:</td>' +
										'<td>Тверь</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Адрес:</td>' +
										'<td>ул. Горького 56</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Телефоны:</td>' +
										'<td>+7 (4822) 255-14-58</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Метро:</td>' +
										'<td>ст. Комсомольская</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Кол-во отзывов:</td>' +
										'<td><span class="card-reviews">15</span></td>' +
									'</tr>' +
									'<tr>' +
										'<td>Рейтинг:</td>' +
										'<td>' +
											'<div class="rating">' +
												'<div class="stars-rating">' +
													'<div class="stars"><span style="width: 80%;"></span></div>' +
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>'
			},
			{
				left: 56.865294,
				right: 35.916228,
				hintContent: 'Evrovideo',
				help_hint: 'Evrovideo',
				balloonContent:
					'<div class="info-popup js-info-popup">' +
						'<div class="info-popup-holder">' +
							'<h3>Василиостровский ломбард</h3>' +
							'<table class="card-table">' +
								'<tbody>' +
									'<tr>' +
										'<td>Город:</td>' +
										'<td>Тверь</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Адрес:</td>' +
										'<td>ул. Горького 56</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Телефоны:</td>' +
										'<td>+7 (4822) 255-14-58</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Метро:</td>' +
										'<td>ст. Комсомольская</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Кол-во отзывов:</td>' +
										'<td><span class="card-reviews">15</span></td>' +
									'</tr>' +
									'<tr>' +
										'<td>Рейтинг:</td>' +
										'<td>' +
											'<div class="rating">' +
												'<div class="stars-rating">' +
													'<div class="stars"><span style="width: 80%;"></span></div>' +
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>'
			},
			{
				left: 56.863367,
				right: 35.923502,
				hintContent: 'Evrovideo',
				help_hint: 'Evrovideo',
				balloonContent:
					'<div class="info-popup js-info-popup">' +
						'<div class="info-popup-holder">' +
							'<h3>Промсвязьбанк ломбард</h3>' +
							'<table class="card-table">' +
								'<tbody>' +
									'<tr>' +
										'<td>Город:</td>' +
										'<td>Тверь</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Адрес:</td>' +
										'<td>ул. Горького 56</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Телефоны:</td>' +
										'<td>+7 (4822) 255-14-58</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Метро:</td>' +
										'<td>ст. Комсомольская</td>' +
									'</tr>' +
									'<tr>' +
										'<td>Кол-во отзывов:</td>' +
										'<td><span class="card-reviews">15</span></td>' +
									'</tr>' +
									'<tr>' +
										'<td>Рейтинг:</td>' +
										'<td>' +
											'<div class="rating">' +
												'<div class="stars-rating">' +
													'<div class="stars"><span style="width: 80%;"></span></div>' +
												'</div>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>'
			}
		]
		ymaps.ready(function () {
			// Create map
			var myMap = new ymaps.Map("map-multi", {
				center: [56.86483, 35.916139],
				zoom: 16
			});
			// Add buttons and placemarks
			myMap.controls.add('zoomControl', {top: '10px', left:'10px', height: '50px'});
			$.each(markArray, function(index, element){
				var left = element.left;
				var right = element.right;
				var hintContent = element.hintContent;
				var help_hint = element.help_hint;
				var balloonContent = element.balloonContent;
				var myPlacemark = new ymaps.Placemark([left, right], {
					hintContent: hintContent,
					help_hint: help_hint,
					balloonContent: balloonContent
				}, {
					iconImageHref: './img/balloon.png',
					iconImageSize: [40, 48],
					iconImageOffset: [-19, -46]
				});
				// Add buttons and placemarks
				myMap.controls.add('zoomControl', {top: '10px', left:'10px', height: '50px'});
				myMap.geoObjects.add(myPlacemark);
			});
		});
	}
}
/* yandexMap end */

function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
//			var placeholderText = $(selectItem).attr('data-placeholder');
//			var flag = true;
//			if ( placeholderText === undefined ) {
//				placeholderText = $(selectItem).find(':selected').html();
//				flag = false;
//			}
			var flag = true;
			if ($(selectItem).find('option').is('[selected]')) {
				var placeholderText = $(selectItem).find(':selected').html();
			} else {
				var placeholderText = $(selectItem).attr('data-placeholder');
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
					button.find('.ui-icon').append('<i class="icon-select"></i>')
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

/* checkbox/radiobox */
function checkbox(){
	$('.def-ch').checkbox({
		cls:'jquery-checkbox'
	});
	$('.def-radio').checkbox({
		cls:'jquery-radiobox'
	});
}
/* checkbox/radiobox end */

/* itemClass */
function itemClass(){
	var cardTable = $('.card-table');
	cardTable.find('tr:even').addClass('odd');
	cardTable.find('tr:odd').addClass('even');
}
/* itemClass end */

/* slider range */
 function sliderRange() {
	persentSlider = $( ".slider-range" ).slider({
		min: 0,
		max: 100,
		value: 10,
		slide: function( event, ui ) {
				$( ".amount" ).text( ui.value + "%" );
			}
		});
	$( ".amount" ).text( $( ".slider-range").slider( "value" ) + "%" );
}
/* slider range end */

/* formReset */
function formReset(){
	$('.filters-form').find(':reset').on('click', function(){
		var val = persentSlider.slider('option', 'value');
		persentSlider.slider('value', 10);
		$( ".amount" ).text( $( ".slider-range").slider( "value" ) + "%" );
	});
}
/* formReset end */

/* Fancybox */
function fancybox(){
	var popupReview = $('.write-review');
	if (popupReview.length) {
		popupReview.fancybox({
			wrapCSS: 'review-popup-wrapper',
			padding: 10,
			openEffect: 'none',
			closeEffect: 'none'
		});
	}
}
/* Fancybox End */

/** ready/load/resize document **/

$(document).ready(function(){
	inputFocus($('.input-holder'));
	customInputs($('.input-holder'));
	placeholder();
	placeholderMod();
	yandexMap();
	yandexMapMulti();
	customSelect($('select.cselect'));
	checkbox();
	itemClass();
	sliderRange();
	formReset();
	fancybox();
});