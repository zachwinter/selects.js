/* 
 *
 * selects.js v1.1 (c) 2014
 * Cross-Browser <select> Styling 
 * 
 * @author  : Zach Winter (contact@zachwinter.com)
 * @license : MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 */

;(function($) {
"use strict";



/* Begin Plugin
======================================================================================= */
$.fn.selects = function(_args) {



	/* Global Variables
	----------------------------------------------------------------------- */
	var _self     = this,  // Forms passed to plugin.
	    _forms    = [],    // Processed data.
	    _support  = false, // CSS Transition Support
	    _isMobile = false, // Mobile Browser Detection

			_keyMap   = {
				9  : false, // Tab
				13 : false, // Enter
				16 : false, // Shift
				38 : false, // Up
				40 : false  // Down 
			},

			_defaults = {
				overrideMobileBehavior : false, // "True" will replace mobile <select> behavior. 
				useCssTransitions      : true,  // "False" will use jQuery animation for dropdowns.
				slideSpeed             : 300,   // Speed of dropdown animations.
				dropdownHeight         : 150,   // Max-height of dropdowns (px).

				proxy : {
					select   : $('[data-form-element="select"]'),
					dropdown : $('[data-form-element="select-dropdown"]'),
					button   : $('[data-form-element="select-button"]'),
					honeyPot : $('.hp')
				}

			}, _o = $.extend(_defaults, _args);



	/* If desired, check CSS Transition support; use Modernizr if available.
	----------------------------------------------------------------------- */
	if (_o.useCssTransitions === true) {
		if (typeof(Modernizr) != 'undefined' && typeof(Modernizr.csstransitions) != 'undefined') {
			_support = Modernizr.csstransitions;
		} else {
			var a = document.createElement("div").style,
			    b = [ a.transition, a.WebkitTransition, a.MozTransition ];
			for (var i=0; i<b.length; i++) if (b[i] !== undefined) _support = true;
		}
	}



	/* If needed, detect mobile browsers. (http://detectmobilebrowsers.com/)
	----------------------------------------------------------------------- */
	if (_o.overrideMobileBehavior === false) {
		var checkMobile = function() {
			return (function(a, b){
				return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
			})(navigator.userAgent||navigator.vendor||window.opera);
		};
		_isMobile = checkMobile();
	}



	/* Polyfill for Object.create
	----------------------------------------------------------------------- */
	if (!Object.create) {
		Object.create = (function() {
			function F(){}
			return function(o) {
				if (arguments.length != 1) throw new Error('Object.create implementation only accepts one parameter.');
				F.prototype = o;
				return new F();
			};
		})();
	}



	/* Select Object
	----------------------------------------------------------------------- */
	var SELECT = {



		/* Object Variables
		======================================================= */
		form      : null, // Parent Form
		proxy     : null, // Select Container
		select    : null, // Select Element
		options   : null, // Option Elements
		dropdown  : null, // Select Dropdown
		button    : null, // Select Button
		selected  : null, // Selected Option
		namespace : null, // Element-Specific Event Namespacing


 
		/* Create Element
		======================================================= */
		createElement : function() {

			var self = this;

			// Create dropdown + "selected" element.
			self.proxy.append('<ul data-form-element="select-dropdown" />');
			self.proxy.prepend('<a data-form-element="select-button" />');
					
			// Store elements.
			self.form        = self.proxy.find('select').attr('data-form'),
			self.select      = self.proxy.find('select'),
			self.options     = self.proxy.find('option'),
			self.dropdown    = self.proxy.find(_o.proxy.dropdown.selector),
			self.button      = self.proxy.find(_o.proxy.button.selector),
			self.selected    = self.proxy.find(':selected');

			// Namespacing.   EX: '.form0element1'
			self.namespace = '.form' + self.form + 'element' + $('[data-marker="form-element"]').index(self.select);

			// Add namespacing attribute so external scripts can use events. 
			self.select.attr('data-namespace', self.namespace);

			// Default select proxy styling.
			self.proxy.css('position', 'relative');

			// Default <select> styling.
			self.select.css({
				'display'            : 'block',
				'position'           : 'absolute',
				'z-index'            : '-1',
				'top'                : '0px',
				'right'              : '0px',
				'bottom'             : '0px',
				'left'               : '0px',
				'width'              : '100%',
				'height'             : '100%',
				'-webkit-appearance' : 'none',
				'-moz-appearance'    : 'none',
				'appearance'         : 'none',
				'opacity'            : '0',
				'-ms-filter'         : 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)',
				'filter'             : 'alpha(opaicty = 0)',
				'font-size'          : '20px' // Prevents zooming in on iPhone.
			});

			// Default button styling.
			self.button.css({
				'display'  : 'block',
				'position' : 'relative',
				'z-index'  : '1',
				'cursor'   : 'pointer'
			});

			// Default dropdown styling.
			self.dropdown.css({
				'position'                   : 'absolute',
				'top'                        : '100%',
				'right'                      : '0%',
				'bottom'                     : 'auto',
				'left'                       : '0%',
				'margin'                     : '0',
				'padding'                    : '0',
				'height'                     : '0px',
				'list-style-type'            : 'none',
				'overflow'                   : 'hidden',
				'-webkit-overflow-style'     : 'auto',
				'-ms-overflow-style'         : 'auto',
				'overflow-style'             : 'auto',
				'-webkit-overflow-scrolling' : 'touch',
				'overflow-scrolling'         : 'touch'
			});

			// Create list item in dropdown for every <option> element.
			self.options.each(function() {

				var data = {
					select   : ' data-select="option"',
					option   : ' data-option="' + $(this).index() + '"',
					selected : ' data-selected="' + $(this).attr('selected') + '"',
					disabled : $(this).attr('disabled') ? ' data-disabled="disabled"' : ''
				};

				self.dropdown.append('<li><a style="display: block; cursor: pointer;" '+ data.select + data.option + data.selected + data.disabled +'>' + $(this).html() + '</a></li>');

			});
			
			// If one of the <option> elements is selected, use it.
			if (self.selected.length) {
				self.button.html(self.selected.html());
				self.dropdown.find('li:eq(' + self.selected.index() + ') a').addClass('focus');
			}

			// Otherwise, use the first <option> element.
			else {
				self.button.html(self.dropdown.find('li:first-child a').html());
				self.options.eq(0).prop('selected', true).attr('selected', 'selected');
				self.dropdown.find('li:first-child a').addClass('focus');
			}

			// Set CSS transition.
			if (_o.useCssTransitions === true && _support === true) {
				self.dropdown.css({
					'-webkit-transition' : 'height ' + _o.slideSpeed/1000 + 's ease',
					'-moz-transition'    : 'height ' + _o.slideSpeed/1000 + 's ease',
					'transition'         : 'height ' + _o.slideSpeed/1000 + 's ease'
				}); 
			}

			// If chosen, maintain default browser behavior on mobile.
			if (_o.overrideMobileBehavior === false && _isMobile === true) {
				self.select.css('z-index', '10').on('change' + self.namespace, function(){
					self.button.html(self.options.filter(':selected').text());
				});
			}

		},



		/* Animate Dropdown List (with CSS or jQuery)
		======================================================= */
		toggleDropdown : function() {

			var self = this;

			// Close dropdown if you click outside of it.
			var clicks = function() {
				$(document).one('click' + self.namespace, function() {
					slideUp();
					self.proxy.removeClass('focus');
				});
			};

			// Determine height of dropdown.
			var determineHeight = function() {

				// If we don't already have the height stored...
				if (!self.dropdown.attr('data-height')) {
 
	 				// Clone dropdown.
					var clone = self.dropdown.clone();

					// Have it 'visible' but off-screen.
					clone.css({
						'position'   : 'fixed',
						'top'        : '-500%',
						'left'       : '-500%',
						'display'    : 'block',
						'height'     : 'auto',
						'max-height' : 'none'
					});

					// Append clone to proxy to ensure relevant styles are applied.
					self.proxy.append(clone);

					// Get height of clone.
					var height = clone.height();

					// Delete clone.
					clone.remove();

					// If its height is larger than defined dropdown height,
					// use defined dropdown height and apply overflow rule.
					if (height > _o.dropdownHeight) {
						height = _o.dropdownHeight;
						self.dropdown.css('overflow-y', 'scroll');
					}

					// Store height so we don't need to calculate it again.
					// This is reset on browser resize.
					self.dropdown.attr('data-height', height);

					return height; 

				}

				// Otherwise, use stored height.
				else { return self.dropdown.attr('data-height'); }

			};
	 
			var slideDown = function() {

				// Add visible marker.
				self.dropdown.addClass('vis');

				// CSS Transitions
				if (_o.useCssTransitions === true && _support === true) {

					self.dropdown.css({
						'z-index' : '10',
						'height'  : determineHeight
					});

				}

				// jQuery Animation
				else {

					// Sets overflow: hidden; if height is larger than defined dropdown height.
					determineHeight();

					self.dropdown.css({
						'height'     : 'auto',
						'display'    : 'none',
						'z-index'    : '10',
						'max-height' : _o.dropdownHeight
					}).slideDown(_o.slideSpeed);

				}

			};

			var slideUp = function() {

				// Remove visible marker.
				self.dropdown.removeClass('vis');

				// CSS Transitions
				if (_o.useCssTransitions === true && _support === true) {
					self.dropdown.on('transitionend' + self.namespace + ' webkitTransitionEnd' + self.namespace, function(){
						self.dropdown.off('transitionend' + self.namespace + ' webkitTransitionEnd' + self.namespace);
						self.dropdown.css('z-index', 'auto');
					}).css('height', '0');
				}

				// jQuery Animation
				else {
					self.dropdown.slideUp(_o.slideSpeed, function(){
						self.dropdown.css('z-index', 'auto');
					});
				}

			};

			if (self.dropdown.hasClass('vis')) {
				slideUp();
			} else {
				slideDown();
				setTimeout(clicks, _o.slideSpeed);
			}

		},



		/* Select Option
		======================================================= */
		selectOption : function($optionProxy) {

			var self = this;

			// If option proxy isn't already selected...
			if ($optionProxy.attr('data-selected') == 'undefined') {

				// Blur active option proxy in dropdown; focus new proxy.
				self.dropdown.find('.focus').removeClass('focus');
				$optionProxy.addClass('focus');

				// Unselect current option proxy; select new proxy.
				self.dropdown.find('[data-selected="selected"]').attr('data-selected', 'undefined');
				$optionProxy.attr('data-selected', 'selected');

				// Update button text with option proxy text.
				self.button.html($optionProxy.html());

				// Unselect current <option>; select new <option>.
				self.options.prop('selected', false).removeAttr('selected');
				self.options.eq( $optionProxy.attr('data-option') ).prop('selected', true).attr('selected', 'selected');

				// Trigger change event on <select> due to changing value programatically. 
				self.select.trigger('change' + self.namespace);

			}

		},



		/* Bind
		======================================================= */
		bind : function() {

			var self = this; 

			self.button.on('click' + self.namespace, function(e) { 
				if (_o.overrideMobileBehavior === false && _isMobile === true) {
					e.preventDefault();
				} else {
					if (_isMobile === false) self.keyBind(self.proxy);
					self.toggleDropdown();
					self.proxy.addClass('focus');
				}
			});

			self.dropdown.find('a').on('click' + self.namespace, function() {
				$(document).off('keydown' + self.namespace);
				self.selectOption($(this));
			});

		},



		/* Keyboard: Variables
		======================================================= */
		KV : {
			focused : null,
			index   : null,
			scroll  : null
		},



		/* Keyboard: Update Focused Option
		======================================================= */
		updateFocusedOption : function(direction) {

			var self = this;

			self.KV.focused = self.dropdown.find('.focus');
			self.KV.index   = parseInt(self.KV.focused.attr('data-option'));
			self.KV.index   = (direction == "next") ? self.KV.index + 1 : self.KV.index - 1;
			self.KV.focused.removeClass('focus');
			self.KV.focused = self.dropdown.find('[data-option="' + self.KV.index + '"]').addClass('focus');
			if (!self.dropdown.hasClass('vis')) {
				self.selectOption(self.dropdown.find('[data-option="' + self.KV.index + '"]'));
				self.updateScrollTop(true);
			} else {
				self.updateScrollTop();
			}
 
		},



		/* Keyboard: Update ScrollTop
		======================================================= */
		updateScrollTop : function(hidden) {

			var self = this;

			// Determine scroll position.
			if (hidden === true) {
				self.KV.scroll = self.KV.focused.position().top + self.dropdown.scrollTop();
			} else {
				if (self.KV.focused.position().top + self.KV.focused.outerHeight() > self.dropdown.height()) {
					self.KV.scroll = self.dropdown.scrollTop() + self.KV.focused.position().top;
				} else if (self.KV.focused.position().top + self.KV.focused.outerHeight() < self.KV.focused.outerHeight()) {
					self.KV.scroll = self.dropdown.scrollTop() - self.dropdown.height() + (self.KV.focused.position().top + self.KV.focused.outerHeight());
				}
			}

			// Set scrollTop.
			self.dropdown.scrollTop(self.KV.scroll);

		},



		/* Keyboard: Bind
		======================================================= */
		keyBind : function() {
			
			var self = this;

			$(document).on('keydown' + self.namespace, function(e) {

				// Tab
				if (_keyMap[9] === true && _keyMap[16] === false) {
					if (self.dropdown.hasClass('vis')) self.toggleDropdown();
					self.focusNewElement();
					$(document).off('keydown' + self.namespace);
					e.preventDefault();
				}

				// Shift + Tab
				if (_keyMap[9] === true && _keyMap[16] === true) {
					if (self.dropdown.hasClass('vis')) self.toggleDropdown();
					self.focusNewElement();
					$(document).off('keydown' + self.namespace);
					e.preventDefault();
				}

				// Enter
				if (_keyMap[13]) {
					if (self.dropdown.hasClass('vis')) {
						self.selectOption(self.dropdown.find('.focus'));
						self.focusNewElement();
						$(document).off('keydown' + self.namespace);
					}
					self.toggleDropdown();
					e.preventDefault();
				}

				// Up
				if (_keyMap[38]) {
					e.preventDefault();
					if (!self.dropdown.find('li:first-child a').hasClass('focus')) self.updateFocusedOption("prev");
				}

				// Down
				if (_keyMap[40]) {
					e.preventDefault();
					if (!self.dropdown.find('li:last-child a').hasClass('focus')) self.updateFocusedOption("next");
				} 

			});

		},



		/* Focus Routing
		======================================================= */
		focusRouting : function() {

			var self = this;

			// Only on desktop, or on mobile when mobile behavior is being replaced...
			if (_isMobile === false || _isMobile === true && _o.overrideMobileBehavior === true) {

				// When the <select> element is focused...
				self.select.on('focus' + self.namespace, function(e) {

					// Prevent default.
					e.preventDefault();

					// Remove focus and add focus class to proxy instead.
					self.select.trigger('blur' + self.namespace);
					self.proxy.addClass('focus');

					// If Tab or Enter are being pressed at this time, toggle dropdown.
					if (_keyMap[9] === true || _keyMap[13] === true) self.toggleDropdown();

					// Enable binding for keyboard controls.
					self.keyBind();

				});
			}

		},



		/* Focus New Element
		======================================================= */
		focusNewElement : function(direction) {

			var self = this, direction = null;

			// If Shift+Tab are being pressed, go backwards. Otherwise, go forwards.
			_keyMap[9] === true && _keyMap[16] === true ? direction = -1 : direction = 1;
			
			// Find new element.
			var index = _forms[self.form].indexing.index(self.select) + direction,
			    $next = _forms[self.form].indexing.eq(index);

			// Remove focus from current element.
			self.proxy.removeClass('focus');

			// Add focus to new element.
			$next.trigger('focus' + self.namespace);
			
		},



		/* Initialization 
		======================================================= */
		init : function() {

			var self = this;

			self.createElement();
			self.bind();
			self.focusRouting();

		}

	}; /* End Select Object
	----------------------------------------------------------------------- */



	/* Global Events
	----------------------------------------------------------------------- */
	$(document).on('keydown.selects', function(e) {
		if (e.keyCode in _keyMap) _keyMap[e.keyCode] = true;
	});

	$(document).on('keyup.selects', function(e) {
		if (e.keyCode in _keyMap) _keyMap[e.keyCode] = false;
	});

	$(window).on('resize.selects', function(){
		var allDropdowns = $(_o.proxy.dropdown.selector);
		if (allDropdowns.attr('data-height')) allDropdowns.removeAttr('data-height');
	});



	/* In each form passed to plugin...
	----------------------------------------------------------------------- */
	_self.each(function() {

		// Index of this form.
		var formIndex = _self.index($(this));

		// Create object for this form.
		_forms[formIndex] = {
			html     : $(this),
			indexing : null,
			selects  : []
		};

		/* Mark elements for tab indexing.
		======================================================= */
		_forms[formIndex].html.find('input, textarea, select, button') 
		.not('[type="hidden"], [disabled], [type="disabled"]')
		.attr({
			'data-marker' : 'form-element',
			'data-form'   : formIndex
		});

		// If there's a honeypot, remove the marker. 
		if (_o.proxy.honeyPot.find('input').length) {
			_o.proxy.honeyPot.find('input').removeAttr('data-marker');
		}

		// Store marked elements in array. 
		_forms[formIndex].indexing = _forms[formIndex].html.find('[data-marker="form-element"]');

		/* Select Processing
		======================================================= */
		_forms[formIndex].html.find(_o.proxy.select).each(function() {

			var i = _o.proxy.select.index($(this));

			_forms[formIndex].selects[i]       = Object.create(SELECT);
			_forms[formIndex].selects[i].proxy = $(this);
			_forms[formIndex].selects[i].init();

		});

	});

}; /* End Plugin
======================================================================================= */

})(jQuery);