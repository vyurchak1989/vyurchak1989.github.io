(function($) {

    "use strict";

    // Document ready function 
    $(function() {

        /* Fixing for hover effect at IOS */
        $('*').on('touchstart', function() {
            $(this).trigger('hover');
        }).on('touchend', function() {
            $(this).trigger('hover');
        });

        
        if ($('.gallery-wrapper').length) {

            $('.gallery-wrapper').magnificPopup({
                type: 'image',
                delegate: 'a',
                gallery: {
                    enabled: true
                }
            });
        }

        /*-------------------------------------
         Popup
         -------------------------------------*/

        if ($(".popup-youtube").length) {

            $('.popup-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        /*-------------------------------------
         On click loadmore functionality
         -------------------------------------*/
        $('.loadmore').on('click', 'a', function(e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.parents('.menu-list-wrapper'),
                _target = _parent.find('.menu-list'),
                _set = _target.find('.menu-item.hidden').slice(0, 3); // Here 2 is the limit
            if (_set.length) {
                _set.animate({ opacity: 0 });
                _set.promise().done(function() {
                    _set.removeClass('hidden');
                    _set.show().animate({ opacity: 1 }, 1000);
                });
            } else {
                _this.text('No more item to display');
            }

            return false;
        });
        $('.loadmore-4pcs').on('click', 'a', function(e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.parents('.menu-list-wrapper'),
                _target = _parent.find('.menu-list'),
                _set = _target.find('.menu-item.hidden').slice(0, 4); // Here 2 is the limit
            if (_set.length) {
                _set.animate({ opacity: 0 });
                _set.promise().done(function() {
                    _set.removeClass('hidden');
                    _set.show().animate({ opacity: 1 }, 1000);
                });
            } else {
                _this.text('No more item to display');
            }

            return false;
        });
        $('.loadmore-2pcs').on('click', 'a', function(e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.parents('.menu-list-wrapper'),
                _target = _parent.find('.menu-list'),
                _set = _target.find('.menu-item.hidden').slice(0, 2); // Here 2 is the limit
            if (_set.length) {
                _set.animate({ opacity: 0 });
                _set.promise().done(function() {
                    _set.removeClass('hidden');
                    _set.show().animate({ opacity: 1 }, 1000);
                });
            } else {
                _this.text('No more item to display');
            }

            return false;
        });

    });

    /*-------------------------------------
     jQuery MeanMenu activation code
     --------------------------------------*/
    $('nav#dropdown').meanmenu({ siteLogo: "<div class='mobile-menu-back'><a href='index.html' class='logo-mobile-menu'><img src='img/mobile-logo.png' class='img-responsive'/></a></div>" });

    /*-------------------------------------
     Wow js Active
     -------------------------------------*/
    new WOW().init();

    /*-------------------------------------
     Jquery Scollup
     -------------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*-------------------------------------
     Window load function
     -------------------------------------*/
    $(window).on('load', function() {

        // Page Preloader
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });

        /*-------------------------------------
         jQuery for Isotope initialization
         -------------------------------------*/
        var $container = $('#isotope-container');
        if ($container.length > 0) {

            // Isotope initialization
            var $isotope = $container.find('.featuredContainer').isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            // Isotope filter
            $container.find('.isotope-classes-tab').on('click', 'a', function() {

                var $this = $(this);
                $this.parent('.isotope-classes-tab').find('a').removeClass('current');
                $this.addClass('current');
                var selector = $this.attr('data-filter');
                $isotope.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;

            });
        }
    }); // end window load function

    /*-------------------------------------
     Counter
     -------------------------------------*/
    var counterContainer = $('.counter');
    if (counterContainer.length) {
        counterContainer.counterUp({
            delay: 50,
            time: 5000
        });

    }

    /*-------------------------------------
     Select2 activation code
     -------------------------------------*/
    if ($('#checkout-form select.select2, #search-form select.select2').length) {
        $('#checkout-form select.select2, #search-form select.select2').select2({
            theme: 'classic',
            dropdownAutoWidth: true,
            width: '100%'
        });
    }

    /*-------------------------------------
     Contact Form processing
     -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function(e) {
            var _this = $(this),
                target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                target.html("<div class='alert alert-danger'><p>Please select all required field.</p></div>");
            } else {
                $.ajax({
                    url: "vendor/php/form-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function() {
                        target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function(text) {
                        if (text === "success") {
                            _this[0].reset();
                            target.html("<div class='alert alert-success'><p><i class='fa fa-check' aria-hidden='true'></i>Message has been sent successfully.</p></div>");
                        } else {
                            target.html("<div class='alert alert-danger'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
     Countdown activation code
     -------------------------------------*/
    $('#countdown').countdown('2018/01/01', function(e) {

        $(this).html(e.strftime("<div class='countdown-section'><h3>%D</h3> <p>Day%!D</p> </div><div class='countdown-section'><h3>%H</h3> <p>Hour%!H</p> </div><div class='countdown-section'><h3>%M</h3> <p>Minute%!M</p> </div><div class='countdown-section'><h3>%S</h3> <p>Second%!S</p> </div>"));

    });

    /*-------------------------------------
     Carousel slider initiation
     -------------------------------------*/
    $('.law-carousel').each(function() {
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots'),
            center = carousel.data('center');

        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            navSpeed: (navSpeed ? true : false),
            center: (center ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: (rXsmall ? rXsmall : 1),
                    nav: (rXsmallNav ? true : false),
                    dots: (rXsmallDots ? true : false)
                },
                480: {
                    items: (rXmedium ? rXmedium : 2),
                    nav: (rXmediumNav ? true : false),
                    dots: (rXmediumDots ? true : false)
                },
                768: {
                    items: (rSmall ? rSmall : 3),
                    nav: (rSmallNav ? true : false),
                    dots: (rSmallDots ? true : false)
                },
                992: {
                    items: (rMedium ? rMedium : 5),
                    nav: (rMediumNav ? true : false),
                    dots: (rMediumDots ? true : false)
                }
            }
        });

    });

    /*-------------------------------------
     Window onLoad and onResize event trigger
     -------------------------------------*/
    $(window).on('load resize', function() {
        //Define the maximum height for mobile menu
        var wHeight = $(window).height(),
            mLogoH = $('a.logo-mobile-menu').outerHeight();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('height', wHeight + 'px');

    });

    /*-------------------------------------
    Onepage Nav 
    -------------------------------------*/
    $(window).on('load', function() {
        // Onepage Nav on meanmenu
        var onePageNav = $('#navOnePage');
        if (onePageNav.length) {
            $('#navOnePage').onePageNav({
                scrollOffset: 80,
                end: function() {
                    $('.meanclose').trigger('click');
                }
            });
        }

    });

    /*-------------------------------------
     Auto height for product listing
     -------------------------------------*/
    $(window).on('load resize', function() {
        equalHeight();
    });

    function equalHeight() {
        var imgH = 0,
            boxH = 0,
            wWidth = $(window).width(),
            allH;
        $('.equal-height-wrap .item-img,.equal-height-wrap .item-content').height('auto');
        if (wWidth > 767) {
            $('.equal-height-wrap').each(function() {
                var self = $(this);

                var TempImgH = self.find('.item-img').height();
                imgH = TempImgH > imgH ? TempImgH : imgH;
                var TempBoxH = self.find('.item-content').outerHeight();
                boxH = TempBoxH > boxH ? TempBoxH : boxH;
            });

            allH = imgH;
            allH = boxH > imgH ? boxH : imgH;
            $('.equal-height-wrap .item-img,.equal-height-wrap .item-content').height(allH + "px");
        }

    }

    if ($('.zoom-gallery').length) {
            $('.zoom-gallery').each(function() { // the containers for all your galleries
                $(this).magnificPopup({
                    delegate: 'a.elv-zoom', // the selector for gallery item
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

    /*-------------------------------------
     Jquery Stiky Menu at window Load
     -------------------------------------*/
    $(window).on('scroll', function() {

        var s = $('#sticker'),
            w = $('body'),
            h = s.outerHeight(),
            windowpos = $(window).scrollTop(),
            windowWidth = $(window).width(),
            h1 = s.parent('#header-one'),
            h2 = s.parent('#header-two'),
            h3 = s.parent('#header-three'),
            h3H = h3.find('.header-top-bar').outerHeight(),
            topBar = s.prev('.header-top-bar'),
            tempMenu;


        if (windowWidth > 991) {
            w.css('padding-top', '');
            var topBarH, mBottom = 0;
            if (h1.length) {
                topBarH = h = 1;
                mBottom = 0;
            } else if (h2.length) {
                mBottom = h2.find('.main-menu-area').outerHeight();
                topBarH = w.find("#top-slider").outerHeight();
                topBarH = mBottom + topBarH;
            } else if (h3.length) {
                topBarH = topBar.outerHeight();
                if (windowpos <= topBarH) {
                    if (h3.hasClass('header-fixed')) {
                        h3.css('top', '-' + windowpos + 'px');
                    }
                }
            }

            if (windowpos >= topBarH) {
                if (h3.length || h1.length) {
                    s.addClass('stick');
                }
                if (h3.length) {
                    if (h3.hasClass('header-fixed')) {
                        h3.css('top', '-' + topBarH + 'px');
                    } else {
                        w.css('padding-top', h + 'px');
                    }
                } else if (h2.length) {
                    h2.addClass('hide-menu');
                    tempMenu = h2.find('.main-menu-area').clone();
                    tempMenu.addClass('temp-main-menu stick').attr("id", '');
                    tempMenu.css({ opacity: 0 });
                    if (h2.find('.temp-main-menu.stick').length == 0) {
                        h2.append(tempMenu);
                        h2.find('.temp-main-menu.stick').animate({ opacity: 1 }, 100);
                    }

                    if (h2.find('.temp-main-menu.stick').length > 1) {
                        h2.find('.temp-main-menu.stick').last().remove();
                    }
                }
            } else {
                s.removeClass('stick');
                if (h3.length) {
                    w.css('padding-top', 0);
                } else if (h2.length) {
                    h2.removeClass('hide-menu');
                    h2.find('.stick.temp-main-menu').remove();
                }
            }
        }

    });

    /*-------------------------------------
     Jquery Serch Box
     -------------------------------------*/

    $(document).on('click', '#top-search-form .search-button', function(e) {
        e.preventDefault();

        var targrt = $(this).prev('input.search-input');
        targrt.animate({
            width: ["toggle", "swing"],
            opacity: "toggle"
        }, 600, "linear");

        return false;

    });


    /*-------------------------------------
     Accordion for fixing F&Q
     -------------------------------------*/
    var faqAccordion = $('#faq-accordian');
    faqAccordion
        .on('show.bs.collapse', function(e) {
            faqAccordion.find('.panel-heading').removeClass('active');
            $(e.target).parents('.panel').find('.panel-heading').addClass('active');
            faqAccordion.find('.panel-collapse.collapse').slideUp('slow', function() {
                $(this).removeClass('in').css('display', '');
            });
        });

    /*-------------------------------------
     Accordion
     -------------------------------------*/
    var accordion = $('#accordion');
    accordion.find('.panel-collapse').each(function() {
        if ($(this).hasClass('in')) {
            $(this).parents('.panel').find('.panel-heading').addClass('active');
        }
    });
    accordion
        .on('show.bs.collapse', function(e) {
            $(e.target).parents('.panel').find('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
            $(e.target).parents('.panel').find('.panel-heading').removeClass('active');
        });

    

    /*-------------------------------------
     Google Map
     -------------------------------------*/
    if ($("#googleMap").length) {
        window.onload = function() {
            var styles = [{
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#b7d0ea' }]
            }, {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ visibility: 'off' }]
            }, {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ visibility: 'off' }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#d8b1b1' }]
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#d8b1b1' }]
            }, {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d8b1b1' }]
            }];
            var options = {
                mapTypeControlOptions: {
                    mapTypeIds: ['Styled']
                },
                center: new google.maps.LatLng(-37.81618, 144.95692),
                zoom: 11,
                disableDefaultUI: true,
                mapTypeId: 'Styled'
            };
            var div = document.getElementById('googleMap');
            var map = new google.maps.Map(div, options);
            var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
            map.mapTypes.set('Styled', styledMapType);
        };
    }

    function headerNsliderResize() {
        var Hh3 = $('#header-three'),
            wWidth = $(window).width(),
            Hh3slider = Hh3.parents('#wrapper').find("#fixed-type-slider"),
            mHeight = Hh3.outerHeight();
        if (wWidth < 992) {
            mHeight = $('body > .mean-bar').outerHeight();
        }
        Hh3slider.css("margin-top", mHeight + 'px');
    }

})(jQuery);
