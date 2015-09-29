/*** Set/Get Cookies *************************************************/
function setCookie(name, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + 31536000000);
  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
  var value = '; ' + document.cookie,
      parts = value.split('; ' + name + '=');
  if(parts.length == 2) return parts.pop().split(';').shift();
}


/*** Get URL Parameter ***********************************************/
function getParameter(name) {
  var regEx = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)"),
  results = regEx.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


/*** Scroll Block ****************************************************/
(function($) {

  $(document).on('mousewheel DOMMouseScroll','.overlay, #contact-form', function(e) {
    e.delta = null;

    if(e.originalEvent) {
       if(e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
       if(e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
       if(e.originalEvent.detail) e.delta = e.originalEvent.detail;
    }

    var scrollTo = null;

    if(e.type === 'mousewheel') {
       scrollTo = (e.delta * +1);
    }
    else if(e.type === 'DOMMouseScroll') {
       scrollTo = 40 * e.delta;
    }
    if(scrollTo) {
       e.preventDefault();
       $(this).scrollTop(scrollTo + $(this).scrollTop());
    }
  });

})(jQuery);


/*** Input Validation ************************************************/
function validateInput(input, type) {
    switch(type) {
      case 'text':
        var regEx = new RegExp(/^[a-zA-ZčćžšđČĆŽŠĐ]+$/);
        break;
      case 'mixed':
        var regEx = new RegExp(/^[a-zA-Z0-9čćžšđČĆŽŠĐ.\- ]+$/);
        break;
      case 'phone':
        var regEx = new RegExp(/^[0-9\-// ]+$/);
        break;
	  case 'email':
        var regEx = new RegExp(/^[a-zA-Z0-9\-_.@]+$/);
        break;
      case 'general':
        var regEx = new RegExp(/^[a-zA-Z0-9\-_.,@\/& ]+$/);
        break;
    }

    $(document).on('keypress', input,  function(e) {
      var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if(!regEx.test(key)) { e.preventDefault(); }
    });
  }

  validateInput('.input[data-type="text"]', 'text');
  validateInput('.input[data-type="mixed"]', 'mixed');
  validateInput('.input[data-type="phone"]', 'phone');
  validateInput('.input[data-type="email"]', 'email');


/*** Miscellaneous ***************************************************/
$('a[href="#"]').attr('href','javascript:void(0);');

function overlay() {
  if($('.overlay').length < 1) {
    $('body').append('<span class="overlay"></span>'); 
  }
  var overlay = ($('.overlay').css('display') == 'none') ? $('.overlay').fadeIn(600, 'linear') : $('.overlay').fadeOut(600, 'linear');
}

$('.promo1').one('mouseenter', function() {
  var price = 450;
  setInterval(function() {
    if(price<499) { price++; $('.d-price').text(price); }
  }, 10);
});

/*** Navigation ******************************************************/
(function($) {

  $(window).scroll(function() {
    var fn = ($(this).scrollTop() > 100) ? $('#main-nav').addClass('nav-fixed') : $('#main-nav').removeClass('nav-fixed');
  });

  $('#main-nav li').mouseenter(function() {
    $(this).children('.ul-wrapper').stop().slideDown(200, 'linear');
  }).mouseleave(function() {
    $(this).children('.ul-wrapper').stop().slideUp(200, 'linear');
  });

  $('.nav-switch').click(function() {
    $(this).toggleClass('nav-switch-active');
    $('.main-ul').stop().slideToggle(200, 'linear');
  });

  $(window).resize(function() {
    if($(window).innerWidth() > 800 && !$('.main-ul').is(':visible')) {
       $('.main-ul').stop().slideDown(200, 'linear');
    }
    if($(window).innerWidth() < 800 && $('.main-ul').is(':visible')) {
       $('.main-ul').stop().slideUp(200, 'linear');
    }
  });

})(jQuery);

/*** Slider **********************************************************/
(function($) {

  $.fn.fXslider = function(options) {

    var defaults = {
          auto       : true,
          delay      : 7000,
          transType  : 'fade',
          transSpeed : 900,
          bulletImg  : false,
          bulletNav  : true,
          arrowNav   : false
    };

    if(options) { $.extend(defaults, options); }

    var slider  = $('.fx-slider'),
        slide   = slider.children('.fx-slide'),
        nav     = $('<ul class="bullet-nav"></ul>'),
        prev    = $('<span class="prev">Prev</span>'),
        next    = $('<span class="next">Next</span>'),
        count   = slide.length,
        i       = -1;

    slide.eq(i).show().addClass('fx-current');

    slider.css({ height: slide.height() - 5 + 'px' });

    var interval = setInterval(rotate, defaults.delay);

    function rotate() {
      if(defaults.transType === 'fade') {
         slide.eq(i).fadeOut(defaults.transSpeed).removeClass('fx-current');
         i = (i+1 === count) ? 0 : i+1;
         slide.eq(i).fadeIn(defaults.transSpeed).addClass('fx-current');
      }
      $('.bullet-nav li').eq(i).addClass('fx-active').siblings('.bullet-nav li').removeClass('fx-active');
    }


    if(defaults.auto === true && defaults.transType === 'fade') {
       rotate();
    }

    if(defaults.bulletNav === true) {

        slider.append(nav);

        for(var bullets = 1; bullets <= count; bullets++) {
            nav.append('<li class="'+bullets+'"></li>');            
        }

        var bullet = $('.bullet-nav li');

        bullet.eq(0).addClass('fx-active');
       
        bullet.click(function() {
         $(this).addClass('fx-active').siblings('.bullet-nav li').removeClass('fx-active');

         if(defaults.transType === 'fade') {
           slide.eq(bullet.index(this)).fadeIn(defaults.transSpeed).addClass('fx-current')
           .siblings('.fx-slide').removeClass('fx-current').fadeOut(defaults.transSpeed);
           i = bullet.index(this);
         }
         clearInterval(interval);
         interval = setInterval(rotate, defaults.delay);
        });

        if(defaults.bulletImg === true) {

           bullet.each(function() {
             $(this).mouseenter(function() {
               $(this).append('<span class="thumbnail">' +
                              '<img src="'+$('.fx-slide img').eq(bullet.index(this)).attr("src")+'">' +
                              '</span>');
             }).mouseleave(function() {
               $('.thumbnail').remove();
             });
          });

        }

    }

    function change() {
      $('.fx-current').fadeOut(defaults.transSpeed).removeClass('fx-current');
      slide.eq(i).fadeIn(defaults.transSpeed).addClass('fx-current');
      $('.fx-active').removeClass('fx-active');
      $('.bullet-nav li').eq(i).addClass('fx-active');
      clearInterval(interval);
      interval = setInterval(rotate, defaults.delay);
    }


    if(defaults.arrowNav === true) {

       slider.append(prev,next);

       prev.click(function() {
         i = (i-1 < 0) ? count-1 : i-1;
         change();
         textFx();
       });

       next.click(function() {
         i = (i+1 === count) ? 0 : i+1;
         change();
         textFx();
       });

    }

    return this;

  };

  $('.fx-slider').fXslider();

})(jQuery);

/*** Testimonials Slider *********************************************/
(function($) {

  $.fn.slider = function(options) {

    var d = $.extend({
                      interval  : 5000,
                      speed     : 800,
                      easing    : 'swing',
                      direction : 'up',
                      height    : 160,
    }, options);

    return this.each(function() {

      var el   = $(this),
          nIn  = el.find('.inner'),
          nArt = nIn.find('.article');

      var interval = (d.direction === 'up') ? setInterval(function() { srolling('up'); }, d.interval) : setInterval(function() { srolling('down'); }, d.interval);

      function srolling(dir) {
        if(!nIn.is(':animated')) {
           nIn.find('.article').css({ opacity: '0' });
           nIn.find('.article').eq(2).animate({ opacity: '1' }, 1000);
           var dr = (dir == 'up') ? idt = parseInt(nIn.css('top'), 10) - parseInt(nArt.height()+10, 10) : idt = parseInt(nIn.css('top'), 10) + parseInt(nArt.height()+10, 10);
           nIn.animate({ top: idt + 'px' }, d.speed, d.easing, function() {
             var fl = (dir == 'up') ? nIn.find('.article:last').after(nIn.find('.article:first')) : nIn.find('.article:first').before(nIn.find('.article:last'));
             nIn.css({ top: - d.height + 'px' });
           });
        }
      }

    });

  };

  $('.testimonials').slider();

})(jQuery);

/*** Service sections ************************************************/
(function($) {

  $('.b-icon').click(function() {
    var dt = $(this).data('target');
    $('.services').stop().animate({ height: '+=400px' }, 500, 'linear');
    $('#service-info, article[data-rel="'+dt+'"]').stop().fadeIn(600, 'linear');
    $('.services .box-set').fadeOut(400, 'linear');
    $('.services-menu').fadeIn(400, 'linear');

    $('.services-menu').click(function() {
      $(this).fadeOut(300, 'linear');
      $('.services').stop().animate({ height: '-=400px' }, 500, 'linear');
      $('#service-info, article[data-rel="'+dt+'"]').stop().fadeOut(400, 'linear');
      $('.services .box-set').fadeIn(400, 'linear');
    });
  });

})(jQuery);

/*** Contact Form ****************************************************/
(function($) {

  $('.contact-form .c-input').focusin(function() {
    $(this).parent('.c-input-wrapper').find('.c-input-msg').fadeOut(200, 'linear', function() {
      $(this).remove();
    });
    $(this).before('<span class="f-label">'+$(this).attr('placeholder')+'</span>');
    $(this).prev('.f-label').animate({ top: '-16px', fontSize: '9px' }, 200, 'linear');
  }).focusout(function() {
     $(this).prev('.f-label').remove();
     $('.c-counter').fadeOut(250, 'linear');
  });

  $('.contact-form textarea').keyup(function() {
    $('.c-counter').fadeIn(250, 'linear').text(500-parseInt($(this).val().length,10));
  });

  $('.contact-form').submit(function(e) {
    e.preventDefault();

    var sbt     = 1,
        error   = false,
        cForm   = $(this),
        cName   = cForm.find('input[name="name"]'),
        cEmail  = cForm.find('input[name="email"]'),
        cSub    = cForm.find('input[name="subject"]'),
        cMsg    = cForm.find('textarea'),
        cReq    = cForm.find('.req'),
        errMsg  = cForm.find('.c-error'),
        reEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    function cMessage(input, msg) {
      if(input.parent('.c-input-wrapper').children('.c-input-msg').length < 1 && input.val() != '') {
         input.parent('.c-input-wrapper').append('<span class="c-input-msg">'+msg+'</span>');
         $('.c-input-msg').fadeIn(200, 'linear').addClass('c-input-msg-active');
      }
    }

    if(cName.val() == '' || cEmail.val() == '' || cMsg.val() == '') {
       error = true;
    }

    if(cName.val().length < 3 || cName.val().length > 32) {
       error = true;
       cMessage(cName, 'Ime mora biti između 3-32 karaktera');
    }

    if(cEmail.val().length > 60) {
       error = true;
       cMessage(cEmail, 'E-mail adresa mora biti kraća od 60 karaktera');
    }
    else if(!reEmail.test(cEmail.val())){
       error = true;
       cMessage(cEmail, 'E-mail adresa nije u validnom formatu');
    }

    if(cMsg.val().length < 60 || cMsg.val().length > 500) {
       error = true;
       cMessage(cMsg, 'Poruka mora biti između 60-500 karaktera');
    }

    if(error) {
       cReq.each(function() {
         if($(this).parent('.c-input-wrapper').children('.c-input-msg').length < 1 && $(this).val() == '') {
            $(this).parent('.c-input-wrapper').append('<span class="c-input-msg">'+$(this).data('error')+'</span>');
            $('.c-input-msg').fadeIn(200, 'linear').addClass('c-input-msg-active');
         }
       });
       return false;
    }
    else {

      cForm.fadeOut(600, 'linear', function() {

		$('.c-loading').fadeIn(600, 'linear', function() {

          $.ajax({
             type: 'post',
             url: 'modules/cf-process.php',
             data: {
               name: cName.val(),
               email: cEmail.val(),
               subject: cSub.val(),
               content: cMsg.val(),
               sbt: sbt
             },
             success: function(response) {
               $('.c-loading').fadeOut(function() {
                 $('.c-success').fadeIn(400, 'linear').html(response+' <img src="images/c-check.png">').delay(1500).fadeOut(600, 'linear', function() {
                   $('#contact-form').fadeOut(400, 'linear');
                   if(!cForm.hasClass('single-cf')) {
                      overlay();
                   }
                   cForm.show(100);
                   cForm[0].reset();
                 });
               });
             }
          });

		});

      });

    }

  });

  $('.msg-toggle, .msg-close').click(function() {
    var cf = ($('#contact-form').css('display') == 'none') ? $('#contact-form').stop().fadeIn(400, 'linear') : $('#contact-form').stop().fadeOut(400, 'linear');
    overlay();
  });

})(jQuery);

/*** Social Icon Tooltip *********************************************/
(function($) {

  $('.social a').on({
    mouseenter: function() {
      if($('.icon-tooltip',this).length < 1) {
         $(this).append('<span class="icon-tooltip">'+$(this).data('tooltip')+'</span>');
         $('.icon-tooltip').fadeIn(200, 'linear');
      }
    },
    mouseleave: function() {
      $('.icon-tooltip').fadeOut(200, 'linear', function() {
        $(this).remove();
      });
    }
  });

})(jQuery);

/*** FAQ *************************************************************/
(function($) {
    
  $('.ac-title').click(function() {
    $(this).toggleClass('ac-active')
      .parent('.ac-item').siblings('.ac-item').find('.ac-active').removeClass('ac-active');
    $(this).next('.ac-content').stop().slideToggle(400, 'swing')
      .parent('.ac-item').siblings('.ac-item').find('.ac-content').stop().slideUp(400, 'swing');
  });
    
})(jQuery);

/*** Google Map ******************************************************/
function initialize() {
  var styles = [{"stylers":[{"hue":"#83bfbd"},{"saturation":-30}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}];

  var styledMap  = new google.maps.StyledMapType(styles, { name: 'PC Lab' }),
      myLatLng   = new google.maps.LatLng(44.810512,20.521825),
      mapOptions = {
         center: myLatLng,
         zoom: 16,
         mapTypeControl: true,
         scrollwheel: false,
         panControl: false,
         streetViewControl: false,
         mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
         }
      };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var infoContent = '<div class="marker-info"><h3>PC Lab</h3><p>Salvadora Aljendea</p><p>069/4012-288</p></div>';

  var infowindow = new google.maps.InfoWindow({
      content: infoContent
  });

  marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: 'images/marker.png',
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

/*** Facebook ******************************************************/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/sr_RS/sdk.js#xfbml=1&version=v2.4";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));