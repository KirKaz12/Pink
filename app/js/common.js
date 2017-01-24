var nav = $(".page-header__nav"),
	navBtn = $(".page-header__btn"),
	feedback = {
		arrows: true,
		dots: false,
		slidesToShow: 1,
		slideToScroll: 1,
		responsive: [
			{
				breakpoint: 1050,
				settings: {
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	};
$(document).ready(function() {
	nav.addClass("page-header__nav_closed");
	navBtn.on("click", function() {
		nav.toggleClass("page-header__nav_closed page-header__nav_opened");
	});
	$(".feedback__list").slick(feedback);
});