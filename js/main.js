/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++
AUTHOR : R_GENESIS
PROJECT : RGen Landing Page with Page Builder
This file licensed to R_GENESIS (http://themeforest.net/user/r_genesis) and it’s strictly prohibited to copy or reuse it.
Copyright 2015-2018 R.Genesis.Art
++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

; (function () {
	'use strict';

	var rgen = {},
		package_ver = 'v4.6',
		$window = $(window),
		isNovi = window.xMode,
		pageLoader = $('.page-loader'),

		userAgent = navigator.userAgent.toLowerCase(),
	  	isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
	  	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	  	window.rgen = rgen;

	/* CONFIG
	********************************************/
	rgen.config = {
		/*
		URL OF SUCCESS PAGE ON FORM SUBMIT
		*********************/
		success_url: "thankyou.html"
	};


	/* Page loader ********************************************/
	if (pageLoader > 0 && !isNovi) {
		$window.on('load', function () {
			pageLoader.fadeOut('slow');
			$window.trigger("resize");
		});
	} else {
		pageLoader.remove();
	}

	rgen.dmod = false;
	rgen.demo = function () { if (rgen.dmod) { return rgenNotice(); } else { return true; } };

	$(function () {


	var $o = {};
	$o.r                = !rgen.demo ? false : rgen.demo();
	$o.tooltip          = $o.r ? $('[data-toggle="tooltip"]') : false;
	$o.pageLoader       = $('.page-loader').length > 0 && $o.r ? $(".page-loader") : false;
	$o.header           = $('.main-head').length > 0 && $o.r ? $('.main-head') : false;
	$o.menuwrp          = $('.menu-wrp').length > 0 && $o.r ? $('.menu-wrp') : false;
	$o.navlink          = $('.menu-wrp').find(".menu-item").length > 0 && $o.r ? $('.menu-wrp').find(".menu-item") : false;
	$o.fullwh           = $("[data-fullwh='y']").length > 0 && $o.r ? $("[data-fullwh='y']") : false;
	$o.fullh            = $("[data-fullh='y']").length > 0 && $o.r ? $("[data-fullh='y']") : false;
	$o.bgimg            = $("[data-bg]").length > 0 && $o.r ? $("[data-bg]") : false;
	$o.slidebg          = $("[data-slide-bg]").length > 0 && $o.r ? $("[data-slide-bg]") : false;
	$o.section       	= $('#page > section').length > 0 && $o.r ? $("#page > section") : false;
	$o.hoverclass       = $("[data-hover-class]").length > 0 && $o.r ? $("[data-hover-class]") : false;
	$o.bgcolor          = $("[data-bgcolor]").length > 0 && $o.r ? $("[data-bgcolor]") : false;
	$o.txtcolor         = $("[data-txtcolor]").length > 0 && $o.r ? $("[data-txtcolor]") : false;
	$o.gradient         = $("[data-gradient]").length > 0 && $o.r ? $("[data-gradient]") : false;
	$o.videopop         = $(".video-popup").length > 0 && $o.r ? $(".video-popup") : false;
	$o.countbox         = $(".count-box").length > 0 && $o.r ? $(".count-box") : false;
	$o.swipergallery    = $(".swiper-gallery").length > 0 && $o.r ? $(".swiper-gallery") : false;
	$o.othersection1    = $(".other-section-1").length > 0 && $o.r ? $(".other-section-1") : false;
	$o.popgallerywidget = $(".popgallery-widget").length > 0 && $o.r ? $(".popgallery-widget") : false;
	$o.bgslider         = $("[data-bgslider]").length > 0 && $o.r ? $("[data-bgslider]") : false;
	$o.filterwidget     = $(".filter-widget").length > 0 && $o.r ? $(".filter-widget") : false;
	$o.parallax          = $("[data-parallax-img]").length > 0 && $o.r ? $("[data-parallax-img]") : false;
	$o.elanimate        = $("[data-animate-in]").length > 0 && $o.r ? $("[data-animate-in]") : false;
	$o.masonry = $("[data-masonry-grid]").length > 0 && $o.r ? $("[data-masonry-grid]") : false;

	rgen.bgimg = function(obj) {
		$(obj).css({ backgroundImage: "url(" + $(obj).attr("data-bg") + ")" });
	};

	if ($o.r) {



		$('html').before('<!-- ' + package_ver + ' -->');

		$(".copyright-year").text(new Date().getFullYear());

		if (isNovi) {
			$('head').append('<link href="css/builder.css" rel="stylesheet">');
		}


	/* RESPONSIVE
	********************************************/
	enquire.register("screen and (min-width: 992px)", {
		match : function() {
			rgen.device = 'd';
		},
		unmatch : function() {}
	}).register("(min-width: 200px) and (max-width: 991px)", {
		match : function() {
			rgen.device = 'm';
		},
		unmatch : function() {}
	});


	/* HELPERS FUNCTIONS
	********************************************/
	rgen.elcheck = function (el) {
		return $(el).length > 0;
	};

	rgen.setId = function (obj, prefix, n) {
		n++;
		var a = prefix + n;
		$(obj).css({ opacity: 0 });
		$(obj).attr("id", a);
		$(obj).addClass(a);

		// Accordion setup
		if ($(obj).is(".accordion-widget")) {
			$(obj).find(".acc-block").each(function (index, el) {
				var id = a + "-acc-block-" + index;
				$(this).find(".acc-hd").attr("data-accid", "#" + id);
				$(this).find(".acc-content").attr("id", id);
				$(this).find(".acc-hd").append('<i class="acc-open ' + $(obj).attr("data-acc-openclass") + ' "></i><i class="acc-close ' + $(obj).attr("data-acc-closeclass") + '"></i>');
			});
		}
	};

	rgen.getMultiScripts = function (arr, path) {
		var _arr = $.map(arr, function (scr) {
			return $.getScript((path || "") + scr);
		});

		_arr.push($.Deferred(function (deferred) {
			$(deferred.resolve);
		}));

		return $.when.apply($, _arr);
	};


	rgen.getvar = function (v, default_v, val_type) {
		if (val_type == 'n') {
			return v ? parseInt(v, 10) : default_v;
		}
		if (val_type == 'b') {
			if (v == 'true') { return true; }
			else if (v == 'false') { return false; }
			else { return default_v; }
		}
		if (val_type == 's') {
			if (v == 'false') {
				return false;
			} else {
				return v ? v : default_v;
			}
		}
	};

	rgen.fullwh = function (obj) {
		// global vars
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		// set initial div height / width
		$(obj).css({
			'width': winWidth,
			'height': winHeight,
		});
	};

	rgen.fullh = function (obj, wrp) {
		if (wrp) {
			var winHeight = $(obj).closest(wrp).height();
		} else {
			var winHeight = $(window).height();
		}

		// set initial div height / width
		$(obj).css({
			'height': winHeight,
		});
	};

	/* ALL MENU RELATED SCRIPTS
	********************************************/
	rgen.mobmenu = function (el) {
		// Main menu show / hide case
		$(el).on("click", function (e) {
			var nav = $(this).attr('data-nav');
			var c = $(this).attr('data-navclose');
			var o = $(this).attr('data-navopen');

			if ($(nav).hasClass('open')) {
				$(nav).removeClass('open');
				//$(this).find('i').removeClass($(this).attr('data-navclose')).addClass($(this).attr('data-navopen'));
				$(this).find('i').removeClass(c).addClass(o);
			} else {
				$(nav).addClass('open m-nav');
				//$(this).find('i').removeClass($(this).attr('data-navopen')).addClass($(this).attr('data-navclose'));

				$(this).find('i').removeClass(o).addClass(c);
			};
		});

		// Sub menu show / hide
		$('.menu').on("click", '.sub-handler', function(event) {
			var parent_el = $(this).closest(".has-dropdown");
			if ($(parent_el).hasClass('active')) {
				$(parent_el).removeClass('active');
				$(this).addClass('fa-plus').removeClass('fa-minus');
			} else {
				$(parent_el).addClass('active');
				$(this).addClass('fa-minus').removeClass('fa-plus');
			}
		});
	}

	rgen.menuH = function (header, menu) {
		'use strict';
		$(menu).removeAttr('style');
		$(menu).css({
			minHeight: $(header).height()
		});
	}

	rgen.menuFn = function ($menu) {
		'use strict';
		var mEnter = isNovi ? 'click' : 'mouseenter',
			mLeave = isNovi ? 'dblclick' : 'mouseleave';

		$menu.on(mEnter, '.has-dropdown', function(event) {
			$(this).addClass('active');
			$(this).children('.sub-handler').addClass('fa-minus').removeClass('fa-plus');
		});
		$menu.on(mLeave, '.has-dropdown', function(event) {
			$(this).removeClass('active');
			$(this).children('.sub-handler').addClass('fa-plus').removeClass('fa-minus');
			$(this).children('.sub').removeAttr('style');
		});

		$menu.on(mEnter, '.menu-item', function(event) {
			event.preventDefault();

			if($(this).children('.sub').length != 0){
				$(this).children('.sub').removeAttr('style');

				var submenu = $(this).children('.sub'),
					dropdown = $(submenu).offset(),
					l_offset_from_container = dropdown.left - (($(window).width()-$('.main-head > .container').width())/2),
					overflow_menu_w = l_offset_from_container + $(submenu).outerWidth() - $('.main-head > .container').width();

				if (overflow_menu_w > 0) {
					$(submenu).css({
						marginLeft: '-' + overflow_menu_w + 'px',
					});
				}

			}

		});
	}

	rgen.headerFn = function ($header) {

		if ($header.attr('data-sticky') == 'y') {

			// Hook to check data-sticky menu
			$('html').addClass('data-sticky');

			$header.addClass('fixed-top').removeClass('show-above');

			if ($(window).scrollTop() > $header.height()) {
				//console.log($header.height());
				$header.addClass("header-sticky");
				$header.attr('data-glass') === 'y' ? $header.removeClass('bg-glass') : null;
				rgen.menuH($header, $header.find('.menu'));
			} else {
				$header.removeClass("header-sticky");
				$header.attr('data-glass') === 'y' ? $header.addClass('bg-glass') : null;
				rgen.menuH($header, $header.find('.menu'));
			}
		};

		if ($header.attr('data-sticky-scroll') == 'y') {
			if ($(window).scrollTop() > $header.height()) {
				$header.addClass('fixed-top').addClass("header-sticky");
				rgen.menuH($header, $header.find('.menu'));
			} else {
				$header.removeClass('fixed-top').removeClass("header-sticky");
				rgen.menuH($header, $header.find('.menu'));
			}
		}

		if ($header.attr('data-hide') == 'y' && rgen.device == 'd') {

			$header.addClass('header-hide');

			if ($(window).scrollTop() > $header.height()) {
				$header.addClass("header-show");
				rgen.menuH($header, $header.find('.menu'));
			} else {
				$header.removeClass("header-show");
				rgen.menuH($header, $header.find('.menu'));
			}
		};
	}


	rgen.linkscroll = function (obj) {
		'use strict';
		$(document).on('click', obj, function (e) {
			e.preventDefault();
			if ($(this).closest('.nav-links').hasClass('nav-links') == false && $(this).attr('href').indexOf("popup") === -1) {
				// target element id
				var id = $(this).attr('href');
				// target element
				var $id = $(id);
				if ($id.length === 0) { return; }
				// top position relative to the document
				var pos = $(id).offset().top;
				// animated top scrolling
				$('body, html').animate({ scrollTop: pos }, 1200);
			};
		});
	}



	/* NAVIGATION
	********************************************/
	if (!isNovi) {
		if ($o.navlink) {
			$o.navlink.find('a').smoothScroll({
				speed: 1200,
				//offset: $o.header.attr('data-sticky') == 'y' || $o.header.attr('data-sticky-scroll') == 'y' ? -($o.header.height() - 20) : 0,
				beforeScroll: function () {
					$o.navlink.find('a').removeClass('active');
					$('.nav-handle').trigger('tap');
				},
				afterScroll: function () {
					$(this).addClass('active');
				}
			});
		};
	}

	/* LINK SCROLL
	********************************************/
	if (!isNovi) {
		if (rgen.elcheck("#page[data-linkscroll='y']")) {
			rgen.linkscroll('a[href^="#"]:not(.nav-links)');
		};
	}

	/* All header utilities
	********************************************/
	if ($o.menuwrp) {
		var $menu = $('.menu');
		$('.menu .has-dropdown').each(function() {
			$(this).prepend('<b class="sub-handler fa fa-plus">');
			if ($(this).hasClass('menu-item')) {
				$(this).children('ul').addClass('sub');
				$(this).children('.mega-menu').addClass('sub');
			}
		});
	}

	if (!isNovi) {
		if ($o.header) {

			$o.header.attr('data-glass') === 'y' ? $o.header.addClass('bg-glass') : null;
			$o.header.attr('data-above') === 'y' ? $o.header.addClass('show-above') : null;
			rgen.menuH($o.header, $o.header.find('.menu'));

			/* Change sticky with scroll for small screens */
			/*if (rgen.device == 'm') {
				$('.main-head').removeAttr('data-sticky').attr('data-sticky-scroll', 'y');
			}*/
			if ($o.header.attr('data-sticky') == 'y' || $o.header.attr('data-sticky-scroll') == 'y' || $o.header.attr('data-hide') == 'y' && rgen.device == 'd') {
				$(window).scroll(function () {
					rgen.headerFn($o.header);
				});
				rgen.headerFn($o.header);
			}
		}
	}


	/* CAROUSEL SCRIPTS
	********************************************/
	rgen.owlitems = function (arr) {
		if (typeof (arr) == "string" && arr != 'false') {
			var t1 = arr.split('|');
			var t2 = {};
			$.each(t1, function (index, val) {
				var str = val;
				var newarr = str.split(',');
				t2[newarr[0]] = {}
				t2[newarr[0]] = { items: parseInt(newarr[1], 10) };
			});
			return t2;
		} else if (arr === 'false') {
			return {};
		} else {
			return false;
		}
	};

	rgen.swiper_gallery_th = function (obj, swi) {

		var swi_slides = [];
			//swi_slide = '';

		$(obj).find('.swiper-slide').each(function(index, el) {
			var _gl_img = $(this).attr("data-slide-bg"),

				swi_slide  = '<!-- Thumb image -->';
				swi_slide += '<div class="swiper-slide min-px-w100" style="background-image: url('+_gl_img+');" data-slide-bg="'+_gl_img+'"></div>';

				swi_slides.push(swi_slide);
		});

		//$(obj+"_th").find('.swiper-wrapper').html(swi_slides);
		swi.removeAllSlides();
		swi.appendSlide(swi_slides);
		swi.update();
	}

	rgen.swiper_gallery = function (obj) {
		var config = {
			autoplay: rgen.getvar($(obj).attr('data-autoplay'), false, 'b'),
			/*speed: rgen.getvar($(obj).attr('data-speed'), 1000, 'n'),
			fullsize: rgen.getvar($(obj).attr('data-fullsize'), false, 'b'),*/
		}

		//var galleryTop = new Swiper(obj + ' .gallery-top', {
		var galleryTop = new Swiper(obj, {
			spaceBetween: 10,
			effect: 'slide',
			// Navigation arrows
			navigation: {
			  nextEl: obj + ' .swiper-button-next',
			  prevEl: obj + ' .swiper-button-prev',
			},
			on: {
				init: function () {
					$(obj).animate({ opacity: 1 }, 300);
				},
			},
			simulateTouch: !isNovi ? true : false,
		});

		//var galleryThumbs = new Swiper(obj + ' .gallery-thumbs', {
		var galleryThumbs = new Swiper(obj+"_th", {
			spaceBetween: 10,
			centeredSlides: true,
			slidesPerView: 'auto',
			touchRatio: 0.2,
			slideToClickedSlide: true,
			autoplay: config.autoplay,
			simulateTouch: !isNovi ? true : false,
		});

		galleryTop.controller.control = galleryThumbs;

		rgen.swiper_gallery_th(obj, galleryThumbs);
		galleryTop.on('update', function () {
			rgen.swiper_gallery_th(obj, galleryThumbs);
		});

		galleryThumbs.controller.control = galleryTop;

		rgen.slidebg();
	};

	/* Swiper widget
	********************************************/
	rgen.slidebg = function () {
		if ($o.slidebg) {
			for (var i = 0; i < $o.slidebg.length; i++) {
				$($o.slidebg[i]).css({ backgroundImage: "url(" + $($o.slidebg[i]).attr("data-slide-bg") + ")" });
			}
		}
	};

	// Swiper gallery mode
	if ($o.swipergallery) {
		for (var i = 0; i < $o.swipergallery.length; i++) {
			// SET ID ON ALL OBJECTS
			var swiGal = 'swiperGallery' + i,
				swiGal_th = 'swiperGallery' + i + "_th";
			//$($o.swipergallery[i]).css({ opacity: 0 }).attr("id", swiGal).addClass(swiGal);
			$($o.swipergallery[i]).find('.gallery-top').attr("id", swiGal).addClass(swiGal);
			$($o.swipergallery[i]).find('.gallery-thumbs').attr("id", swiGal_th).addClass(swiGal);
			rgen.swiper_gallery("#" + swiGal);
		}
	}


	/* Tab widget
	********************************************/
	if ($o.tabwidget) {
		for (var i = 0; i < $o.tabwidget.length; i++) {
			rgen.tabs($($o.tabwidget[i]).find('[data-tb]'));
		}
	}

	if ($o.tabsauto) {
		for (var i = 0; i < $o.tabsauto.length; i++) {
			var tabObj = {
				count: i,
				tb: $o.tabsauto[i]
			};
			rgen.tabs(tabObj);
		}
	}

	/* POPUP JS
	********************************************/
	rgen.videoPopup = function (obj) {
		$(obj).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};

	rgen.inlinePopup = function (obj) {
		$('body').off('click').on('click', obj, function (e) {
			$(this).magnificPopup({
				type: 'inline',
				preloader: false
			}).click();
		});
	};


	/* Video popup
	********************************************/
	if ($o.videopop) {
		for (var i = 0; i < $o.videopop.length; i++) {
			rgen.videoPopup($o.videopop[i]);
		}
	}

	/* BACKGROUND SLIDERS
	********************************************/
	rgen.bgSlider = function (setting) {
		setTimeout(function () {
			$(setting.obj).vegas({
				delay: setting.delay,
				slides: setting.slides,
				animation: setting.effect
			});
		}, 1000);
	};

	/* Background slider
	********************************************/
	if ($o.bgslider) {
		for (var i = 0; i < $o.bgslider.length; i++) {
			if ($($o.bgslider[i]).attr('data-bgslider')) {


				var s1 = $($o.bgslider[i]).attr('data-bgslider'),
					s2 = s1.split('|'),
					el = $o.bgslider[i],
					bgslides = [];

				$.each(s2, function (index, val) {
					bgslides.push({ src: val });
				});

				//console.log(bgslides);
				$(el).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					animation: 'kenburns'
				});
			}

		}
	}

	/* FILTAERABLE ITEMS
	********************************************/
	rgen.filter = function (obj) {
		$(obj).animate({ opacity: 1 }, 500, function () { });
		var filterObj = $(obj);
		var container = filterObj.find('.filter-container');
		var list = filterObj.find('.filter-list');
		var time = 500;

		list.find('[data-filter]').on('click', function (event) {
			event.preventDefault();

			var filter = $(this).attr("data-filter");

			list.find("[data-filter]").removeClass('active');
			$(this).addClass('active');

			container.find('.filter-content').stop().animate({ opacity: 0 }, 150, function () {
				$(this).hide();
				if (filter == 'all') {
					container.find('.filter-content').show().stop().animate({ opacity: 1 }, time);
				} else {
					$(filter).show().stop().animate({ opacity: 1 }, time);
				}
			});

		});

		list.find('.active') ? list.find('.active').trigger('click') : list.find('[data-filter]').first().trigger('click');
	};

	/* Filter widget
	********************************************/
	if ($o.filterwidget) {
		for (var i = 0; i < $o.filterwidget.length; i++) {
			$o.filterwidget[i]
			rgen.setId($o.filterwidget[i], 'filterwidget', i);
			rgen.filter($o.filterwidget[i]);
		}
	}
	/**
	 * Initialize All Scripts
	 */
	var maps = document.querySelectorAll(".google-map-container");
	if (maps.length) {
		$.getScript("//maps.google.com/maps/api/js?key=AIzaSyAwH60q5rWrS8bXwpkZwZwhw9Bw0pqKTZM&sensor=false&libraries=geometry,places&v=3.7", function () {
			var head = document.getElementsByTagName('head')[0],
					insertBefore = head.insertBefore;

			head.insertBefore = function (newElement, referenceElement) {
				if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
					return;
				}
				insertBefore.call(head, newElement, referenceElement);
			};

			var geocoder = new google.maps.Geocoder;
			for (var i = 0; i < maps.length; i++) {
				var zoom = parseInt(maps[i].getAttribute("data-zoom")) || 11;
				var styles;
				if (maps[i].hasAttribute('data-styles')){
					try {
						styles = JSON.parse(maps[i].getAttribute("data-styles"));
					}
					catch (error){
						styles = [];
					}
				}
				var center = maps[i].getAttribute("data-center");

				// Initialize map
				var map = new google.maps.Map(maps[i].querySelectorAll(".google-map")[0], {
					zoom: zoom,
					styles: styles,
					scrollwheel: false,
					center: {lat: 0, lng: 0}
				});
				// Add map object to map node
				maps[i].map = map;
				maps[i].geocoder = geocoder;
				maps[i].google = google;

				// Get Center coordinates from attribute
				getLatLngObject(center, null, maps[i], function (location, markerElement, mapElement) {
					mapElement.map.setCenter(location);
				});

				// Add markers from google-map-markers array
				var markerItems = maps[i].querySelectorAll(".google-map-markers li");
				if (markerItems.length){
				var markers = [];
				for (var j = 0; j < markerItems.length; j++){
					var markerElement = markerItems[j];
					getLatLngObject(markerElement.getAttribute("data-location"), markerElement, maps[i], function(location, markerElement, mapElement){
						var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
						var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
						var info = markerElement.getAttribute("data-description") || "";
						var infoWindow = new google.maps.InfoWindow({
							content: info
						});
						markerElement.infoWindow = infoWindow;
						var markerData = {
							position: location,
							  map: mapElement.map
						}
						if (icon){
						  markerData.icon = icon;
						}
						var marker = new google.maps.Marker(markerData);
						markerElement.gmarker = marker;
						markers.push({markerElement: markerElement, infoWindow: infoWindow});
						marker.isActive = false;
						// Handle infoWindow close click
						google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
							var markerIcon;
							markerElement.gmarker.isActive = false
							if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
								markerElement.gmarker.setIcon(markerIcon);
							}
						}).bind(this, markerElement, mapElement));


							// Set marker active on Click and open infoWindow
							google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
								if (markerElement.infoWindow.getContent().length === 0) return;
								var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
								for (var k =0; k < markers.length; k++){
									var markerIcon;
									if (markers[k].markerElement === markerElement){
										currentInfoWindow = markers[k].infoWindow;
									}
									gMarker = markers[k].markerElement.gmarker;
									if (gMarker.isActive && markers[k].markerElement !== markerElement){
										gMarker.isActive = false;
										if (markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
											gMarker.setIcon(markerIcon);
										}
											markers[k].infoWindow.close();
									}
								}

								currentMarker.isActive = !currentMarker.isActive;
								if (currentMarker.isActive) {
									if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
										currentMarker.setIcon(markerIcon);
									}

										currentInfoWindow.open(map, marker);
								}else{
									if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
										currentMarker.setIcon(markerIcon);
									}
										currentInfoWindow.close();
								}
							}).bind(this, markerElement, mapElement))
					})
				}
				}
			}
		});
	}

	function getLatLngObject(str, marker, map, callback) {
		var coordinates = {};
		try {
			coordinates = JSON.parse(str);
			callback(new google.maps.LatLng(
						coordinates.lat,
						coordinates.lng
					), marker, map);
		} catch (e) {
			map.geocoder.geocode({'address': str}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					callback(new google.maps.LatLng(
						parseFloat(latitude),
						parseFloat(longitude)
					), marker, map);
				}
			});
		}
	}

	/* Banner grids
	********************************************/
	// if ($o.masonry) {
	// 	$($o.masonry).each(function(index, el) {
	//
	// 		var masonry_wrp = $(this).closest('.masonry-wrp');
	//
	// 		masonry_wrp.css({
	// 			opacity: 0,
	// 		});
	//
	// 		var $mGrid = $(this).imagesLoaded()
	// 		.always( function( instance ) {
	// 			//console.log('all images loaded');
	// 		})
	// 		.done( function( instance ) {
	// 			//console.log('all images loaded');
	// 		})
	// 		.fail( function() {
	// 			//console.log('all images loaded, at least one is broken');
	// 		})
	// 		.progress( function( instance, image ) {
	//
	// 		});
	//
	// 		masonry_wrp.animate({
	// 			opacity: 1},
	// 			600, function() {
	// 			$mGrid.isotope({
	// 				itemSelector: '.masonry-item',
	// 				percentPosition: true,
	// 				stagger: 30,
	// 				layoutMode: 'packery',
	// 				hiddenStyle: {
	// 					opacity: 0
	// 				},
	// 				visibleStyle: {
	// 					opacity: 1
	// 				}
	// 			});
	// 		});
	//
	// 		$(masonry_wrp).on('click', '.filters [data-filter]', function(event) {
	// 			event.preventDefault();
	//
	// 			$(masonry_wrp).find('.filters [data-filter]').removeClass('active');
	// 			$(this).addClass('active');
	//
	// 			var filterValue = $(this).attr('data-filter');
	// 			// use filterFn if matches value
	// 			$mGrid.isotope({ filter: filterValue });
	// 		});
	// 	});
	// }

	if ($o.bgimg) {
		for (var i = 0; i < $o.bgimg.length; i++) {
			rgen.bgimg($o.bgimg[i]);
			//$($o.bgimg[i]).css({ backgroundImage: "url(" + $($o.bgimg[i]).attr("data-bg") + ")" });
			//$($o.bgimg[i]).css({ backgroundImage: "url(" + $($o.bgimg[i]).attr("data-rgenbackground") + ")" });
		}
	}

	if ($o.bgcolor) {
		for (var i = 0; i < $o.bgcolor.length; i++) {
			$($o.bgcolor[i]).css({ backgroundColor: $($o.bgcolor[i]).attr("data-bgcolor") });
		}
	}

	if ($o.txtcolor) {
		for (var i = 0; i < $o.txtcolor.length; i++) {
			$($o.txtcolor[i]).css({ color: $($o.txtcolor[i]).attr("data-txtcolor") });
		}
	}
	if ($o.hoverclass) {
		for (var i = 0; i < $o.hoverclass.length; i++) {
			var hov_class = $($o.hoverclass[i]).attr('data-hover-class');
			$($o.hoverclass[i]).hover(
				function() {
					$(this).addClass(hov_class);
				}, function() {
					$(this).removeClass(hov_class);
				}
			);
		}
	}

	if ($o.gradient) {
		for (var i = 0; i < $o.gradient.length; i++) {
			$o.gradient[i];

			var grd_colors = $($o.gradient[i]).attr('data-g-colors'),
				grd_color = grd_colors.split('|');
			$($o.gradient[i]).css({
				background: "linear-gradient(to bottom, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
			});
		}
	}


	/* Animated element
	********************************************/
	if ($o.elanimate) {
		for (var i = 0; i < $o.elanimate.length; i++) {

			var animateobj = $($o.elanimate[i]),
				animatein = animateobj.attr('data-animate-in'),
				animatearr = animatein.indexOf('|') > -1 ? animatein.split('|') : animatein,
				animateclass = typeof animatearr == 'object' ? animatearr[0] : animatearr,
				animatedelay = typeof animatearr == 'object' ? animatearr[1] : 0;

			animateobj.css({
				'-webkit-animation-delay': animatedelay + 's',
				'animation-delay': animatedelay + 's'
			});

			animateobj.viewportChecker({
				classToAdd: 'animated ' + animateclass,
				offset: 100
			});
		}
	}


	/**
	* Material Parallax
	* @description Enables Material Parallax plugin
	*/
	if ($o.parallax) {
		if (!isNovi && !isIE && !isMobile) {
			for (var i = 0; i < $o.parallax.length; i++) {
				$($o.parallax[i]).parallax();
			}
		} else {
			for (var i = 0; i < $o.parallax.length; i++) {
				var parallax = $($o.parallax[i]),
				  	imgPath = parallax.data("parallax-img");

				parallax.css({
					"background-image": 'url(' + imgPath + ')',
					"background-attachment": "fixed",
					"background-size": "cover"
				});
			}
		}
	}

	/* Count box
	********************************************/
	if ($o.countbox) {
		var count_obj = document.querySelectorAll(".count-box");

		for (var i = 0; i < count_obj.length; i++) {
			var count_b = count_obj[i], //$($o.countbox[i]),
				count_o = $(count_b).find('.count'),
				count_val = parseInt(count_o.text()),
				count_prefix = count_o.attr('data-prefix'),
				count_suffix = count_o.attr('data-suffix'),

				options = {
					useEasing: true,
					useGrouping: true,
					separator: ',',
					decimal: '.',
					prefix: count_prefix ? count_prefix : '',
					suffix: count_suffix ? count_suffix : ''
				};


			// Params: Obj | Start val | End val | Decimals | Duration | options;
			var count_box = new CountUp(count_b.querySelector(".count"), 0, count_val, 0, 3, options);

			if (!count_box.error) {
				count_box.start();
			} else {
				console.error(count_box.error);
			}
		}

	};



		/* RESPONSIVE
		********************************************/
		enquire.register("screen and (min-width: 992px)", {
			match : function() {
				if ($o.menuwrp) {
					var $menu = $('.menu');
					rgen.menuFn($menu);
				}

				if ($('html').hasClass('data-sticky')) {
					/* Change sticky with scroll for small screens */
					$('.main-head').attr('data-sticky', 'y').removeAttr('data-sticky-scroll', 'y');
					$('[data-sticky]').addClass('fixed-top');
				}
			},
			unmatch : function() {}
		}).register("(min-width: 200px) and (max-width: 991px)", {
			match : function() {
				if ($o.menuwrp) {
					var $menu = $('.menu');
					$menu.find('.has-dropdown').off('mouseenter');
					$menu.find('.has-dropdown').off('mouseleave');
					$menu.removeAttr('style');
				}

				rgen.mobmenu('.nav-handle');
				$('html').addClass('data-sticky');
				$('[data-sticky]').removeClass('fixed-top');

				/* Change sticky with scroll for small screens */
				$('.main-head').removeAttr('data-sticky').attr('data-sticky-scroll', 'y');
			},
			unmatch : function() {
				$('[data-sticky]').addClass('fixed-top');
				if ($o.menuwrp) {
					var $menu = $('.menu');
					rgen.menuFn($menu);
				}
			}
		});

	} else {
		$o.r ? rgen.demo() : $('html').html('');
	}

	});
})();