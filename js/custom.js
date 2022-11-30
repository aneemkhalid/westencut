$(document).ready(function() {

    $('.logo-detail_main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: true,
    });

    $('.logo-slides').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: true,
        responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.deine-story-sliderinner').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        draggable: true,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 401,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.bottom-wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        draggable: true
    });

    


    $('.video_modal').on('hide.bs.modal', function(e) {
        var $if = $(e.delegateTarget).find('iframe');
        var src = $if.attr("src");
        $if.attr("src", '/empty.html');
        $if.attr("src", src);
    });

    $('.scroll_down').on('click', function() {
        var fuller = $(this).closest('section').next('section'),
            section = $(this).closest('section');

        section.animate({
            scrollTop: fuller.offset().top + 0
        }, 700);
    });

    $(".scroll_down").on('click', function(event) {
        if (this.hash !== "") {
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    AOS.init();
});


var currentsection = 0;
$(window).scroll(function() {
    var hT = jQuery('.image-film-main-wrap').offset().top,
        hH = jQuery('.image-film-main-wrap').outerHeight(),
        wH = jQuery(window).height();

        console.log(hT);
        console.log(hH);
        console.log(wH);
        var a = hT + hH - wH;
        console.log(a);
        console.log(jQuery(window).scrollTop());

    if (jQuery(window).scrollTop() > hH - wH) {
        var abc = $('.image-film-main-wrap').attr("id");
        console.log(abc);
        if (abc == "scroll-next-0") {
            window.location.replace("werbefilme.html");
        }
        if (abc == "scroll-next-1") {
            window.location.replace("produkt-filme.html");
        }
        if (abc == "scroll-next-2") {
            window.location.replace("veranstaltungs-filme.html");
        }
        if (abc == "scroll-next-3") {
            window.location.replace("social-media.html");
        }
        if (abc == "scroll-next-4") {
            window.location.replace("professional-image_film.html");
        }
    }
});