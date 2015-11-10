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
		var inp = ':text, :password, textarea, input[type="email"], input[type="search"]';
		objBlockInput.on('click', function(){
			var self = $(this);
			var curInp = self.find(inp).not('[disabled]');
			if (curInp.length){
				self.addClass('focus');
				curInp.trigger('focus');
			}
		});
		objBlockInput.on('click, focus', inp, function(e){
			$(e.delegateTarget).addClass('focus');
		});
		objBlockInput.on('blur', inp, function(e){
			$(e.delegateTarget).removeClass('focus');
		});
	}
}
/* custom inputs end */

/*add ui position add class*/
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );	
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
}
/*add ui position remove class*/
function removePositionClass(obj){
	obj.removeClass('top');
	obj.removeClass('bottom');
	obj.removeClass('center');
	obj.removeClass('left');
	obj.removeClass('right');
}

/* UI Multiselect */
function multiSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: true,
				height: 'auto',
				minWidth: 50,
				selectedList: 3,
				classes: classes,
				multiple: true,
				noneSelectedText: false,
				show: ['fade', 100],
				hide: ['fade', 100],
				position: {
					my: 'left top+11',
					at: 'left bottom'
				},
				create: function () {
					var widget = $(this).multiselect('widget');
					setTimeout(function () {
						var multiFilter = widget.find('.ui-multiselect-filter input');
						multiFilter.wrap('<div />');
						multiFilter.parent().addClass('input-holder');
					},10);
				}
			}).multiselectfilter({
				placeholder: 'Search',
				label: false
			});
		});
		$(window).resize(selectResize);
	}
}

function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: false,
				height: 'auto',
				minWidth: 50,
				selectedList: 1,
				classes: classes,
				multiple: false,
				noneSelectedText: true,
				show: ['fade', 100],
				hide: ['fade', 100],
				position: {
					my: 'left top+2',
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
			$(el).multiselect('close');
		});
	}
}
/* UI Multiselect End */

/*equalHeight*/
function equalHeightInit(){
	if($(window).width() < 768){ return }
	/* bonuses list */
	var bonusesList = $('.bonuses-list');
	bonusesList.find('.bonus-text').equalHeight({
		amount: 3,
		useParent: true,
		parent: bonusesList,
		resize: true
	});
	bonusesList.find('h3').equalHeight({
		amount: 3,
		useParent: true,
		parent: bonusesList,
		resize: true
	});

	/*articles list*/
	var articlesList = $('.articles-list');
	articlesList.find('.article-text').equalHeight({
		amount: 3,
		useParent: true,
		parent: articlesList,
		resize: true
	});
	articlesList.find('h3').equalHeight({
		amount: 3,
		useParent: true,
		parent: articlesList,
		resize: true
	});
}


/*equalHeight only for desktop and tablets*/
function equalHeightTabletsInit(){
	//sidebar widgets
	var sidebar = $('.sidebar');
	sidebar.find('.small-widget>.widget').equalHeight({
		amount: 2,
		useParent: true,
		parent: sidebar,
		resize: true
	});
	sidebar.find('.large-widget>.widget').equalHeight({
		amount: 2,
		useParent: true,
		parent: sidebar,
		resize: true
	});
}

function windowsWidthInit() {
	if ($(window).width() > 539) {
		equalHeightTabletsInit();
	}
}

/*equalHeight only for desktop and tablets end*/
/*equalHeight end*/

/* has drop menu */
function hasDropMenu(){
	var item = $('.nav-list>li');
	item.find('ul').parents('li').addClass('has-drop');
}
/* has drop menu end */

/* Accordion init */
function accordionInit() {
	$( ".accordion-box" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false
	});
}
/* Accordion init end*/

/*sidebar fixed*/
function sidebarFixed() {
	$(".aside-holder").stick_in_parent({
		parent: '.sf-content-wrapper',
		offset_top: 20,
		spacer: false
	})
}
/*sidebar fixed end*/

/*add class item*/
function addClassItem() {
	var defaultTable = $('.default-table');
	defaultTable.find('tr:even').addClass('even');
	defaultTable.find('tr td:last-child, tr th:last-child').addClass('last-child');
}
/*add class item end*/

/*handle dropdowns on mobile devices*/
function initTouchNav() {
	lib.each(lib.queryElementsBySelector('.nav-list'), function(){
		new TouchNav({
			navBlock: this
		});
	});
	lib.each(lib.queryElementsBySelector('.languages'), function(){
		new TouchNav({
			navBlock: this
		});
	});
}
/*handle dropdowns on mobile devices end*/

/*toggle sidebars*/
function showSidebar() {
	$('.wrapper').on('click', '.btn-toggle-sidebar', function (e) {
		e.stopPropagation();
		var duration = 400;
		var current = $(this);
		var wrapper = current.closest('.wrapper');
		wrapper.removeClass('cleaned').find('.aside').toggle('slide', duration);
		function removeClass() {
			var mainWrapper = $('.wrapper');
			if (mainWrapper.hasClass('cleaned')) { return; }
			if($(window).width() > 767 || $(window).width() < 320){
				mainWrapper.addClass('cleaned');
				$('.aside').attr('style', function(i, style) {
					return style.replace(/.*[^;]+;?/g, '');
				});
			}
		}
		$(window).resize(removeClass);

		$(function() {
			$(".aside").swipe( {
				swipeLeft:function() {
					$(this).toggle( "slide", duration );
				},
				threshold:0
			});
		});
		e.preventDefault();
	});

}
/*toggle sidebars end*/

/*drop menu position*/
function dropPosition() {
	$('.nav-holder').on('mouseenter', '.has-drop>strong>a', function () {
		var current = $(this);
		var item = current.closest('li');
		if (item.hasClass('aligned')) {
			return;
		}

		item.addClass('aligned');
		var wrapper = current.closest('.nav-holder');
		var wrapperLeft = wrapper.offset().left;
		var wrapperWidth = wrapper.outerWidth();
		var wrapperRight = wrapperLeft + wrapperWidth;

		var drop = item.find('.nav-drop');
		var itemLeft = item.offset().left;
		var dropOuterWidth = drop.outerWidth();
		if (dropOuterWidth > wrapperWidth) {
			drop.css('left', -itemLeft);
			return;
		}

		var dropRight = itemLeft + dropOuterWidth;
		var dropShift = wrapperRight - dropRight;
		if (dropRight > wrapperRight) {
			drop.css('left', dropShift);
		}
	});
}
/*drop menu position end*/
/*choose language*/
function languageChoose() {
	$('.languages>div>a').on('click', function (e) {
		if (!$('.languages').length) { return; }
		if ($(window).width() > 767) { return; }

		var current = $(this);
		current
			.closest('.languages').addClass('active')
			.find('.languages-drop').slideToggle(function () {
				$(this).closest('.languages').toggleClass('active', $(this).is(':visible'));
			});
		current.closest('.header').find('.nav-holder').slideUp(function () {
			$(this).closest('.header').find('.btn-nav').toggleClass('active', $(this).is(':visible'));
		});

		function removeClass() {
			if ($(window).width() > 768) {
				$('.languages-drop').attr('style', function (i, style) {
					return style.replace(/.*[^;]+;?/g, '');
				});
			}
		}
		$(window).resize(removeClass);
		e.preventDefault();

		var wrapper = current.closest('.languages');
		if (wrapper.hasClass('aligned')) {
			return;
		}
		wrapper.addClass('aligned').find('.languages-drop').css('width', $(window).width());
	});
}
/*choose language end*/

/*resize cleaner*/
function resizeCleaner() {
	$('.nav-list').find('li').removeClass('aligned').find('.nav-drop').css('left', -1);
	if ($(window).width() < 768) {
		$('.languages').removeClass('aligned')
			.find('.languages-drop').hide(0, function () {
				$(this).closest('.languages').toggleClass('active', $(this).is(':visible'));
			});
	}

}
/*resize cliner*/

/*drop accordion*/
function dropAccordion() {
	var navigationList = $('.nav-list');
	if (!navigationList.length) {
		return;
	}

	$('.btn-nav').on('click', function (e) {
		var current = $(this);
		current
			.addClass('active')
			.closest('.header')
			.find('.nav-holder').slideToggle(function () {
				$(this).closest('.header').find('.btn-nav').toggleClass('active', $(this).is(':visible'));
			});
		current.closest('.header').find('.languages-drop').slideUp(function () {
			$(this).closest('.languages').toggleClass('active', $(this).is(':visible'));
		});
		e.preventDefault();
	});

	navigationList.on('click', '.arrow-drop', function () {
		var current = $(this);
		current
			.closest('li')
			.find('.drop-holder').slideToggle()
			.end()
			.siblings().find('.drop-holder').slideUp();
	});

	navigationList.on('click', '.arrow-drop', function () {
		var current = $(this);
		current.toggleClass('active').closest('li').siblings().find('.arrow-drop').removeClass('active');
	});

	$('.drop-box').on('click', '.arrow-drop', function () {
		var current = $(this);
		current
			.closest('li')
			.children('ul').slideToggle()
			.end()
			.closest('.drop-box').siblings().find('.arrow-drop').removeClass('active').closest('li').children('ul').slideUp(); // close other list in the continue "drop-box"
		current.closest('li').siblings().find('.arrow-drop').removeClass('active').closest('li').children('ul').slideUp();
	});
}
/*drop accordion end*/

/*back to top*/
function backToTop() {
	var offset = 520;
	var duration = 700;

	// проверяем поддержку position: fixed;[start]
	var isFixedSupported = (function () {
		var isSupported = null;
		if (document.createElement) {
			var el = document.createElement("div");
			if (el && el.style) {
				el.style.position = "fixed";
				el.style.top = "10px";
				var root = document.body;
				if (root && root.appendChild && root.removeChild) {
					root.appendChild(el);
					isSupported = el.offsetTop === 10;
					root.removeChild(el);
				}
			}
		}
		return isSupported;
	})();

// добавляем контекст для "старичков"
	window.onload = function () {
		if (!isFixedSupported) {
			document.body.className += ' no-fixed-supported';
		}
		window.scrollBy(0, 1);
	};

// имитируем position: fixed;
	var btnToTop = document.getElementById('back-to-top');
	var btnHeight = $('#back-to-top').height();
	var windowHeight = window.innerHeight;

	$(window).scroll(function () {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
		} else {
			$('.back-to-top').fadeOut(duration);
		}
	});

// обрабатываем события touch и scroll
	window.ontouchstart = function (e) {
		if (event.target !== topbar) {
			topbar.style = "";
		}
	};
	window.onscroll = function () {
		var scrollTop = window.scrollY;
		btnToTop.style.top = scrollTop + windowHeight - btnHeight - 20 + 'px';
	};

	$('.back-to-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, duration);
		return false;
	})
}
/*back to top end*/

/*scroll menu*/
function scrollMenu(){
	$('.scroll-menu').singlePageNav({
		offset: 20,
		threshold: 20
	});
}
/*scroll menu end*/

/** ready/load/resize document **/
$(document).ready(function(){
	customInputs($('.input-holder'));
	placeholder();
	multiSelect($('select.multiselect'));
	customSelect($('select.simple-select'));
	equalHeightInit();
	equalHeightTabletsInit();
	hasDropMenu();
	accordionInit();
	addClassItem();
	initTouchNav();
	showSidebar();
	dropPosition();
	languageChoose();
	backToTop();
	dropAccordion();
	sidebarFixed();
	scrollMenu();
});
$(window).load(function(){
//	fixedBlock($('.aside-holder'), 20);
});
$(window).resize(function(){
	resizeCleaner();
	windowsWidthInit();
});