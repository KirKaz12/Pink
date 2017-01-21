var nav = $(".page-header__nav"),
	navBtn = $(".page-header__btn");
$(document).ready(function() {
	nav.addClass("page-header__nav_closed");
	navBtn.on("click", function() {
		nav.toggleClass("page-header__nav_closed page-header__nav_opened");
	})
});