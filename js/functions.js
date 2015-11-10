function initSlick(){
	$('.slider').slick({
		dots: false,
		infinite: false,
		speed: 300,
		focusOnSelect: false,
		accessibility: false,
		//adaptiveHeight: true,
		lazyLoad: 'ondemand'
	}).on('afterChange', function(slick, currentSlide, nextSlide){
		$(this).closest('li').find('h4 > span').text(nextSlide + 1);
	});
	$('.projects-list li').each(function () {
		var slideCount = $(this).find('.slide').length;
		$(this).find('h4 > strong').text(slideCount);
	});
}
function uiTooltip() {
	$( document ).tooltip({
		items: "[data-src]",
		content: function() {
			var element = $( this );
			if ( element.is( "[data-src]" ) ) {
				var src = element.data('src');
				return '<img class="map" src="'+src+'">';
			}
			if ( element.is( "[title]" ) ) {
				return element.attr( "title" );
			}
		}
	});
}
$(document).ready(function () {
	initSlick();
	uiTooltip();
});