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

//Animation module
;(function(){

	var features = $(".features__item"),
			timer = $(".effect__timer-img");
	//constructor
	function Animation(element, offset, modificator) {
		this._element = element;
		this._offset = offset;
		this._modificator = modificator;
	}

	Animation.prototype.animated = function() {
		var that = this;
		$(window).on("scroll", function(){
			if( $(that._element).offset() && 
					($(this).scrollTop() > $(that._element).offset().top/that._offset)) {
				$(that._element).addClass(that._modificator);
			}
		});
	}
	
	var features1 = new Animation(features[0], 3, "features__item_animated-left");
		features1.animated();
	var features2 = new Animation(features[1], 3, "features__item_animated-left");
		features2.animated();
	var features3 = new Animation(features[2], 3, "features__item_animated-left");
		features3.animated();
	var clock = new Animation(timer, 1.5, "effect__timer-img_animated");
		clock.animated();

	var uploadFeatures = $(".photos__upload-features");
	uploadFeatures.on("click", function(e){
		var target = e.target,
				activeClass = "photos__upload-label_active";
		if(!target.matches(".photos__upload-label")
				|| $(target).hasClass(activeClass)) return
		$("."+activeClass).removeClass(activeClass);
		$(target).addClass(activeClass);
	})
})();

//Module for page header navigation
;(function(){
	var nav = $(".page-header__nav"),
		navBtn = $(".page-header__btn"),
		navLink = $(".page-header__menu-link");

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
})();

// Module works with sliders
;(function() {
	var pricesTable = $(".prices__table"),
		hiddenCol = $(".prices__table-col-1"),
		tableSlider = $(".slides-wrapper"),
		feedback = {//Feedback slider settings
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
		pricesSlider = {//Prices table slider settings
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slideToScroll: 1
		};
	$(".feedback__list").slick(feedback);
	
	//add price-table slider on mobile
	if(window.innerWidth <= 700) 
		tableSlider.slick(pricesSlider);
	
	$(window).resize(function() {
		/*if(window.innerWidth > 700) {
			tableSlider.slick("unslick");
		} 
		else {
			tableSlider.slick(pricesSlider)
		} */
		//remove price-table slider on tablet on resize
		window.innerWidth > 700 
											? tableSlider.slick("unslick")
											: tableSlider.slick(pricesSlider)
	});
})();

//Challenge form validation module
;(function() {
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
})();