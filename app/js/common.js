// Google map
var map,
mapImg = "../img/map-marker.png",
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
}//..Google map end

// Custom
$(document).ready(function() {
	var nav = $(".page-header__nav"),
		navBtn = $(".page-header__btn"),
		pricesTable = $(".prices__table"),
		hiddenCol = $(".prices__table-col-1"),
		tableSlider = $(".slides-wrapper"),
		navLink = $(".page-header__menu-link"),
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
	//close navigation by default on mobile
	nav.addClass("page-header__nav_closed");
	
	navBtn.on("click", function() {
		nav.toggleClass("page-header__nav_closed page-header__nav_opened");
	});
	navLink.on("click", function() {//add active state to link on click
		var item = $(this).parent(".page-header__menu-item").siblings(".page-header__menu-item");
		item.each(function() {
			$(this).children(".page-header__menu-link").removeClass("page-header__menu-link_active")
		});
		$(this).addClass("page-header__menu-link_active");
		
	});

	$(".feedback__list").slick(feedback);
	if(document.body.clientWidth <= 682) {//add price-table slider on mobile
		tableSlider.slick(pricesSlider)
	} 
	
	$(window).resize(function() {
		if(document.body.clientWidth > 682) {//remove price-table slider on tablet on resize
			tableSlider.slick("unslick");
		} 
		else {
			tableSlider.slick(pricesSlider)
		} 
	});
});

//Challenge form validation
$(document).ready(function() {
	var surname = $("#surname"),
		name = $("#name"),
		middlename = $("#middlename"),
		phone = $("#phone"),
		mail = $("#mail"),
		form = $(".challenge__form"),
		emotionsText = $("#emotions_text"),
		submitBtn = $(".challenge__submit-btn"),
		submitBtnLabel = "<span class='error'></span>",
		error = "challenge__input_error",//string to add class error
		errorMessages = {
			empty: "Обязательное поле",
			format: "Неверный формат",
			btnMessage: "Проверьте введенные данные"
		};
	form.on("submit", function(e){
		var inputs = [surname, name, middlename, phone, mail, emotionsText],//Inputs to validate on empty field
		count = 0; 
		
		inputs.forEach(function(i){
			
			if(!i.val() || i.val()[0] === " ") { //Checking if field is empty
				e.preventDefault();
				$(i).addClass(error);
				count++;
				//console.log(count);
				//$(i).attr("placeholder", errorMessages.empty);
			}
			if($(i).hasClass(error)) {
				$(i).on("focus", function() {
					if($(this).hasClass(error)) {
						$(this).removeClass(error);
						count--;
						//console.log(count);
						if(count<=0) {
							submitBtn[0].removeChild($("span.error")[0]);
						}
					}
				});
			}
		});
		for(var i = 0; i<inputs.length; i++) {
			if($(inputs[i]).hasClass(error)) {
				submitBtn.prepend(submitBtnLabel);
				$("span.error").text(errorMessages.btnMessage);
				break;
			}
		}
	})
});