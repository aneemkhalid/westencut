$(document).foundation();


$(document).ready(function(){
    let event_dates_array = new Array();
    if($('#date-select').length)
    {
        // Load events for current day
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0');
        // var yyyy = today.getFullYear();
        // today = dd + '.' + mm + '.' + yyyy;
        // load_events(today);

        // Init datepicker + render blocked days
        $.post('/wp-content/themes/yns/ajax.php', { action: "get_event_dates"},
            function(returnedData){
                 event_dates_array = JSON.parse(returnedData);
                 //console.log(event_dates_array);

                 // Init Datepicker after getting event_dates
                 $('#date-select').datepicker({
                    language: 'de',
                    minDate: new Date(),
                    onRenderCell: function (date, cellType) {
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        if((String(day)).length==1)
                            day='0'+day;
                        if((String(month)).length==1)
                            month='0'+month;
                        var current_date = day + '.' + month + '.' + date.getFullYear();

                        //console.log("NEW DATE " + new_date);
                        //console.log(event_dates_array.includes(new_date));
                        if(event_dates_array.includes(current_date))
                        {
                            return {
                                html: '<span class="not-free">' + day + '</span>'
                            }
                        }
                        else if(Date.now() < Date.parse(date))
                        {
                            return {
                                html: '<span class="free">' + day + '</span>'
                            }
                        }
                     },
                     onSelect: function onSelect(fd, date) {
                         load_events(fd);
                     }
                 });
                 $('#date-select').data('datepicker');
        });
    }
});

$.fn.datepicker.language['de'] = {
    days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    daysShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
    daysMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    months: ['Januar','Feburuar','März','April','Mai','Juni', 'Juli','August','September','Oktober','November','Dezember'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    today: 'Heute',
    clear: 'Leeren',
    dateFormat: 'yyyy-mm-dd',
    timeFormat: 'hh:ii aa',
    firstDay: 1
};

function load_events(date)
{
    $('#event-date').val(date);
    //$('#events').load('/wp-content/themes/yns/ajax.php?date=' + date);
    $.get('/wp-content/themes/yns/ajax.php?date=' + date, function (event_booked) {
        if(parseInt(event_booked))
        {
            $('#event-form').hide();
            $('.error').show();
        }
        else
        {
            $('#event-form').show();
            $('.error').hide();
        }
    });
}

/* AOS */

AOS.init({
    once: true
});

/* SCROLLMAGIC */

var controller = new ScrollMagic.Controller();

var parallaxHomeVideo = new ScrollMagic.Scene({
    triggerElement: ".home-spacer",
    triggerHook: 0,
    duration: '100%'
})
.setTween('.home-slider .home-slider__video', {y: "-20%", ease: Linear.easeNone})
.addTo(controller);

var parallaxHomeText = new ScrollMagic.Scene({
    triggerElement: ".home-spacer",
    triggerHook: 0,
    duration: '100%'
})
.setTween('.home-slider .home-slider__text', {y: "-120%", ease: Linear.easeNone})
.addTo(controller);

var opacityHomeText = new ScrollMagic.Scene({
    triggerElement: ".home-spacer",
    triggerHook: 0,
    duration: '100%'
})
.setTween('.home-slider .home-slider__text', {'opacity': "0", ease: Linear.easeNone})
.addTo(controller);

var parallaxCTA = new ScrollMagic.Scene({
    triggerElement: ".home-cta",
    triggerHook: 1,
    duration: '100%'
})
.setTween('.home-cta', {backgroundPosition: "center 40%", ease: Linear.easeNone})
.addTo(controller);

var parallaxLocationCTA = new ScrollMagic.Scene({
    triggerElement: ".location-cta",
    triggerHook: 1,
    duration: '100%'
})
.setTween('.location-cta', {backgroundPosition: "center 40%", ease: Linear.easeNone})
.addTo(controller);

/* HEADER (FIXED) */

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }
});

/* MOBILE NAV */

$('header .nav-toggle').click(function() {

    var mainNav = $(this).parent().find('.main-nav');

    $(mainNav).parent().find('.main-nav').toggleClass('open-nav');
    $('body').toggleClass('open-nav');
    $('header').toggleClass('open-nav');
    $(this).toggleClass('open-nav');

});

$('header .main-nav ul li span').click(function() {
    $(this).parent().find('.sub-menu').toggleClass('visible');
});

/* GALLERY */

$('#gallery').isotope({
    itemSelector: '.gallery-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.gallery-sizer',
      gutter: '.gallery-gutter'
    }
});

$('#gallery').imagesLoaded().progress( function() {
  $('#gallery').isotope('layout');
});

$('#gallery .gallery-item').click(function() {

        $("#gallery .gallery-item").removeClass('bigmac');
        $(this).addClass('bigmac');
        $('#gallery').isotope('layout');
    });
// $('#gallery .gallery-item').click(function() {
//     $(this).toggleClass('bigmac');
//     $('#gallery').isotope('layout');
// });
