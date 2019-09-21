var main = (function () {
    function applyOrientation() {
      $('#bs-example-navbar-collapse-1').show();
      if (window.innerHeight > window.innerWidth && !$('body').hasClass('projects')) {
          if (window.innerWidth < 767 && !$('body').hasClass('home')) {
              $('#bs-example-navbar-collapse-1').hide();
          }
          //portrait
          $('#left-content-space').removeClass('col-xs-3');
          $('#left-content-space').addClass('hidden-xs');
          $('#right-content-space').removeClass('col-xs-9');
      } else {
          //landscape
          $('#left-content-space').addClass('col-xs-3');
          $('#left-content-space').removeClass('hidden-xs');
          $('#right-content-space').addClass('col-xs-9');
      }
        
        if ($('body').hasClass('projects') && window.innerWidth < 767) {
            if (window.innerHeight > window.innerWidth) {
                $('#left-content-space').removeClass('col-xs-3').addClass('col-xs-5');
                $('#right-content-space').removeClass('col-xs-9').addClass('col-xs-7');
                $('.project-categories .item').removeClass('col-xs-6').addClass('col-xs-12');
                $('.project-categories .category-item').removeClass('col-xs-4').addClass('col-xs-12');
            } else {
                $('#left-content-space').removeClass('col-xs-5').addClass('col-xs-3');
                $('#right-content-space').removeClass('col-xs-7').addClass('col-xs-9');
                $('.project-categories .project-item').removeClass('col-xs-12').addClass('col-xs-6');
                $('.project-categories .category-item').removeClass('col-xs-12').addClass('col-xs-4');
                console.log('reset project classes');
            }
        } else if ($('body').hasClass('projects')) {
            $('#left-content-space').removeClass('col-xs-5').addClass('col-xs-3');
            $('#right-content-space').removeClass('col-xs-7').addClass('col-xs-9');
            $('.project-categories .project-item').removeClass('col-xs-12').addClass('col-xs-6');
            $('.project-categories .category-item').removeClass('col-xs-12').addClass('col-xs-4');
            console.log('reset project classes');
        }
  }
  return {
    applyOrientation : function() {
      applyOrientation();
    },
    initHomeCarousel : function() {
      var $item = $('#myslider1 .carousel .item'); 
      var $wHeight = $(window).height();
      $item.eq(0).addClass('active');
      $item.height($wHeight); 
      $item.addClass('full-screen');
      $(window).on('resize', function (){
        $wHeight = $(window).height();
        $item.height($wHeight);
      });
      $('#myslider1 .carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
          'background-image' : 'url(' + $src + ')',
          'background-color' : $color
        });
        $(this).remove();
      });
      setTimeout(function(){
        $('#myslider1 .carousel').carousel({
          interval: 5000,
          pause: "false"
        });
      }, 1000);
      
    },
    initNavigation : function() {
        $(".navbar-brand").click(function (e) {
            if ($('.home').length > 0)
                return false;
            if (window.innerHeight > window.innerWidth) {
                e.preventDefault();
                var $navBar = $(".navbar-brand");
                if ($navBar.hasClass('active')) {
                    $('#bs-example-navbar-collapse-1').fadeOut(100, function () {
                        $navBar.removeClass('active');
                        $("#myslider1, #content_page").fadeIn(100);
                    });
                } else {
                    $("#myslider1, #content_page").fadeOut(100, function () {
                        $navBar.addClass('active');
                        $('#bs-example-navbar-collapse-1').fadeIn(100);
                    });

                }
            } else {
                window.location = "/";
            }
      });
      applyOrientation();

      window.onresize = function (event) {
          applyOrientation();
      }

      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
      //$(window).scroll(function() {    
      //    var scroll = $(window).scrollTop();
      //     //console.log(scroll);
      //    if (scroll >= 5) {
      //        //console.log('a');
      //        $(".mylogo").addClass("mytoplogo1");
      //    } else {
      //        //console.log('a');
      //        $(".mylogo").removeClass("mytoplogo1");
      //    }
      //});
    }
  }
}());


$(document).ready(function () {
    main.initNavigation();
    main.applyOrientation();
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "" && $(this).attr('href').indexOf('/') < 0) {

            // Prevent default anchor click behavior
            event.preventDefault();
            
            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 100
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = hash;
            });
        } // End if
    });
    $('.project-categories .item').on('mouseenter mouseleave touchstart', function (e) {
        if (e.type == 'touchstart')
            $(this).off('mouseenter mouseleave');

        $('.project-categories .item').removeClass('hover');
        $(this).toggleClass('hover');
    });
});