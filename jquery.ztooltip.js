/*
	zTooltip v1 | 2014-02-04
	Tooltip jQuery plugin
	Developed by Arbaoui Mehdi under the MIT license http://opensource.org/licenses/MIT
*/
;(function($){

	/* Themes tooltip */
	var themes = {
		position    : 'tooltip-down',
		events      : 'hover',
		bgcolor     : false,
		textcolor   : false,
		width       : 200,
		rightoleft  : false,
		boxshadow   : false,
		borderadius : false
	}

	/* Init variables */
	var getContent,
		tooltipWidth,
	 	tooltipThisWidth,
	 	tooltipHeight,
	    bottomPos,
	    topPos,
	    centerPos,
	    leftPos,
	    getDownClass,
	    getDownCenterClass,
	    getDownRightClass,
	    getTopClass,
	    getTopCenterClass,
	    getTopRightClass,
	    getLeftClass,
	    getRightClass;

	function Tooltip(element, options){
		this.config = $.extend({},themes, options);
		this.element = element;
		this.init();
	}

	Tooltip.prototype.init = function() {

		/* Get all ids starting with tooltip_ */
		var idTooltips = '[id^="tooltip_"]';

		/* CSS3 Vendor Prefixes */
		var prefixBrowsers = ['-moz-','-webkit-', '-o-', '-ms-',''];

		/* Config Tooltip */
		var configPosition     = this.config.position,
			configWidth        = this.config.width,
			configBgColor      = this.config.bgcolor,
			configTextColor    = this.config.textcolor,
			configBoxShadow    = this.config.boxshadow,
			configBorderRadius = this.config.borderadius,
			configRightToLeft  = this.config.rightoleft,
		 	configTextColor    = this.config.textcolor,
		 	configEvents       = this.config.events;

		/* Hide all tooltip content */
		$('[id^="content_"]').hide();
		$('body').append('<div id="tooltip-pos"></div>');

		$('<div/>', {
			width        : this.config.width,
			direction    : this.config.rightoleft,
			bgcolor      : this.config.bgcolor,
			textcolor    : this.config.textcolor,
			id           : 'tooltip',
			Class        : this.config.rightoleft
		}).appendTo(this.element);
		$('#tooltip').removeAttr('background direction bgcolor textcolor').removeClass('configurable').hide();

		/* Correct IE6+ z-index */
		$('#tooltip').appendTo('#tooltip-pos');

		/* If rightoleft is true */
		if (configRightToLeft === true) {
			$('#tooltip').removeClass('true').addClass('rtl');
		}
		else {
			$('#tooltip').removeClass('false');
		}

		/* If "box-shadow" statut is true + Adding CSS3 Vendor Prefixes */
		if (configBoxShadow !== false) {
			for (i = 0; i < prefixBrowsers.length; i++){
				$('#tooltip').css( prefixBrowsers[i]+'box-shadow', configBoxShadow.params+' '+configBoxShadow.color );
			}
		}

		/* If "border-radius" statut is true + Adding CSS3 Vendor Prefixes */
		if (configBorderRadius !== false) {
			for (i = 0; i < prefixBrowsers.length; i++) {
				$('#tooltip').css ( prefixBrowsers[i]+'border-radius', configBorderRadius.size );
			}
		}
		
		/**
		*
		* Functions
		* Names: getTopPos, getLeftPos, tooltipPos
		*
		**/
		function getTopPos(formula) {

			if (formula === 'top') {
				return topPos  - tooltipHeight - 32;
			}

			if (formula === 'down') {
				return bottomPos + 10;
			}

			if (formula === 'left' || formula === 'right') {
				return centerPos - (tooltipHeight / 2);
			}

		}

		function getLeftPos(formula) {
			if (formula === 'top' || formula === 'down') {
				return leftPos;
			}

			if (formula === 'top-center' || formula === 'down-center') {
				return leftPos + (tooltipThisWidth / 2) - (tooltipWidth / 2) - 8;
			}

			if (formula === 'top-right' || formula === 'down-right'){
				return leftPos  - tooltipWidth + tooltipThisWidth - 20;
			}

			if (formula === 'right') {
				return leftPos + tooltipThisWidth + 10;
			}

			if (formula === 'left') {
				return leftPos - configWidth - 30;
			}
		}


		function tooltipPos(left, top, valTop, valLeft) {

			$('#tooltip-pos').css({ 'top'  : getTopPos(top, valTop),
								    'left' : getLeftPos(left, valLeft) });

			$('#tooltip').css({ 'display' 		   : 'block',
							    'width'   		   : configWidth,
							    'background-color' : configBgColor,
							    'color'   		   : configTextColor
							   
			}).append('<span class="arrow '+configPosition+'"></span>');
		}

		/**
		*
		* Positions
		* Names: tooltip-top, tooltip-down, tooltip-right, tooltip-left
		*
		**/
		function allPositions(){
				
				switch(configPosition) {

					/* Top */
					case 'tooltip-top':
						tooltipPos('top', 'top');
						$('.arrow').css('border-top-color', configBgColor);
					break;

					/* Top Center */
					case 'tooltip-top-center':
						tooltipPos('top-center', 'top');
						$('.arrow').css({'border-top-color' : configBgColor,
										 'left'             : (tooltipWidth/2)+'px' });
					break;

					/* Top Right */
					case 'tooltip-top-right':
						tooltipPos('top-right', 'top');
						$('.arrow').css({'border-top-color' : configBgColor,
										 'left'             : (tooltipWidth - 5)+'px' });
					break;

					/* Down */
					case 'tooltip-down':
						tooltipPos('down', 'down');
						$('.arrow').css('border-bottom-color', configBgColor);
					break;

					/* Down Center */
					case 'tooltip-down-center':
						tooltipPos('down-center', 'down');
						$('.arrow').css({'border-bottom-color': configBgColor,
										 'left'			      : (tooltipWidth/2)+'px' });
					break;

					/* Down Right */
					case 'tooltip-down-right':
						tooltipPos('down-right', 'down');
						$('.arrow').css({'border-bottom-color' : configBgColor,
										 'left'                : (tooltipWidth - 5)+'px' });
					break;

					/* Right */
					case 'tooltip-right':
						tooltipPos('right', 'right');
						$('.arrow').css('border-right-color', configBgColor);
					break;

					/* Left */
					case 'tooltip-left':
						tooltipPos('left', 'left');
						$('.arrow').css('border-left-color', configBgColor);
					break;


					/* Configurable option */
					case 'configurable':

						/* Top */
						if (getTopClass && !getTopCenterClass && !getTopRightClass && !getTopRightClass) {
							tooltipPos('top', 'top');
							$('.arrow').addClass('tooltip-top').removeClass('configurable').css('border-top-color', configBgColor);
						}

						/* Top Center */
						if (getTopCenterClass) {
							tooltipPos('top-center', 'top');
							$('.arrow').addClass('tooltip-top-center').removeClass('configurable').css({'border-top-color' : configBgColor,
										 								           						'left'             : (tooltipWidth/2)+'px' });
						}

						/* Top Right */
						if (getTopRightClass) {
							tooltipPos('top-right', 'top');
							$('.arrow').addClass('tooltip-top-right').removeClass('configurable').css({'border-top-color' : configBgColor,
											 							           					   'left'             : (tooltipWidth - 5)+'px' });
						}

						/* Down */
						if (getDownClass && !getDownCenterClass && !getDownRightClass){
							tooltipPos('down', 'down');
							$('.arrow').addClass('tooltip-down').removeClass('configurable').css('border-bottom-color', configBgColor);
						}

						/* Down Center */
						if (getDownCenterClass){
							tooltipPos('down-center', 'down');
							$('.arrow').addClass('tooltip-down-center').removeClass('configurable').css({'border-bottom-color' : configBgColor,
										 								                                 'left'                : (tooltipWidth/2)+'px' });
						}

						/* Down Right */
						if (getDownRightClass){
							tooltipPos('down-right', 'down');
							$('.arrow').addClass('tooltip-down-right').removeClass('configurable').css({'border-bottom-color' : configBgColor,
										 														        'left'                : (tooltipWidth - 5)+'px' });
						}

						/* Right */
						if (getRightClass){
							tooltipPos('right', 'right');
							$('.arrow').addClass('tooltip-right').removeClass('configurable').css('border-right-color', configBgColor);
						}

						/* Left */
						if (getLeftClass){
							tooltipPos('left', 'left');
							$('.arrow').addClass('tooltip-left').removeClass('configurable').css('border-left-color', configBgColor);
						}

						/* Default position, if class is not defined or empty */
						if (!getLeftClass && !getRightClass && 
							!getDownClass && !getDownCenterClass &&
							!getDownRightClass && !getTopClass &&
							!getTopCenterClass && !getTopRightClass || $(this).attr('class') === ''){

							tooltipPos('down', 'down');
							$('.arrow').addClass('tooltip-down').removeClass('configurable').css('border-bottom-color', configBgColor);
						}

					break;
				}
		}


	/**
	*
	* All Events:
	* click, move and hover
	* 
	**/
	$(idTooltips).on('click mouseenter mouseleave mousemove', function(event){

		/* Regx to Find class name */
		getDownClass  		= /(tooltip-down)/i.exec($(this).attr('class'));
		getDownCenterClass  = /(tooltip-down-center)/i.exec($(this).attr('class'));
		getDownRightClass   = /(tooltip-down-right)/i.exec($(this).attr('class'));
		getTopClass  		= /(tooltip-top)/i.exec($(this).attr('class'));
		getTopCenterClass   = /(tooltip-top-center)/i.exec($(this).attr('class'));
		getTopRightClass    = /(tooltip-top-right)/i.exec($(this).attr('class'));
		getLeftClass  		= /(tooltip-left)/i.exec($(this).attr('class'));
		getRightClass 		= /(tooltip-right)/i.exec($(this).attr('class'));


		/**
		*
		* Click Event
		*
		**/
		if (event.type === 'click' && configEvents === 'click'){

			/* Remove content and arrow */
			$('#tooltip [id^="content_"], .arrow').remove();

			/* Get Id of content and get content */
			getContent = $('#'+$(this).attr('id').replace(/(\w+)_(\w+)_(\w+)/, '$2_$3')).clone().appendTo('#tooltip').show();

			/* Get width, position (top and left) of the selected */
			tooltipThisWidth    = $(this).outerWidth();
			tooltipWidth        = parseInt($('#tooltip').css('width'));
			tooltipHeight       = $('#tooltip').height();
			bottomPos           = $(this).offset().top + $(this).outerHeight();
			topPos              = $(this).offset().top;
			centerPos           = $(this).offset().top + ($(this).outerHeight() / 2);
			leftPos      	    = $(this).offset().left;

			/* Get positions */
			allPositions();
		}


		/**
		*
		* Hover Event
		*
		**/
		if (event.type === 'mouseenter' && configEvents === 'hover'){

			/* Get Id of content and get content */
			getContent = $('#'+$(this).attr('id').replace(/(\w+)_(\w+)_(\w+)/, '$2_$3')).clone().appendTo('#tooltip').show();

			/* Get width, position (top and left) of the selected */
			tooltipThisWidth    = $(this).outerWidth();
			tooltipWidth        = parseInt($('#tooltip').css('width'));
			tooltipHeight       = $('#tooltip').height();
			bottomPos           = $(this).offset().top + $(this).outerHeight();
			topPos              = $(this).offset().top;
			centerPos           = $(this).offset().top + ($(this).outerHeight() / 2);
			leftPos      	    = $(this).offset().left;

			/* Get positions */
			allPositions();
		}


		/**
		*
		* Hover Event : Mouse leave
		*
		**/
		if (event.type === 'mouseleave' && configEvents === 'hover'){
			$('#tooltip').hide();
			$('#tooltip [id^="content_"], .arrow').remove();
		}


		/**
		*
		* Tooltip move with cursor
		*
		**/
		if (event.type === 'mouseenter' && configEvents === 'move'){
			
			/* Get Id of content and get content */
			getContent = $('#'+$(this).attr('id').replace(/(\w+)_(\w+)_(\w+)/, '$2_$3')).clone().appendTo('#tooltip').show();

			/* Get width, position (top and left) of the selected */
			tooltipThisWidth    = $(this).outerWidth();
			tooltipWidth        = parseInt($('#tooltip').css('width'));
			tooltipHeight       = $('#tooltip').height();
			bottomPos           = $(this).offset().top + $(this).outerHeight();
			topPos              = $(this).offset().top;
			centerPos           = $(this).offset().top + ($(this).outerHeight() / 2);
			leftPos      	    = $(this).offset().left;

			/* Get positions */
			allPositions();

			/* Remove arrow */
			$('.arrow').remove();
		}

		if (event.type === 'mousemove' && configEvents === 'move'){
			$('#tooltip-pos').css({
				left:  event.pageX - 30,
				top:   event.pageY - tooltipHeight - 30
			});
		}

		if (event.type === 'mouseleave' && configEvents === 'move'){
			$('#tooltip').hide();
			$('#tooltip [id^="content_"]').remove();
		}

	});

	};

	/* Return values */
	$.fn.tooltip = function(options){
		new Tooltip(this, options);
		return this;
	};

}(jQuery));
