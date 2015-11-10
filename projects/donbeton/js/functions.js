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

/* yandexMap */
function yandexMap(){
	if ( $('.map').length ) {
		$('.map').each(function(index){
			var obj = $(this);
			var objIndex = index + 1;
			var className = obj.attr('class');
			obj.attr('id', 'map-'+objIndex);
			var id = obj.attr('id');
			var left = obj.data('left');
			var right = obj.data('right');
			var zoom = obj.data('zoom');
			var point = obj.data('point-src');
			ymaps.ready(function () {
				var myMap = new ymaps.Map(id, {
					center: [left, right],
					zoom: zoom
				});
				myPlacemark = new ymaps.Placemark([left, right], {
					hintContent: 'Дон Бетон',
					help_hint: 'Дон Бетон',
					balloonContent: '<div>Дон Бетон</div>'
				}, {
					iconImageHref: point,
					iconImageSize: [80, 70],
					iconImageOffset: [-26, -69]
				});
				myMap.geoObjects.add(myPlacemark);
			});
			
		});
	}
}
/* yandexMap end */

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

/* itemClass */
function itemClass(){
	$('.price-table tr td:last-child, .price-table tr th:last-child').addClass('last-child');
}
/* itemClass end */

/* bg position */
function bgPosition(){
	var itemHeight = $('.price-table thead th').outerHeight();
	$('.thead-bg').css({
		height: itemHeight
	});
}
/* bg position end */

/** ready/load/resize document **/

$(document).ready(function(){
	inputFocus($('.input-holder'));
	yandexMap();
	customInputs($('.input-holder'));
	placeholder();
	placeholderMod();
	itemClass();
	$('.steps-list li .step-inner').equalHeight({
		amount : 2,
		useParent: true,
		parent: $('.steps-list'),
		resize: true
	});
});
$(window).resize(function(){
	bgPosition();
});
$(window).load(function(){
	bgPosition();
});