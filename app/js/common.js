var nav = $(".page-header__nav"),
	navBtn = $(".page-header__btn"),
	pricesTable = $(".prices__table"),
	hiddenCol = $(".prices__table-col-1"),
	tableSlider = $(".slides-wrapper"),
	navLink = $(".page-header__menu-link"),
	uploadLabel = $(".photos__upload-label"),
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
	},
	pricesSlider = {
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slideToScroll: 1
	};
var map,
mapImg = "img/map-marker.png",
mapMarker;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.936416, lng: 30.321013},
    zoom: 16,
    mapTypeControl: false,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    streetViewControlOptions: {
    	position: google.maps.ControlPosition.LEFT_CENTER
    }
  });
  mapMarker = new google.maps.Marker({
    position: {lat: 59.936416, lng: 30.321013},
    map: map,
    icon: mapImg
  });
}
$(document).ready(function() {
	
	nav.addClass("page-header__nav_closed");
	navBtn.on("click", function() {
		nav.toggleClass("page-header__nav_closed page-header__nav_opened");
	});
	
	navLink.on("click", function() {
		var item = $(this).parent(".page-header__menu-item").siblings(".page-header__menu-item");
		item.each(function() {
			$(this).children(".page-header__menu-link").removeClass("page-header__menu-link_active")
		});
		$(this).addClass("page-header__menu-link_active");
		
	});

	uploadLabel.on("click", function() {
		var uploadItem = $(this)
						.parent(".photos__upload-control")
						.siblings(".photos__upload-control");
		uploadItem.each(function() {
			$(this).children(".photos__upload-label")
					.removeClass("photos__upload-label_active");
		});
		$(this).addClass("photos__upload-label_active");
	});
	
	$(".feedback__list").slick(feedback);
	if(document.body.clientWidth <= 682) {
		tableSlider.slick(pricesSlider)
	} 
	$(window).resize(function() {
		if(document.body.clientWidth > 682) {
			tableSlider.slick("unslick");
		} 
		else {
			tableSlider.slick(pricesSlider);			
		} 
	});
});