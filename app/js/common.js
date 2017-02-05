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
		submitBtnDisabled = "challenge__submit-btn_disabled",//Disable modificator for submit button
		submitBtnLabel = "<span class='error'></span>",
		error = "challenge__input_error",//string to add class error
		errorMessages = {
			empty: "Обязательное поле",
			format: "Неверный формат",
			btnMessage: "Проверьте введенные данные"
		},
		count = 0,//counter for checking how many inputs are invalid
		emptyInputs = [surname, name, middlename, phone, mail, emotionsText];//Inputs to validate on empty field;
		
	form.on("submit", function(e){
		emptyInputs.forEach(function(i){
			if((!i.val() || i.val()[0] === " ") && (!$(i).hasClass(error))) { //Checking if input is empty
				e.preventDefault();
				$(i).addClass(error);
				count++;//Increment counter when input gets error modificator
			}
		});
		for(var i = 0; i<emptyInputs.length; i++) {
			if($(emptyInputs[i]).hasClass(error)) {
				e.preventDefault();
				if(!submitBtn.children("span.error")[0]) {
					submitBtn.prepend(submitBtnLabel);//Add label over submit button
					$("span.error").text(errorMessages.btnMessage);
					submitBtn.addClass(submitBtnDisabled);//Add "disabled" modificator to submit button
				}
				break;
			}
		}
	});
	emptyInputs.forEach(function(i){
		i.on("focus", function() {
			if($(this).hasClass(error)) {
			$(this).removeClass(error);//Remove error modificator on focus
				count--;//Decrement counter when input gets rid of error modificator
				if(count===0) {//Count = 0  if none of inputs have error modificator
					submitBtn[0].removeChild($("span.error")[0]);//So remove error label over submit button
					submitBtn.removeClass(submitBtnDisabled);//Remove "disabled" modificator to submit button
				}
			}
		});
	});
});