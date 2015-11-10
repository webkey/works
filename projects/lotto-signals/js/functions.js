/* placeholder */
function placeholder() {
	$('[placeholder]').placeholder();
}
/* placeholder end */

/* custom inputs */
function customInputs(objBlockInput) {
	if (objBlockInput.length) {
		var inp = ':text, :password, textarea, input[type="email"], input[type="search"]';
		objBlockInput.on('click', function () {
			var self = $(this);
			var curInp = self.find(inp).not('[disabled]');
			if (curInp.length) {
				self.addClass('focus');
				curInp.trigger('focus');
			}
		});
		objBlockInput.on('click, focus', inp, function (e) {
			$(e.delegateTarget).addClass('focus');
		});
		objBlockInput.on('blur', inp, function (e) {
			$(e.delegateTarget).removeClass('focus');
		});
	}
}
/* custom inputs end */

/* all sliders */
function allSlider() {
	// main slider
	$('.slider-list').bxSlider({
		responsive: true,
		useCSS: false,
		auto: true,
		pause: 5000,
		speed: 500
	});
	$('.hw-slider-list').bxSlider({
		responsive: true,
		useCSS: false,
		controls: false, 
		auto: true,
		pause: 5000,
		speed: 500,
		pagerCustom: '#how-work-pager'
	});
}
/* all sliders end */

/* stars */
function stars() {
	var wrap = $('.stars-function');
	var rate = wrap.find('span');
	var fullW = wrap.width();
	rate.each(function () {
		var $this = $(this);
		var defW = (parseInt($this.css('width')) / fullW) * 100;
		$this.css('width', defW + '%');
		$this.attr('data-def-width', defW);
	});
	wrap.on('mousemove', function (e) {
		var $this = $(this);
		var rate = $this.find('span');
		var offset = $this.offset();
		var posX = (e.pageX + 0.5) - offset.left;
		var moveW = (posX / fullW) * 100;
		rate.css('width', moveW + '%');
	});
	wrap.on('click', function (e) {
		var $this = $(this);
		var rate = $this.find('span');
		var w = rate.css('width');
		$this.addClass('new-edit');
		rate.data('def-width', w + '%');
		e.preventDefault();
	});
	wrap.on('mouseleave', function (e) {
		var $this = $(this);
		var rate = $this.find('span');
		var defW = rate.data('def-width');
		rate.css('width', defW + '%');
		var offset = $this.offset();
		var posX = (e.pageX - offset.left);
	});
}

// *********** IF CHECKED PIECE OF STAR *************

/* stars end */

/* datepicker */
function datepicker() {
	$('.date-from').datepicker({
		//minDate: 0,
		dateFormat: 'dd M yy',
		onClose: function (selectedDate) {
			if (selectedDate) {
				var maxDate = selectedDate.split('.');
				if (maxDate[1] != 12) {
					maxDate[1]++;
				} else {
					maxDate[1] = 1;
					maxDate[2]++;
				}
				maxDate = maxDate.join('.');
				$(this).parents('.datepickers').eq(0).find('.date-to').datepicker('option', 'minDate', selectedDate);
			}
		},
		onSelect: function () {
			$('#ui-datepicker-div').removeAttr('style');
			//$.fancybox.close();
		}
	});

	$('.date-to').datepicker({
		//minDate: 0,
		dateFormat: 'dd.mm.yy',
		onClose: function (selectedDate) {
			if (selectedDate) {
				$(this).parents('.datepickers').eq(0).find('.date-from').datepicker('option', 'maxDate', selectedDate);
			}
		},
		onSelect: function () {
			$('#ui-datepicker-div').removeAttr('style');
			//$.fancybox.close();
		}
	});
}
/* datepicker End */

/* Fancybox */
function fancybox() {
	/*popup-open-checker*/
	var popup = $('.popup-open-checker');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'fancybox-popup',
			padding: 0,
			margin: 10,
			openEffect: 'none',
			closeEffect: 'none',
			//scrolling: 'auto',
			//height: '90%'
			afterShow: function () {
				$('body').addClass('fancybox-opened-wrapper');
			},
			afterClose: function () {
				setTimeout(function () {
					$('body').removeClass('fancybox-opened-wrapper');
				}, 200);
			}
		});

		//$('.form-buttons input:submit').on('click', function (e) {
		//	$(this).closest('.form-buttons').find('.popup-open-checker').trigger('click');
		//	e.preventDefault();
		//});

		//$('body').on('click', '.jq-close-popup', function (e) {
		//	$.fancybox.close();
		//	e.preventDefault();
		//});
		//$('body').on('click', '.login-form .form-buttons [class*="btn-"]', function (e) {
		//	$.fancybox.close();
		//	e.preventDefault();
		//})
	}

	/*show skrin*/
	var popupImg = $('.show-skrin');
	if(popupImg.length){
		popupImg.fancybox({
			wrapCSS: 'fancybox-skrin',
			padding: 5,
			margin: 10,
			openEffect	: 'elastic',
			closeEffect	: 'elastic'
		});
	}
	/*show skrin end*/
}
/* Fancybox End */

/* tabs */
function tabs() {
	function scrollpanelTab(scrollpanellItem) {
		scrollpanellItem.customScrollbar({
			skin: "default-skin",
			hScroll: false,
			updateOnWindowResize: true
		});
	}

	var tabWrap = $('.tabs-wrap');
	if (!tabWrap) {
		return;
	}

	tabWrap.each(function () {
		var thisTabWrap = $(this);
		var activeControlIndex = thisTabWrap.first('.tab-controls-list').find('li.active').index();
		var tab = thisTabWrap.children('.tabs').children('.tab');
		tab.fadeOut(0).eq(activeControlIndex).fadeIn(0);

		/*init scrollpanelTab for active tab*/
		var tabActive = tab.eq(activeControlIndex);
		setTimeout(function () {
			scrollpanelTab(tabActive);
		}, 10);
	});

	$('.tab-controls-list').on('click', 'a', function (e) {
		var current = $(this);
		if (current.parent('li').hasClass('active')) {
			e.preventDefault();
			return;
		}

		var index = current.parent().index();
		current.closest('li').addClass('active').siblings().removeClass('active');
		var tab = current.closest('.tabs-wrap').children('.tabs').children('.tab');
		tab.fadeOut(0);
		var currentTab = tab.eq(index);
		currentTab.fadeIn();

		scrollpanelTab(currentTab);

		e.preventDefault();
	});

	/*equal tab*/
	var tabBox = $('.lottery-options');
	var controlsTabHeight = tabBox.find('.tab-controls-list').height();
	tabBox.find('.tab').css('height', controlsTabHeight);
}
/* tabs end */ 

/* UI Multiselect */
function customSelect(select) {
	if (select.length) {
		selectArray = new Array();
		select.each(function (selectIndex, selectItem) {
			var placeholderText = $(selectItem).attr('data-placeholder');
			var flag = true;
			if (placeholderText === undefined) {
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
				create: function (event) {
					var button = $(this).multiselect('getButton');
					var widget = $(this).multiselect('widget');
					button.wrapInner('<span class="select-inner"></span>');
					button.find('.ui-icon').append('<i class="arrow-select"></i>')
						.siblings('span').addClass('select-text');
					widget.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');
					if (flag) {
						$(selectItem).multiselect('uncheckAll');
						$(selectItem)
							.multiselect('widget')
							.find('.ui-state-active')
							.removeClass('ui-state-active')
							.find('input')
							.removeAttr('checked');
					}
				},
				selectedText: function (number, total, checked) {
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
function selectResize() {
	if (selectArray.length) {
		$.each(selectArray, function (i, el) {
			var checked = $(el).multiselect('getChecked');
			var flag = true;
			if (!checked.length) {
				flag = false
			}
			$(el).multiselect('refresh');
			if (!flag) {
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
function checkbox(objCheck,objRadio) {
	objCheck.checkbox({
		cls: 'jquery-checkbox'
	});
	objRadio.checkbox({
		cls: 'jquery-radiobox'
	});
}
/* checkbox/radiobox end */

/*equalHeight*/
function equalHeightInit() {
	/* resources list */
	var bonusesList = $('.resources-list');
	bonusesList.find('.resource-img').equalHeight({
		amount: 5,
		useParent: true,
		parent: bonusesList,
		resize: true
	});
	bonusesList.find('.resources-item').equalHeight({
		amount: 5,
		useParent: true,
		parent: bonusesList,
		resize: true
	});

	/*article box*/
	var article = $('.article');
	article.find('.article-box').equalHeight({
		amount: 2,
		useParent: true,
		parent: article,
		resize: true
	});

	/*my lotteries*/
	var myLotteries = $('.my-lotteries-list');
	myLotteries.find('.my-lotteries-text').equalHeight({
		amount: 2,
		useParent: true,
		parent: myLotteries,
		resize: true
	});
}
/*equalHeight end*/

/*add class item*/
function addClassItem() {
	var defaultTable = $('.default-table, .table-small');
	defaultTable.find('tr:even').addClass('even');
	defaultTable.find('tr td:last-child, tr th:last-child').addClass('last-child');
}
/*add class item end*/

/* Accordion init */
function accordionInit() {
	$(".accordion-box").accordion({
		heightStyle: "content",
		collapsible: true,
		active: true
	});
}
/* Accordion init end*/

/* checker results */
function checkerResult() {
	// view results checker
	$('.checker-form').on('click', '.btn-check-results :submit', function (e) {
		$(this).closest('.checker-wrapper').find('.checker-results').slideDown();
		e.preventDefault();
	});
	$('.checker-results').on('click', '.btn-close', function (e) {
		$(this).closest('.checker-results').slideUp();
		e.preventDefault();
	});

	//free lines checker
	$('.free-lines').on('click', '.open-drop', function (e) {
		var currentDrop = $(this).closest('table').next('.free-lines-drop');
		currentDrop.slideDown(function () {
			currentDrop.find('.btn-close').fadeIn(800);
		});
		e.preventDefault();
	});
	$('.free-lines-drop').on('click', '.btn-close', function (e) {
		var currenBtn = $(this);
		currenBtn.closest('.free-lines-drop').slideUp(function () {
			currenBtn.hide(0);
		});
		e.preventDefault();
	});
}
/* checker results end*/

/* anchors */
jQuery(document).ready(function () {
	jQuery('a[href*=#].anchor').bind("click", function (e) {
		var anchor = jQuery(this);
		jQuery('html, body').stop().animate({
			scrollTop: jQuery(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
	});
	return false;
});
/* anchors end */

/*back to top*/
function backToTop() {
	var offset = 220;
	var duration = 500;

	var btnToTop = jQuery('.back-to-top');

	$(window).scroll(function () {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
		} else {
			$('.back-to-top').fadeOut(duration);
		}
	});

	btnToTop.click(function (event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
}
/*back to top end*/

/*nav drop dynamic styling*/
function equalDrop(firstDrop, secondDrop, thirdDrop) {
	firstDrop.height('auto');
	secondDrop.height('auto');
	thirdDrop.height('auto');

	var firstDropHeight = firstDrop.height();
	var secondDropHeight = secondDrop.height();
	var thirdDropHeight = thirdDrop.height();

	if (thirdDropHeight > secondDropHeight) {
		secondDropHeight = thirdDropHeight;
		secondDrop.height(thirdDropHeight);
	} else {
		thirdDrop.height(secondDropHeight);
	}

	if (secondDropHeight > firstDropHeight) {
		firstDrop.height(secondDropHeight);
	} else {
		secondDrop.height(firstDropHeight);
	}
}

function dropMenu() {
	$('.nav')
		.on('mouseenter', '.nav-list>.has-drop>strong>a', function () {
			if ($(window).width() < 768) { return; }

			var current = $(this);

			var firstDrop = current.closest('li').find('.first-drop-list');
			var secondDrop = firstDrop.find('li.active > .second-drop');
			var thirdDrop = secondDrop.find('li.active > .third-drop');

			equalDrop(firstDrop, secondDrop, thirdDrop);

		})
		.on('mouseenter', '.first-drop-list>li.has-drop', function () {
			if ($(window).width() < 768) { return; }

			var firstDropItem = $(this);
			firstDropItem.siblings('li').removeClass('active');
			firstDropItem.addClass('active');

			var firstDrop = firstDropItem.closest('.first-drop-list');
			var secondDrop = firstDropItem.find('.second-drop');
			var thirdDrop = firstDropItem.find('li.active .third-drop');

			equalDrop(firstDrop, secondDrop, thirdDrop);
		})
		.on('click', '.second-drop>.holder>.drop-list>li.has-drop>a', function (e) {
			if ($(window).width() < 768) { return; }
			e.preventDefault();

			var secondDropItem = $(this);
			secondDropItem.closest('.second-drop').find('li').removeClass('active');
			$('.third-drop').hide(0);
			secondDropItem.closest('li').addClass('active');

			var firstDrop = secondDropItem.closest('.first-drop-list');
			var secondDrop = secondDropItem.closest('.second-drop');
			var thirdDrop = secondDropItem.closest('li').find('.third-drop');

			thirdDrop.show(0);

			equalDrop(firstDrop, secondDrop, thirdDrop);
		})
}
/*nav drop dynamic styling end*/

/* has drop menu */
function hasDropMenu() {
	var item = $('.nav-list > li');
	item.find('.first-drop').closest('li').addClass('has-drop');
	$('.nav-list > li.has-drop:not(.hide-drop-on-device) > strong > a').prepend('<span class="arrow-drop" />');

	var subItem = $('.nav-list > li li');
	subItem.find('ul').closest('li').addClass('has-drop');
	$('.nav-list > li li.has-drop:not(.hide-drop-on-device)').children('a').prepend('<span class="arrow-drop" />');

	var itemOption = $('.user-options > li');
	itemOption.find('.user-options-drop').closest('li').addClass('has-drop');
}
/* has drop menu end */

/*drop menu position*/
function dropPosition() {
	$('.nav-holder').on('mouseenter', '.has-drop>strong>a', function () {
		if ($(window).width() < 768) { return; }
		var current = $(this);
		var item = current.closest('li');
		if (item.hasClass('aligned')) {
			return;
		}

		item.addClass('aligned');
		var drop = item.find('.first-drop');
		if( !drop.length ){
			return;
		}
		var itemLeftPosition = item.position().left;
		var dropOuterWidth = drop.outerWidth();
		var halfWidthItem = item.outerWidth() / 2;
		var cornerDrop = item.find('.corner-drop');
		var halfWidthCorner = cornerDrop.width() / 2;
			drop.css({
				'left': '50%',
				'margin-left': - dropOuterWidth / 2
			});
			cornerDrop.css({
				'left': '50%',
				'margin-left': - halfWidthCorner
			});

		if ((itemLeftPosition + halfWidthItem) < (dropOuterWidth / 2)) {
			drop.css({
				'left': '50%',
				'margin-left': -itemLeftPosition - halfWidthItem
			});
			cornerDrop.css({
				'left': 0,
				'margin-left': itemLeftPosition + halfWidthItem - halfWidthCorner
			});
			return;
		}
		var wrapper = current.closest('.nav');
		var wrapperRight = wrapper.offset().left + wrapper.outerWidth();
		var dropRight = item.offset().left + dropOuterWidth / 2 + halfWidthItem;

		if (dropRight > wrapperRight) {
			var dropShiftRight = wrapperRight - dropRight;
			drop.css('margin-left', - dropOuterWidth / 2 + dropShiftRight);
			cornerDrop.css('margin-left', - halfWidthCorner - dropShiftRight);
		}
	});
}
/*drop menu position end*/

/*choose language*/
function languageChoose() {
	if (!$('.languages').length) { return; }
	var easy = 200;

	$('.languages > a').on('click', function (e){
		if ($(window).width() > 767) { return; }
		e.stopPropagation();
		var current = $(this);
		var currentParentLi = current.closest('.languages');

		current.closest('.header').find('.nav-holder').slideUp(easy, function () {
			$(this).closest('.header').find('.btn-nav').toggleClass('active', $(this).is(':visible'), function () {
				currentParentLi
					.addClass('active')
					.find('.user-options-drop').fadeToggle(easy, function () {
						currentParentLi.toggleClass('active', $(this).is(':visible'));
					});
			});
		});
	});

	$('.user-options-drop').on('click', function (e) {
		e.stopPropagation();
	});

	$(document).on('click', function () {
		if ($(window).width() > 767) { return; }
		var userOptionDrop = $('.user-options-drop');
		userOptionDrop.fadeOut(easy);
		userOptionDrop.closest('.languages').removeClass('active');
	});

	$(window).resize(
		function hideDrop() {
			if ($(window).width() < 768) {
				var userOptionDrop = $('.user-options-drop');
				userOptionDrop.show(0).hide(0);
				userOptionDrop.closest('.languages').removeClass('active');
				userOptionDrop.attr('style','');
			}
		}
	);
}
/*choose language end*/

/*drop accordion*/
function dropAccordion() {
	var easy = 200;
	var navigationList = $('.nav-list');
	if (!navigationList.length) {
		return;
	}

	$('.btn-nav').on('click', function (e) {
		var current = $(this);

		var headerHeight = current.closest('.wrapper').find('.header').outerHeight();
		var windowHeight = $(window).height();
		current
			.addClass('active')
			.closest('.header')
			.find('.nav-holder')
			.height(windowHeight - headerHeight)
			.stop().slideToggle(easy, function () {
				$(this)
					.closest('.header')
					.find('.btn-nav').toggleClass('active', $(this).is(':visible'));
			});

		e.preventDefault();
	});

	navigationList.find('li.has-drop:not(.hide-drop-on-device) > strong > a').on('click', function (e) {
		if($(window).width() > 767) {
			return;
		}
		var current = $(this);
		current
			.closest('li')
			.find('.first-drop').stop().slideToggle(easy)
			.end()
			.siblings()
			.find('.first-drop').slideUp(easy);
		current
			.toggleClass('active')
			.closest('li')
			.siblings()
			.find('a').removeClass('active');

		e.preventDefault();
	});

	$('.first-drop-list > li.has-drop:not(.hide-drop-on-device) > a').on('click', function (e) {
		if($(window).width() > 767) {
			return;
		}
		var current = $(this);
		current
			.closest('li')
			.children('.second-drop').stop().slideToggle(easy);
		current
			.toggleClass('active')
			.closest('li')
			.siblings()
			.find('a').removeClass('active')
			.closest('li')
			.children('.second-drop').slideUp(easy);

		e.preventDefault();
	});

	$('.second-drop li.has-drop:not(.hide-drop-on-device) > a').on('click', function (e) {
		if($(window).width() > 767) {
			return;
		}
		var current = $(this);
		current
			.toggleClass('active')
			.closest('li')
			.children('.third-drop').stop().slideToggle(easy);
		current
			.closest('li')
			.siblings()
			.find('a').removeClass('active');
		current
			.closest('li')
			.siblings()
			.find('.third-drop').slideUp(easy);
		current
			.closest('.drop-list')
			.siblings()
			.find('a').removeClass('active');
		current
			.closest('.drop-list')
			.siblings()
			.find('.third-drop').slideUp(easy);

		e.preventDefault();
	});
}
/*drop accordion end*/

/*delete item*/
function deleteItem() {
	$('.my-lotteries-list').on('click', '.icon-basket', function (e) {
		$(this).closest('li').fadeOut('fast', function () {
			$(this).remove();
		});

		e.preventDefault();
	});
}
/*delete item end*/

/*scroll menu*/
function scrollMenu() {
	$('.scroll-menu').singlePageNav({
		offset: 20,
		threshold: 20
	});
}
/*scroll menu end*/

/*sidebar fixed*/
function fixedSidebar() {
	var offsetTop = 20;
	$(".aside-holder").stick_in_parent({
		parent: '.sf-content-wrapper',
		offset_top: offsetTop,
		bottoming: true,
		spacer: false
	});
}
/*sidebar fixed end*/

/*initial Scrollpanel*/
function initScrollpanel() {
		$('.scrollpanel').customScrollbar({
			skin: "default-skin",
			hScroll: false,
			updateOnWindowResize: true
		});
}
/*initial Scrollpanel end*/

/*only number for inputs*/
function numeric() {
	var numericInput = $(".numbers-list input:text, .supper-ball input:text");
	numericInput.numeric();
	numericInput.attr('maxlength', '2');
}
/*only number for inputs end*/

/*check your numbers*/
counterGameLottery = 0;
function checkYourNumber(){

	$('.selects-area').on('change', '.choose-game-select', function(){
		var currentSelect = $(this);
		var selectItem = currentSelect.closest('.select-item');

		var chooseGameSelect = currentSelect.closest('.choose-game').find('.choose-game-select');
		var checkedGame = chooseGameSelect.val();

		var viewGameBox = selectItem.find('.view-game');
		var viewGameBoxContent = viewGameBox.contents();
		if(viewGameBoxContent.length){
			viewGameBoxContent.remove();
		}

		var gameTemplates = $('.game-templates');
		gameTemplates.find('select').multiselect('destroy');

		gameTemplates.find('.'+'game-template-'+checkedGame).clone().appendTo(viewGameBox);

		customSelect(viewGameBox.find('select.cselect'));

		customSelect($('.game-templates select.cselect'));

		counterGameLottery ++;
		viewGameBox.find('input:checkbox').each(function () {
			$(this).addClass('def-ch');
		});
		viewGameBox.find('input:radio').each(function () {
			$(this).attr('name','check-numbers-time-'+counterGameLottery).addClass('def-radio');
		});
		checkbox(viewGameBox.find('.def-ch'),viewGameBox.find('.def-radio'));

		customInputs(viewGameBox.find('.input-holder'));
		numeric();

		if (checkedGame != 0) {
			currentSelect.closest('.choose-game').find('.add-game').show(0);
		}
	});

	$('.selects-area').on('click', '.add-game', function(){
		var currentBtnAdd = $(this);
		if(currentBtnAdd.closest('.one-game').length){
			return;
		}
		var selectItem = currentBtnAdd.closest('.select-item');

		if(selectItem.hasClass('ready')) {
			selectItem.remove();
			return;
		}

		var cloneSelectItem = selectItem.clone();
		counterGameLottery ++;

		cloneSelectItem.attr('id','select-item-'+counterGameLottery).appendTo('.selects-area');

		cloneSelectItem.find('.view-game').contents().remove();

		selectItem.addClass('ready');

		var optionsSelect = cloneSelectItem.find('.cselect').html();
		cloneSelectItem.find('.cselect').remove();
		cloneSelectItem.find('.select-holder')
			.append('<select class="cselect choose-game-select" data-placeholder="Choose Lottery" />');
		cloneSelectItem.find('.cselect')
			.append(optionsSelect);
		customSelect(cloneSelectItem.find('select.cselect'));

		cloneSelectItem.find('.datepicker :text').remove();
		cloneSelectItem.find('.datepicker')
			.prepend('<input type="text" placeholder="Select Date" class="date-from" readonly />');
		datepicker();

		customInputs(cloneSelectItem.find('.input-holder'));
		cloneSelectItem.find('.add-game').hide(0);
	});
}
/*check your numbers end*/

/*check your numbers*/
counterOneGame = 0;
function checkYourNumberOneGame(){
	if(!$('.one-game').length){
		return;
	}
	$('.one-game').on('click', '.add-game', function(){

		var currentBtnAdd = $(this);
		var selectItem = currentBtnAdd.closest('.select-item');

		if(selectItem.hasClass('ready')) {
			selectItem.remove();
			return;
		}

		var cloneSelectItem = selectItem.clone();
		counterOneGame ++;

		cloneSelectItem.attr('id','select-item-'+counterOneGame).appendTo('.selects-area');

		selectItem.addClass('ready');

		var optionsSelect = cloneSelectItem.find('.cselect').html();
		cloneSelectItem.find('.cselect').remove();
		cloneSelectItem.find('.select-holder')
			.append('<select class="cselect choose-game-select" data-placeholder="Choose Lottery" />');
		cloneSelectItem.find('.cselect')
			.append(optionsSelect);
		customSelect(cloneSelectItem.find('select.cselect'));

		cloneSelectItem.find('.datepicker :text').remove();
		cloneSelectItem.find('.datepicker')
			.prepend('<input type="text" placeholder="Select Date" class="date-from" readonly />');
		datepicker();

		customInputs(cloneSelectItem.find('.input-holder'));
	})
}
/*check your numbers end*/

/*tooltip init*/
function tooltipInit(){
	$( 'a[title]' ).tooltip({
		position: {
			my: "left bottom",
			at: "right top"
		}
	});
}
/*tooltip init end*/

/*state label*/
function stateLabel() {
	var duration = 200;
	var intervalID;
	$('#states a').hover(
		function () {
			var dataNameState = $(this).data('state');
			var classesState = $(this).attr('class');
			var currentState = $(this);
			intervalID = setTimeout(
				function () {
					currentState
						.closest('.map-area')
						.find('.state-label')
						.fadeIn(duration)
						.text(dataNameState)
						.addClass(classesState);
				}, 200);
		},
		function () {
			var currentState = $(this).closest('.map-area').find('.state-label');
			currentState
				.fadeOut(duration, function () {
					setTimeout(function () {
						currentState.removeClass('disabled inverse');
					}, 100)
				})
			;
			clearInterval(intervalID);
		})
}
/*state label end*/

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

/* chooseNumbersLotto */
function chooseNumbersLotto(){
	// filter tag creation function
	function createTag(tabWrapper, dataId, dataTypeNumbers, dataText) {
		var filterTagsWrapper = tabWrapper.find('.selected-numbers .lottery-numbers').filter('[data-type-results=' + dataTypeNumbers + ']');
		var filterTagItemsFirstEmpty = filterTagsWrapper.find('.empty:eq(0)');
		var filterTagItems = filterTagsWrapper.find('.lottery-ball');

		filterTagItems.filter('[id=' + dataId + ']').text('').addClass('empty');
		if (!dataText.length) {
			return;
		}
		filterTagItemsFirstEmpty.text(dataText).attr('id', dataId).removeClass('empty');
	}


	$('.selected-numbers .lottery-ball').on('click', function(){
		var current = $(this);
		current.text('').addClass('empty');

		var currentDataId = current.attr('id');
		var currentWrapper = current.closest('.numbers-checker-wrapper');
		var dataElement = currentWrapper.find('[data-id=' + currentDataId + ']');
		dataElement.trigger('clearData');
		current.removeAttr('id');

		var dataTypeNumbers = current.closest('.lottery-numbers').data('type-results');
		currentWrapper
			.find('.lottery-numbers')
			.filter('[data-type-numbers=' + dataTypeNumbers + ']')
			.find('input:checkbox')
			.prop( "disabled", false )
			.closest('label').removeClass('jquery-checkbox-disabled');
	});

	$('.numbers-container input:checkbox').click(function () {
		//current element
		var current = $(this);
		if(current.hasClass('empty')){
			return;
		}
		//find nearest element with "tab" class
		var currentWrap = current.closest('.numbers-checker-wrapper');
		var wrapperLabel = current.closest('label');
		var dataTypeNumbers = current.closest('.lottery-numbers').data('type-numbers');

		current.attr('data-id',dataTypeNumbers + '-' + wrapperLabel.find('.label-text').text());
		var dataId = current.data('id');
		function initDataText() {
			if (!current.prop('checked')){
				return '';
			}
			var dataText = wrapperLabel.data('tag');
			if (!dataText) {
				dataText = wrapperLabel.find('.label-text').text();
			}
			return dataText;
		}

		createTag(currentWrap, dataId, dataTypeNumbers, initDataText());

		var maxLength = currentWrap.find('.selected-numbers .lottery-numbers').filter('[data-type-results=' + dataTypeNumbers + ']').find('li').length;
		var checkboxIsChecked = current.closest('.lottery-numbers').find('input:checkbox:checked');
		var currentLength = checkboxIsChecked.length;
		current
			.closest('.lottery-numbers')
			.find('input:checkbox:disabled').prop( "disabled", false )
			.closest('label').removeClass('jquery-checkbox-disabled');
		if (currentLength == maxLength) {
			current.closest('.lottery-numbers').find('input:checkbox').prop( "disabled", true );
			checkboxIsChecked.prop( "disabled", false);
			current.closest('.lottery-numbers').find('input:disabled').closest('label').addClass('jquery-checkbox-disabled');
		}
	});

	$('.numbers-container').on('clearData','input:checkbox:checked', function (){
		$(this).prop('checked', false);
	});

	$('.number-checker-form').on('click', 'input:reset', function () {
		var btnReset = $(this);
		var btnResetParentForm = btnReset.closest('.number-checker-form');
		btnResetParentForm
			.find('label')
			.removeClass('jquery-checkbox-disabled');
		btnResetParentForm
			.find('.selected-numbers .lottery-ball')
			.text('')
			.addClass('empty')
			.removeAttr('id');
	});
}
/* chooseNumbersLotto end */

/*generated numbers*/
function generatedNumbers() {
	function openCheckerList(current, checkerList) {
		if (current.val() == 'numbers-check-list') {
			checkerList.slideDown();
			return;
		}
		checkerList.slideUp();
	}

	var numbersRadioList = $('.numbers-radio-list');
	numbersRadioList.on('change', ':radio', function () {
		var current = $(this);
		var checkerList = current.closest('.box').find('.numbers-check-list');
		openCheckerList(current, checkerList);
	});
	
	numbersRadioList.on('click', '.input-holder', function () {
		var current = $(this);
		var siblingRadio = current.closest('li').find(':radio');
		if (!siblingRadio.prop('checked')) {
			siblingRadio.prop('checked', true).trigger('change');
		}
	});

	numbersRadioList.find(':radio:checked').trigger('change');
}
/*generated numbers end*/

/*fixed header*/
function fixedHeaderInit(){
	var header = $('.header');
	var substrateHeader = $('<div class="substrate-header">');
	header.before(substrateHeader);

	var flagPositionFixed = false;
	function fixedHeader() {
		if ($(window).width() > 991) {
			header.removeClass('fixed-position');
			flagPositionFixed = false;
			return;
		}
		if (flagPositionFixed == true){
			return;
		}
		header.addClass('fixed-position');

		flagPositionFixed = true;
	}
	$(document).ready(fixedHeader);
	$(window).resize(fixedHeader);
}
/*fixed header end*/

/*listToSelect*/
function listToSelect(){
 $("<select />").appendTo(".mag-intro-nav-bar .select-holder");
 $(".mag-intro-nav-bar ul a").each(function(index, element) {
  var el = $(this);
  if (el.hasClass('activ-menu-item')){
   var activeIndex = $(this).parent().index();
  }
  $("<option />", {
   "value"   : el.attr("href"),
   "text"    : el.text()
  }).appendTo(".mag-intro-nav-bar select");
  $('.mag-intro-nav-bar select option:eq('+activeIndex+')').addClass('active');
 });
 $(".mag-intro-nav-bar select").change(function() {
  window.location = $(this).find("option:selected").val();
 });
 var createdSelect = $('.mag-intro-nav-bar').find('select');
 createdSelect.multiselect({
  header: false,
  height: 'auto',
  minWidth: 50,
  selectedList: 1,
  classes: 'cselect',
  multiple: false,
  show: ['fade', 100],
  hide: ['fade', 100],
  create: function (event) {
   var button = $(this).multiselect('getButton');
   var widget = $(this).multiselect('widget');
   button.wrapInner('<span class="select-inner"></span>');
   button.find('.ui-icon').append('<i class="arrow-select"></i>')
    .siblings('span').addClass('select-text');
   var textActiveOption = createdSelect.find('.active').text();
   button.find('.select-text').text(textActiveOption);
  },
  position: {
   my: 'left top',
   at: 'left bottom'
  }
 });
 $(window).resize(function(){
  createdSelect.multiselect('close');
 })
}
/*listToSelect end*/

/*anchors list*/
function anchorList(){
	$('ul.categories-menu.child').animate({
		height: "toggle"
	}, 0);
	$('ul.categories-menu li.parent > a').on('click', function(e){
		var childernUl = $(this).parent().find('ul.categories-menu.child');
		childernUl.animate({
			height: 'toggle'
		},{
			step: function() {
				setTimeout(function () {
					$(document.body).trigger("sticky_kit:recalc");
				}, 30)
			}
		});
		$(this).parent().toggleClass('open');
		$(this).find('i:last-child').toggleClass('arrow-list-active arrow-list');

		e.preventDefault();
	});
}
/*anchors list end*/

/*filter list*/
function filtersList(){
	$('.filters-list').on('click', 'button', function () {
		var currentBtn = $(this);
		var currentWrapper = currentBtn.closest('.add-lottery-drop');
		currentWrapper.find('button').removeClass('asc');
		currentBtn.addClass('asc');
		var dataFilter = currentBtn.data('filter');
		currentWrapper.find('.add-games-list li').hide(0);
		currentWrapper.find('.add-games-list li[data-filter-item="'+dataFilter+'"]').show(0);
		if(currentWrapper.find('.add-games-list li[data-filter-item="'+dataFilter+'"]').length == 0){
			currentWrapper.find('.add-games-list li').show(0);
		}
	})
}
/*filter list end*/

/*filter subscribe list*/
function filtersList(){
	$('.filters-list').on('click', 'button', function () {
		var currentBtn = $(this);
		var currentWrapper = currentBtn.closest('.add-lottery-drop');
		currentWrapper.find('button').removeClass('asc');
		currentBtn.addClass('asc');
		var dataFilter = currentBtn.data('filter');
		currentWrapper.find('.add-games-subscribe-list li').hide(0);
		currentWrapper.find('.add-games-subscribe-list li[data-filter-item="'+dataFilter+'"]').show(0);
		if(currentWrapper.find('.add-games-subscribe-list li[data-filter-item="'+dataFilter+'"]').length == 0){
			currentWrapper.find('.add-games-subscribe-list li').show(0);
		}
	})
}
/*filter subscribe list end*/

/*show drop add lottery*/
function showDropAddLottery(){
	$('.add-lottery-wrapper').on('click', '.add-lottery-opener', function (e) {
		e.stopPropagation();
		$('.add-lottery-opener.active').removeClass('active');
		$('.add-lottery-drop').stop().fadeOut('fast');

		var currentButtonOpener = $(this);
		var currentDrop = currentButtonOpener.closest('.add-lottery-wrapper').find('.add-lottery-drop');
		if (currentDrop.is(':hidden')) {
			currentButtonOpener.toggleClass('active');
			currentDrop.show(0);
		}
		currentDrop.find('.filters-list button.asc').trigger('click');

		if(currentDrop.find('.add-games-list li').length <= 0){
			currentDrop.find('.add-games-list').prepend('<li style="text-align: center">Games list is empty</li>');
		}

		currentDrop.removeClass('position-left');
		currentDrop.removeClass('position-right');

		var dropPositionLeft = currentDrop.offset().left;
		var dropWidth = currentDrop.outerWidth();
		var documentWidth = $(document).width();
		var dropPositionRight = dropPositionLeft + dropWidth;
		if(dropPositionLeft < 0){
			currentDrop.addClass('position-left');
		}
		if(dropPositionRight > documentWidth){
			currentDrop.addClass('position-right');
		}
		e.preventDefault();
	});

	$('.add-lottery-drop').on('click', function (e) {
		e.stopPropagation();
	});

	$(document).on('click', function () {
		$('.add-lottery-opener').removeClass('active');
		$('.add-lottery-drop').stop().fadeOut('fast');
	});

	$('.add-lottery-inner .add-games-list').on('click', 'a', function (e) {
		var delay = 3000;
		var currentGame = $(this);
		currentGame.closest('li').fadeIn(function () {
			setTimeout(function () {
				currentGame.closest('li').remove();
			}, 500);
		});

		var btnTempRemove = $('<a href="javascript:void(0)" class="added-lottery">Lottery has been added</a>');
		currentGame.closest('.add-lottery-drop').fadeOut('fast', function(){
			currentGame.closest('.add-lottery-wrapper').find('.add-lottery-opener').removeClass('active');
			var hideButtonWrapper = currentGame.closest('.alt-title');
			var hideButton = hideButtonWrapper.find('.add-lottery-opener');
			hideButton.fadeOut('fast', function () {
				hideButton.before(btnTempRemove);
				setTimeout(function(){
					btnTempRemove.fadeOut('easy', function(){
						hideButton.fadeIn();
					});
				}, delay);
			});
		});

		e.preventDefault();
	});

	/** add new game*/

	var oneTempNewGame = $(
		'<li>' +
			'<div class="manager-item">' +
				'<div class="manager-img">' +
					'<img src="" alt="image description">' +
				'</div>' +
				'<div class="manager-content">' +
					'<p class="flag-label-title"><i class=""></i> <span class="country"></span></p>' +
				'</div>' +
				'<div class="options-cover">' +
					'<a class="btn-frame-dark-sm remove-item" href="#">Remove</a>' +
					'<a class="btn-frame-dark-sm" href="#">Lottery page</a>' +
				'</div>' +
			'</div>' +
		'</li>'
	);
	
	var oneTempNewGameSubscr = $(
		'<li class="pres-item">' +
			'<div class="manager-item">' +
				'<div class="manager-img">' +
					'<img src="" alt="image description">' +
				'</div>' +
				'<div class="manager-content">' +
					'<p class="flag-label-title"><i class=""></i> <span class="country"></span></p>' +
				'</div>' +
				'<div class="options-cover">' +
					'<a class="btn-frame-dark-sm" href="#">Lottery page</a>' +
					'<a class="btn-frame-dark-sm edit-subscription-opener">Edit Subscription</a>' +
					'<div class="edit-subscription-drop" id="subscription-drop">' +
						'<div class="holder">' +
							'<p>Wich alerts would you like to receive?</p>' +
							'<ul class="check-list">' +
								'<li>' +
									'<label class="check">' +
										'<input class="def-ch" type="checkbox" checked="checked" />&nbsp;&nbsp;<span class="label-text">Results</span>' +
									'</label>' +
								'</li>' +
								'<li>' +
									'<label class="check">' +
										'<input class="def-ch" type="checkbox" />&nbsp;&nbsp;<span class="label-text">Jackpots</span>' +
									'</label>' +
								'</li>' +
							'</ul>' +
							'<div class="form-buttons">' +
								'<div class="btn-frame-grey"><span>Cancel</span><input type="reset" value="" /></div>' +
								'<div class="btn-frame-blue"><span>Ok</span><input type="submit" value="" /></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<a class="btn-frame-dark-sm remove-item">Unsubscribe</a>' + 
				'</div>' +
			'</div>' +
		'</li>'
	);
	
	/** add new game subscription*/
	
	$('.manager-list .add-games-subscribe-list').on('click', 'a', function (e) {
		var currentGame = $(this);
		currentGame.closest('li').css({
			'height': 0
		});
		currentGame.closest('li').attr('id','new-game-item-created-'+count+'');
		var dataSrc = currentGame.data('src');
		var dataFlag = currentGame.data('flag');
		var dataCountry = currentGame.data('country');

		var newGameClone = oneTempNewGameSubscr.clone();
		newGameClone.attr('data','new-game-item-created-'+count+'');
		count++;
		newGameClone.find('.manager-img img').attr('src', dataSrc);
		newGameClone.find('.flag-label-title > i').addClass(dataFlag);
		newGameClone.find('.country').text(dataCountry);

		currentGame.closest('.add-lottery-drop').fadeOut('fast', function(){
			currentGame.closest('.add-item').before(newGameClone);
		});
		
		newGameClone.find('.def-ch').checkbox({
			cls: 'jquery-checkbox'
		});

		e.preventDefault();
	});

	var count = 0;
	$('.manager-list .add-games-list').on('click', 'a', function (e) {
		var currentGame = $(this);
		currentGame.closest('li').css({
			'height': 0
		});
		currentGame.closest('li').attr('id','new-game-item-created-'+count+'');
		var dataSrc = currentGame.data('src');
		var dataFlag = currentGame.data('flag');
		var dataCountry = currentGame.data('country');

		var newGameClone = oneTempNewGame.clone();
		newGameClone.attr('data','new-game-item-created-'+count+'');
		count++;
		newGameClone.find('.manager-img img').attr('src', dataSrc);
		newGameClone.find('.flag-label-title > i').addClass(dataFlag);
		newGameClone.find('.country').text(dataCountry);

		currentGame.closest('.add-lottery-drop').fadeOut('fast', function(){
			currentGame.closest('.add-item').before(newGameClone);
		});

		e.preventDefault();
	});
	
	$('.manager-list').on('click', '.edit-subscription-opener', function (e) {
		e.stopPropagation();
		$('.edit-subscription-opener.active').removeClass('active');
		$('.edit-subscription-drop').stop().fadeOut('fast');

		var currentButtonOpener = $(this).parent();
		var currentDrop = currentButtonOpener.closest('.options-cover').find('.edit-subscription-drop');
		if (currentDrop.is(':hidden')) {
			currentButtonOpener.toggleClass('active');
			currentDrop.show(0);
		}
		e.preventDefault();
	}); 

	$('.edit-subscription-drop').on('click', function (e) {
		e.stopPropagation();
	});
	
	$('.form-buttons input').on('click', function (e) {
		$('.options-cover').removeClass('active');
		$('.edit-subscription-drop').stop().fadeOut('fast');
	});
	
	$('.manager-list').on('click', 'input', function (e) {
		$('.options-cover').removeClass('active');
		$('.edit-subscription-drop').stop().fadeOut('fast');
	});

	$(document).on('click', function () {
		$('.options-cover').removeClass('active');
		$('.edit-subscription-drop').stop().fadeOut('fast');
	}); 

	$('.manager-list').on('click', '.remove-item', function (e) {
		var current = $(this);
		var removeId = current.closest('li').attr('data');
		current.closest('.manager-list').find('#'+removeId+'').css('height','auto');
		current.closest('li').fadeOut('fast', function () {
			$(this).remove();
		});

		e.preventDefault();
	});
}
/*show drop add lottery end*/

/*edit subscription drop show*/
function editSubscriptionDropshow(){
	
}
/*edit subscription drop show end*/

/*user login drop show*/
function userLoginDropshow(){
	$('.user-login-list').on('click', '.user-login-opener', function (e) {
		e.stopPropagation();
		$('.user-login-opener.active').removeClass('active');
		$('.user-login-drop-box').stop().fadeOut('fast');

		var currentButtonOpener = $(this);
		var currentDrop = currentButtonOpener.closest('.user-login-list').find('.user-login-drop-box');
		if (currentDrop.is(':hidden')) {
			currentButtonOpener.toggleClass('active');
			currentDrop.show(0);
		}
		e.preventDefault();
	});

	$('.user-login-drop-box').on('click', function (e) {
		e.stopPropagation();
	});

	$(document).on('click', function () {
		$('.user-login-opener').removeClass('active');
		$('.user-login-drop-box').stop().fadeOut('fast');
	});
}
/*user login drop show end*/

/*states links*/
function statesLinks(){
	$('#states').on('click', 'path', function(){
		var currentLink = $(this).closest('a').attr('href');
		if(!currentLink.length){return;}
		var currentHref = currentLink;
		window.location.href = currentHref;
	})
}
/*states links end*/

/*add class .hover on click*/
function addHoverOnClick(){
	$('.nav-list > li > strong > a').on('click', function (e) {
		if($(window).width() > 991 || $(window).width() < 768  ) {
			return;
		}
		e.stopPropagation();
		$(this).closest('li').siblings().removeClass('hover');
		$(this).closest('li').toggleClass('hover');

		e.preventDefault();
	});

	$('.main, .header-holder').on('click', function () {
		if ($(window).width() < 768) { return; }
		$('.nav-list > li').removeClass('hover');
	});
}
/*add class .hover on click end*/

/*add class for device*/
function addClassForDevices(){
	if(device.tablet() || device.mobile()){
		$('body').addClass('m-device');
	}
}
/*add class for device end*/

/*showed option cover*/
function showedOptionCover(){
	if(!$('body').hasClass('m-device')){
		return;
	}
	$('.manager-list').on('click', '.manager-item', function (e) {
		e.stopPropagation();
		$('.options-cover').removeClass('showed');
		$(this).find('.options-cover').toggleClass('showed');
	});

	$(document).on('click', function () {
		$('.options-cover').removeClass('showed');
	});
}
/*showed option cover end*/

/*resize cleaner*/
function resizeCleaner() {
	var navList = $('.nav-list');
	navList.find('li').removeClass('aligned');
	navList.find('li').removeClass('init');
	if ($(window).width() < 768) {
		$('.languages').removeClass('aligned')
			.find('.languages-drop').hide(0, function () {
				$(this).closest('.languages').toggleClass('active', $(this).is(':visible'));
			});
	}

	//--== drop accordion ==--//
	$('.btn-nav').removeClass('active');
	var navHolder = $('.nav-holder');
	if (!navHolder.is(':visible')) {
		navHolder.hide(0);
	}
	$('.nav-holder[style], .first-drop[style], .second-drop[style], .third-drop[style], .first-drop-list[style], .user-login-drop-box[style]').attr('style', '');
	$('.nav-list a').removeClass('active');
	$('.nav-list li').removeClass('hover');

	//--== add-lottery ==--//
	$('.add-lottery-opener').removeClass('active');
	$('.add-lottery-drop').stop().fadeOut('fast');

	//==-- user-login-opener --==//
	$('.user-login-opener').removeClass('active');
}
/*resize cleaner*/

/*counter initial*/
function counterInit(){
	var options = {
		useEasing : true,
		useGrouping : true,
		separator : ',',
		decimal : '.',
		prefix : '$',
		suffix : ''
	};
	var counterBox = new CountUp("counter-up", 0, 60000000, 0, 2.5, options);
	setTimeout(function () {
		counterBox.start(function () {
			var counter = $('#counter-up');
			counter.addClass('length-letters-' + counter.text().length);
		});
	}, 300);

	/*example change number of counter*/
	function randomNumberFromRange(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	var counter = 1;
	function updateCounter(){
		var someValue = 60000000;
		someValue = someValue + counter;
		counterBox.update(someValue);
	}
	setTimeout(function () {
		setInterval(function () {
			updateCounter();
			var randomNumber = randomNumberFromRange(1, 10);
			//counter += randomNumber*1;
			counter += 1;
		}, randomNumberFromRange(30, 80) * 100);
	}, 5000);
	/*example change number of counter end*/
}
/*counter initial end*/

/** ready/load/resize document **/
function loadByReady() {
	customInputs($('.input-holder'));
	placeholder();
	allSlider();
	stars();
	datepicker();
	fancybox();
	tabs();
	customSelect($('select.cselect'));
	checkbox($('.def-ch'),$('.def-radio'));
	equalHeightInit();
	hasDropMenu();
	dropPosition();
	languageChoose();
	dropAccordion();
	addClassItem();
	accordionInit();
	checkerResult();
	backToTop();
	dropMenu();
	deleteItem();
	scrollMenu();
	initScrollpanel();
	chooseGames();
	numeric();
	checkYourNumber();
	checkYourNumberOneGame();
	tooltipInit();
	stateLabel();
	chooseNumbersLotto();
	generatedNumbers();
	fixedHeaderInit();
	listToSelect();
	fixedSidebar();
	showDropAddLottery();
	userLoginDropshow();
	editSubscriptionDropshow();
	filtersList();
	statesLinks();
	addHoverOnClick();
	addClassForDevices();
	showedOptionCover();
}

/*added game-checker in sidebar*/
$(document).ready(function () {
	if ($('body').find('#game-checker').length) {
		$('#game-checker').load('game-checker.html #template', function () {
			loadByReady();
		});
	} else {
		loadByReady();
	}
});

$(window).load(function () {
	footerBottom();
	anchorList();
	counterInit();
})
;
$(window).resize(function () {
	footerBottom();
	resizeCleaner();
});

/*my lotteries choose*/
$(document).ready(function () {
	$('.my-lotteries-title > i').click(function (event) {
		$(this).parent().toggleClass('checked');
		$(this).toggleClass('icon-delete-grey icon-plus-yellow');
	});
});

/*add to favorites*/
$(document).ready(function () {
	$('.btn-frame-blue-md').click(function (event) {
		event.preventDefault();
		$(this).find('i').toggleClass('icon-delete-grey icon-plus-yellow');
		$(this).toggleClass('close');
		($(this).find('span').text() === "Remove from favourites") ? $(this).find('span').text("Add to favourites") : $(this).find('span').text("Remove from favourites");
	});
});


/*sort by*/
var options = {
	valueNames: [
		'popularity',
		'name',
		'country'
	]
};
new List('sort-list', options);

var newGame0 = {
	valueNames: [
		'name'
	]
};
new List('add-lottery-drop-0', newGame0);

var newGame1 = {
	valueNames: [
		'name'
	]
};
new List('add-lottery-drop-1', newGame1);

var newGame2 = {
	valueNames: [
		'name'
	]
};
new List('add-lottery-drop-2', newGame2);

function is_touch_device() {
  return !!('ontouchstart' in window);
}