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

/* all sliders */
function allSlider(){
//	building carousel
	arrSlider = [];
	$('.building-carousel-list').each(function(i){
		arrSlider[i] = $('.building-carousel-list:eq('+i+')').bxSlider({
			slideWidth: 167,
			minSlides: 3,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 20,
			pager: false,
			infiniteLoop: false,
			hideControlOnEnd: true
		});
	});
}
/* all sliders end */

/*resize slider*/
function resizeSlider(){
	var windowWidth = $(window).width();
	var sliderBox = $('.building-carousel');
	sliderBox.removeClass('resize');
	if (windowWidth <= 1103) {
		sliderBox.addClass('resize');
	}
}
/*resize slider end*/

/* googleMap */
function googleMap(){
	if ( $('#map').length ) {
		var map;
		// coordinates for placemark
		var fl = new google.maps.LatLng(55.688609, 37.557044);
		function initialize() {
			// map option
			var mapOptions = {
				zoom: 11,
				center: new google.maps.LatLng(55.688609, 37.557044),
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			// define google map
			map = new google.maps.Map(document.getElementById('map'),
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

/* Fancybox */
function fancybox(){
	//popup location
	var popup = $('.popup-open');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'location-popup-wrap',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none',
			afterShow:function() {
				var popupItem = $('.popup');
				popupItem.parents('.fancybox-overlay').css('overflow','auto');
				popupItem.parents('.location-popup-wrap').css('padding-bottom','20px');
				$('html').css({'margin-right':'17px','overflow':'hidden'});
			},
			afterClose:function(){
				$('html').css({'margin-right':'0','overflow':'visible'});
			}
		});
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
		var tabsWrap = thisTabWrap.find('.tabs');
		var tab = tabsWrap.find('.tab');
		tab.eq(itemControl).fadeIn(0).siblings().fadeOut(0);
		controlItem.on('click', function(e){
			var $this = $(this);
			var index = $this.parents('li').index();
			$this.parents('li').addClass('active').siblings().removeClass('active');
			tab.fadeOut(0).eq(index).fadeIn(300);
			if ($('.building-carousel-list').length) {
				arrSlider[index].reloadSlider();
			}
			var sel = $('.tab').eq(index).find('select.cselect');
			sel.each(function(index, item){
				$(item).multiselect('refresh');
				$(item).multiselect('uncheckAll');
			});
			e.preventDefault();
		});
	});
}
/* tabs end */

/* UI Multiselect */
function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var placeholderText = $(selectItem).data('placeholder');
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
	$('.checker-list :checkbox').checkbox({
		cls:'jquery-radiobox'
	});
}
/* checkbox/radiobox end */

/* show content */
function showContent(){
	$('.filters-form .btn-advanced').on('click', function(e){
		var cur = $(this);
		if ( cur.hasClass('open') ) {
			cur.html('Расширенный поиск<i class="arrow-opener-white"></i> ');
		} else {
			cur.html('Скрыть<i class="arrow-closer-white"></i> ');
		}
		cur.toggleClass('open');
		cur.parents('.filters-form').find('.advanced-filters').slideToggle('fast');
		e.preventDefault();
	});

	//info description
	var speed=400,
		shortHeight = 250;

	$('.toggle-text').find('[class*="btn-"]').on('click', function(e){
		var cur = $(this);
		var box = cur.parents('.info-holder').find('.info-box');
		var fullHeight = box.find('.info-frame').height();
		if ( cur.hasClass('open') ) {
			cur.html('Показать');
			box.animate({height:shortHeight},speed);
		} else {
			cur.html('Скрыть');
			box.animate({height:fullHeight},speed);
		}
		cur.toggleClass('open');
		box.find('.mask').fadeToggle();
		e.preventDefault();
	});
}
/* show content end */

/*drop down*/
function dropDown() {
	$('.js-opener').on('click',function(e) {
		e.preventDefault();
		var cur = $(this);
		var multisel = $('div.cselect');
		var closeBtn = $('.popup-option .js-closers-drop');
		$('.js-opener').not(cur).removeClass('js-popup-opened');

		if ( !cur.hasClass('js-popup-opened') ) {
			cur.addClass('js-popup-opened');
			$(document).unbind('click.myEvent2');
			$('.js-popup').fadeOut(0);
			var drop = cur.parents('.js-popup-holder').find('.js-popup');
			var repalce = cur.parents('.alert-frame').find('.js-opener').addClass('icon-close-status');
			drop.fadeIn(300).addClass('open');
			var yourClick = true;

			$(document).bind('click.popupEvent', function (e) {
				e.preventDefault();
				if ($(e.target).closest(multisel).length == 1) {}
				else if (!yourClick  && $(e.target).closest(drop).length == 0 || $(e.target).closest(closeBtn).length == 1) {
					drop.fadeOut(300).removeClass('open');
					repalce.removeClass('icon-close-status');
					cur.removeClass('js-popup-opened');
					$(document).unbind('click.popupEvent');
				}
				yourClick  = false;
			});
		} else {
			$('.js-popup').fadeOut(0);
			$('.js-opener').removeClass('js-popup-opened');
		}
	});
}
/*drop down end*/

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

/* color label */
function colorLabel(){
	$('.sorting-list').find('.color').each(function (){
		var current = $(this);
		current.css('background', '#'+current.data("color"));
	})
}
/* colors label end */

/*browse photos*/
function browsePhotos(){
	// product carousel
	$('.previews-photos-list').bxSlider({
		pager: false,
		minSlides: 5,
		maxSlides: 5,
		slideWidth: 53,
		slideMargin: 4,
		moveSlides: 1,
		hideControlOnEnd: true,
		infiniteLoop: false
	});
	$('.previews-photos li a').on('click',function(e) {
		var cur = $(this);
		cur.parent().addClass('active');
		cur.parent().siblings().removeClass('active');
		var curImg = cur.attr('href');
		var largeImg = cur.parents('.browse-photos').find('.large-img');
		largeImg.find('img').hide().attr('src',curImg).fadeIn();
		e.preventDefault();
	});

	$('.large-img a').on('click',function(e) {
		var cur = $(this);
		var images = [];

		var curImg = cur.find('img').attr('src');
		var parent = $('.previews-photos');
		var parentSize = parent.find('ul').children().length;

		var cur_index = parent.find('[href="'+curImg+'"]').parents('li:eq(0)').index();
		for(var i=cur_index;i<parentSize;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		for(var i=0;i<cur_index;i++) {
			var img_href = parent.find('a:eq('+i+')').attr('href');
			images.push(img_href);
		}
		$.fancybox.open(images, {
			wrapCSS: 'gallery-zoom-wrap',
			padding:['0','0','0','0']
		});
		e.preventDefault();
	});
}
/*browse photos end*/

/*item class*/
function itemClass (){
	$('.description-list').find('tr').filter(':even').addClass('odd');
}
/*item class end*/

/* calculator */
function exponent(val, n){
	var answer = 1;
	var i = 0;
	for ( i; i<n; i++ ){
		answer = (answer * val);
	}
	return answer;
}

function calculator(){
	var calcHolder = $('#calculator');
	var forms = calcHolder.find('form');

	// table constants
	var monthPay = $('#month-pay');
	var allPay = $('#allpay');
	var repayVar = $('#repay');

	forms.each(function(index, form){
		function costUp(){
			var costField = $(form).find('[name="cost"]');
			var initialField = $(form).find('[name="initial_fee"]');
			costField.on('keyup', countCost);
			initialField.on('keyup', countCost);
			function countCost(){
				var costVal = parseInt(costField.val());
				var initialVal = parseInt(initialField.val());
				if ((costVal > 0 && !(costVal.toString() === 'NaN')) && !(initialVal.toString() === 'NaN')) {
					var total = costVal - initialVal;
					$('#num-amount').html(total);
					$(form).find('[name="credit_amount"]').val(total);
				} else {
					$('#num-amount').html(0);
					$(form).find('[name="credit_amount"]').val(0);
				}
			}
		}
		var submit = $(form).find(':submit');

		submit.on('click', function(e){

			var amount = parseInt($(form).find('[name="credit_amount"]').val());
			var ccrate = parseInt($(form).find('[name="rate"]').val());
			var ccmonth = parseInt($(form).find('[name="month"]').val());

			if ( (amount > 0 && !(amount.toString() === 'NaN')) && ( ccrate > 0 && !(ccrate.toString() === 'NaN') ) && ( ccmonth > 0 && !(ccmonth.toString() === 'NaN') )  ) {
				var type = $(form).find('[name="type_of_payment"]:checked').val();
				if( type === 'ann' ) {
					// выбран "Аннуитетный" платеж
					var creditAmount = parseInt($(form).find('[name="credit_amount"]').val());
					var rate = parseFloat(($(form).find('[name="rate"]').val() / (100*12)).toFixed(2));
					var month = parseInt($(form).find('[name="month"]').val());
					var monthPayment = creditAmount * ( rate + ( rate / ( exponent( 1 + rate, month ) - 1 ) ) );
					monthPayment = parseFloat(monthPayment.toFixed(2));
					var allPayment = parseFloat( (monthPayment*month).toFixed(2) );
					var rePay = parseFloat( ( (monthPayment * month) - creditAmount).toFixed(2));

					// Ежемесячный аннуитетный платеж
					monthPay.html(monthPayment+' <span class="rur">i</span>');
					// Выплаты за весь срок кредита
					allPay.html(allPayment+' <span class="rur">i</span>');
					// Переплата по кредиту
					repayVar.html(rePay+' <span class="rur">i</span>');

					// расчет на "Окончание выплат"
					var periodMonth = $(form).find('select.month').find(':selected').index()+1;
					if ( periodMonth < 10 ) periodMonth = '0'+periodMonth;
					var periodYear = $(form).find('select.year').val();
					var date = new Date(periodYear, periodMonth, 01);
					date.setMonth(date.getMonth() + month);
					var newDay = date.getDate();
					if ( newDay < 10 ) newDay = '0'+newDay;
					var newMonth = date.getMonth();
					if ( newMonth < 10 ) newMonth = '0'+newMonth;
					var newYear = date.getFullYear();
					var newDate = newDay+'.'+newMonth+'.'+newYear;
				} else {
					// выбран "Дифференцированный" платеж
					var creditAmount = parseInt($(form).find('[name="credit_amount"]').val());
					var rate = parseFloat($(form).find('[name="rate"]').val());
					var month = parseInt($(form).find('[name="month"]').val());
					var mainPay = (creditAmount/month);
					var i = 0;
					var rePay = 0;
					var firstMonthPayment = 0;
					var lastMonthPayment = 0;
					var monthPayment = 0;
					for (i; i<=month; i++){
						var Sn = creditAmount - (mainPay * i);
						var percent = Sn * rate / (100*12);
						rePay += percent;
						if ( i == 0 ) firstMonthPayment = parseFloat((mainPay+percent).toFixed(2));
						if ( i == (month-1) ) lastMonthPayment = parseFloat((mainPay+percent).toFixed(2));
					}
					rePay = parseFloat(rePay.toFixed(2));
					var allPayment = rePay + creditAmount;
					monthPayment = firstMonthPayment+'...'+lastMonthPayment;

					// Ежемесячный дифференцированный платеж
					monthPay.html(monthPayment+' <span class="rur">i</span>');
					// Выплаты за весь срок кредита
					allPay.html(allPayment+' <span class="rur">i</span>');
					// Переплата по кредиту
					repayVar.html(rePay+' <span class="rur">i</span>');

					// расчет на "Окончание выплат"
					var periodMonth = $(form).find('select.month').find(':selected').index()+1;
					if ( periodMonth < 10 ) periodMonth = '0'+periodMonth;
					var periodYear = $(form).find('select.year').val();
					var date = new Date(periodYear, periodMonth, 01);
					date.setMonth(date.getMonth() + month);
					var newDay = date.getDate();
					if ( newDay < 10 ) newDay = '0'+newDay;
					var newMonth = date.getMonth();
					if ( newMonth < 10 ) newMonth = '0'+newMonth;
					var newYear = date.getFullYear();
					var newDate = newDay+'.'+newMonth+'.'+newYear;
				}
				$('#results').slideDown();
			}
			e.preventDefault();
		});
		costUp();
	});
}
/* calculator end */

/* tooltip */
function tooltip(){ // обязательно подключить стили от UI, исправляет баг при быстром наведении несколько раз
	$(document).tooltip({
		items: '[data-tooltip]',
		content: function(){
			var el = $(this);
			var text = el.data('tooltip');
			var tpl = '<div class="tt-container">'+text+'</div>';
			return tpl;
		},
		position: {
			my: "left bottom",
			at: "center top",
			using: function(callback){
				var el = $(this);
				el.css(callback);
			}
		},
		hide: { duration: 200 }
	});
}
/* tooltip end */

/* searchExample */
function searchExample(){
	$('.search-holder .example span').on('click', function(){
		var html = $(this).html();
		$(this).parents('.info').find(':text').hide(0).val(html).fadeIn(300);
	});
}
/* searchExample end */

/*category group*/
function popupFunc(){
	var sortingList = $('.sorting-list');
	var sortingLink = sortingList.find('a');
	sortingLink.on('click', function(e){
		var current = $(this);
		var sortingWrap = current.closest('.tab');
		var currentLi = current.closest('li');
		currentLi.toggleClass('active');
		var stationNumber = currentLi.data('station');
		sortingWrap.find('label[data-station="'+stationNumber+'"]').find('input')
			.prop('checked', currentLi.hasClass('active'));
		e.preventDefault();
	});

	$('.popup input').on('change', function(){
		var cur = $(this).parent();
		var stationNum = cur.data('station');
		var tabWrap = cur.closest('.tab');
		var stationList = tabWrap.find('label[data-station="' + stationNum + '"]');
		var stationNumChecked = stationList.children('input').filter(':checked');
		tabWrap.find('li[data-station="'+stationNum+'"]').toggleClass('active', stationList.length == stationNumChecked.length);
	});

	/*clear function*/
	$('.popup').find('.btn-reset').on('click', function(e){
		var inputList = $(this).closest('.tab').find('.list-wrapper').find('input:checked');
		inputList.prop('checked', false).trigger('change');
		e.preventDefault();
	})
}

/*category group end*/

/* parseOption */
function popupOption(){
	// функция создания филтер-тега
	function createTag(tabWrapper, dataId, dataText) {
		var filterTagsWrapper = tabWrapper.find('.filters-tags-list');
		var filterTagItems = filterTagsWrapper.find('li');
		filterTagItems.filter('[data-filter-id=' + dataId + ']').remove();
		if (!dataText.length) {
			return;
		}
		var tpl = $('<li data-filter-id="' + dataId + '"><span class="text-inner">' + dataText + '</span><i class="icon-close-tag-white"></i></li>');

		var current = tabWrapper.find('[data-id=' + dataId + ']');

		var dataIdPrev = current.data('id-prev');
		if (dataIdPrev && dataIdPrev.length) {
			var tagPrev = filterTagItems.filter('[data-filter-id=' + dataIdPrev + ']');
			if (tagPrev.length) {
				tpl.insertAfter(tagPrev);
				return;
			}
		}

		var dataIdNext = current.data('id-next');
		if (dataIdNext && dataIdNext.length) {
			var tagNext = filterTagItems.filter('[data-filter-id=' + dataIdNext + ']');
			if (tagNext.length) {
				tpl.insertBefore(tagNext);
				return;
			}
		}

		tpl.appendTo(filterTagsWrapper).hide(0).fadeIn();
	}

	$('.filters-tags').on('click', '.icon-close-tag-white', function(){
		var current = $(this);
		var currentLi = current.closest('li');

		var liDataId = currentLi.data('filter-id');
		var dataElement = current.closest('.tab').find('[data-id=' + liDataId + ']');
		if(dataElement.length == 0){
			dataElement = $('.popup').find('[data-id=' + liDataId + ']');
		}
		dataElement.trigger('clearData');
		currentLi.fadeOut('fast', function(){
			$(this).remove();
		})
	});


	$('.search-box input:checkbox').click(function () {
		//текущий элемент
		var current = $(this);
		//находим ближайший родитель с классом "tab"
		var currentWrap = current.closest('.tab');
		//берем значение data-id-атрибута ближайшего label
		var wrapperLabel = current.closest('label');
		var dataId = wrapperLabel.data('id');
		// в текущем табе находим соответствующий тег и закрываем его
		function initDataText() {
			// если текущий чекбохс становится "кликнутым" то...
			if (!current.prop('checked')){
				return '';
			}
			// берем значени data-tag-артибута
			var dataText = wrapperLabel.data('tag');
			if (!dataText) {
				dataText = wrapperLabel.text();
			}
			return dataText;
		}
		// создаем тег текущего чекбокса с соответствующими атрибутами
		createTag(currentWrap, dataId, initDataText());
	});

	$('.check-rooms-list, .check-installment-list').on('clearData','label', function (){
		$(this).children('input').prop('checked', false);
	});

	// Год сдачи
	$('.search-box').on('change','select', function () {
		var current = $(this);
		if (current.multiselect("getChecked").length) {
			var tabWrapper = current.closest('.tab');
			var dataId = current.data('id');
			createTag(tabWrapper, dataId, current.val());
		}
	}).on('clearData','select', function (){
		$(this).multiselect('uncheckAll');
	});

	// поле поиска застройщика
	$('.search-field').on('change', 'input:text', function(){
		var current = $(this);
		var tabWrapper = current.closest('.tab');
		var dataId = current.parent('div').data('id');
		createTag(tabWrapper, dataId, current.val());
	});

	// цена
	$('.prices-filter').on('change', 'input:text', function(){
		var current = $(this);
		var tabWrapper = current.closest('.tab');
		var currentWrapper = current.parent('div');
		var dataId = currentWrapper.data('id');
		function initDataText() {
			var currentValue = current.val();
			if (!currentValue){
				return '';
			}
			return currentWrapper.data('tag').replace("{0}", currentValue);
		}
		createTag(tabWrapper, dataId, initDataText());
	});

	// расcтояние
	$('.to-metro').on('change', 'input:text', function(){
		var current = $(this);
		var tabWrapper = current.closest('.tab');
		var currentWrapper = current.parent('div');
		var dataId = currentWrapper.data('id');
		function initDataText() {
			var currentValue = current.val();
			if (!currentValue) {
				return;
			};
			tabWrapper.find('input:radio', '.radio-transport-list').on('change', function(){
				current.trigger('change');
			});
			var dataText = currentWrapper.data('tag').replace("{0}", currentValue)
				+ ' ' + current.closest('.form-row').find('input:checked', '.radio-transport-list').parent().text().toLowerCase();
			return dataText;
		}
		createTag(tabWrapper, dataId, initDataText());
	});

	$('.search-field, .prices-filter, .to-metro').on('clearData', '.input-holder', function (){
		$(this).children('input').val('');
	});

	// выбор ближайших станций метро, районов и направлений
	$('.popup').find('.save-change').on('click', function(e){
		$(this).closest('.tabs').find('.save-change').trigger('addFilterTag');
		$.fancybox.close();
		e.preventDefault();
	});

	$('.popup').find('.save-change').on('addFilterTag', function(e){
		var current = $(this);
		var dataTabWrapper = current.closest('.tab');
		var popupWrapper = dataTabWrapper.closest('.popup');

		var filterTabWrapper = $('.popup-open[href=#' + popupWrapper.attr('id') + ']').closest('.tab');
		var dataId = dataTabWrapper.data('id');
		function initDataText() {
			var countInputsChecked = dataTabWrapper.find('.list-wrapper').find('input').filter(':checked').length;
			if (countInputsChecked == 0){
				return '';
			}
			var nameCategory = popupWrapper.find('.tab-controls').find('li[data-id=' + dataId + ']').children('a').text();
			return nameCategory + ' [' + countInputsChecked + ']';
		}
		createTag(filterTabWrapper, dataId, initDataText());
	});
	$('.popup').on('clearData','.tab', function (){
		$(this).find('.btn-reset').trigger('click');
	});
}
/* parseOption end */

/*equalHeight*/
function equalHeightInit(){
	/*equal height for consultation list*/
	$('.consultation-list').find('ul').equalHeight();

	/*equal height for planning objects*/
	$('.planning-list').find('ul').equalHeight({
		amount: 3
	});

	/*equal height for part building*/
	$('.part-building').find('.column').equalHeight({
		amount: 3
	});
}
/*equalHeight end*/

/*vertical align*/
function vmiddleObject(obj, img){
	$(obj).each(function(){
		var bl = $(this);
		var bl_h = bl.height();
		var img_h = bl.find(img).height();
		var marg = (bl_h/2) - (img_h/2);
		bl.find(img).css('margin-top', marg);
	});
}
/*vertical align end*/

/** ready/load/resize document **/

$(document).ready(function(){
	inputFocus($('.input-holder'));
	customInputs($('.input-holder'));
	placeholder();
	placeholderMod();
	allSlider();
	googleMap();
	fancybox();
	tabs();
	customSelect($('select.cselect'));
	checkbox();
	showContent();
	dropDown();
	colorLabel();
	browsePhotos();
	itemClass ();
	resizeSlider();
	calculator();
	tooltip();
	searchExample();
	popupFunc();
	popupOption();
	equalHeightInit();
	vmiddleObject(".object-img", "img");
});
$(window).load(function(){
	footerBottom();
});
$(window).resize(function(){
	resizeSlider();
	equalHeightInit();
	vmiddleObject(".object-img", "img");
});