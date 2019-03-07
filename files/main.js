/*
var myFeatureGroup;

var scrollDown = function() {
    var target = $('#news');
    $('html, body').animate({
        scrollTop: target.offset().top
    }, 1000);
}

var repositionMap = function() {
  if ($(window).width() < 767) {
    setTimeout(function(){
      map.invalidateSize();
      map.fitBounds(myFeatureGroup.getBounds());
    }, 200);
  }
  else {
    setTimeout(function(){
      map.invalidateSize();
      map.fitBounds(myFeatureGroup.getBounds(), {paddingBottomRight: [355, 0]});
    }, 200);
  }
}

var createTemplate = function(feature) {
	console.log(feature);
    var bandTemplate = "";

    if ((feature.properties.performer__1_name !== "") && (feature.properties.performer__1_link !== "")  && (feature.properties.performer__1_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer__1_link+'">'+feature.properties.performer__1_name+'</a></div>';
    }
    else if (feature.properties.performer__1_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer__1_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer__1_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer__1_short_description+'</p>';
    if ((feature.properties.performer__2_name !== "") && (feature.properties.performer__2_link !== "")  && (feature.properties.performer__2_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer__2_link+'">'+feature.properties.performer__2_name+'</a></div>';
    }
    else if (feature.properties.performer__2_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer__2_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer__2_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer__2_short_description+'</p>';
    if ((feature.properties.performer__3_name !== "") && (feature.properties.performer__3_link !== "")  && (feature.properties.performer__3_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer__3_link+'">'+feature.properties.performer__3_name+'</a></div>';
    }
    else if (feature.properties.performer__3_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer__3_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer__3_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer__3_short_description+'</p>';
    if ((feature.properties.performer__4_name !== "") && (feature.properties.performer__4_link !== "")  && (feature.properties.performer__4_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer__4_link+'">'+feature.properties.performer__4_name+'</a></div>';
    }
    else if (feature.properties.performer__4_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer__4_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer__4_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer__4_short_description+'</p>';
    var popupTemplate = '<div class="show"><h1 class="show-location">'+feature.properties.address+'<h2 class="show-time">'+feature.properties.start_time+'–'+feature.properties.end_time+'</h2><div class>'+bandTemplate+'</div></div>';
    return popupTemplate;
}

var displayShows = function(data) {
    $.each(data.features, function(key, feature) {
        if (feature.properties.color === 1) {
            $('#list-12').append($(createTemplate(feature)).addClass('list-12'));
        }
        if (feature.properties.color === 2) {
            $('#list-2').append($(createTemplate(feature)).addClass('list-2'));
        }
        if (feature.properties.color === 3) {
            $('#list-4').append($(createTemplate(feature)).addClass('list-4'));
        }
    });
}

$(document).ready(function() {
    var $heroImage = $('#hero-image');
    var $heroText = $('#hero-text');

    var resizeHeroImage = function() {
        var sizeHeroText = $heroText.height() + 30;
        $heroImage.css({'height': sizeHeroText}).show();
        // $('#map').height(window.innerHeight - $('#schedule-top').innerHeight() - 60);
    }

    $(window).resize(function() {
        resizeHeroImage();
    });

    resizeHeroImage();

    $("#close-sidebar").click(function(){
        $("body").removeClass("overlay-on");
        unhighlightFeature();
        map.invalidateSize();
    })

    $("#scroll-down").click(function(){
        $('body').toggleClass('schedule-toggle');
        repositionMap();
    })

    $("#map-overlay").click(function(){
        $("#map-overlay").hide();
        $("#map").addClass("expanded");
        $("#map-header").show();
        repositionMap();
    })

    $("#button-list").click(function(){
        $("body").removeClass("overlay-on");
        $('.header-item').removeClass('active');
        $(this).addClass('active');
        $('#map').hide();
        $('#map-sidebar').removeClass('active');
        $('#list').show();
        $('body').addClass('map-view');
        $('body').addClass('schedule-toggle');
        $('#map-overlay').hide();
    })

    var openMap = function() {
        $('.header-item').removeClass('active');
        $("#button-map").addClass("active");
        $('#list').hide();
        $('#map').removeClass("expanded").show();
        $('#map-sidebar').addClass('active');
        $("#map-header").hide();
        $('body').removeClass('map-view');
        repositionMap();
        $('body').addClass('schedule-toggle');
        $('#map-overlay').show();
        $('#map-sidebar').addClass("hide");
    }

    $("#button-map").click(function(){
        openMap();
    })

    $("#map-header").click(function(){
        openMap();
    })

});
*/

/*
     FILE ARCHIVED ON 06:10:15 Jan 03, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:37:35 Mar 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 967.907 (3)
  esindex: 0.01
  captures_list: 986.083
  CDXLines.iter: 11.66 (3)
  PetaboxLoader3.datanode: 1038.662 (5)
  exclusion.robots: 0.252
  exclusion.robots.policy: 0.232
  RedisCDXSource: 1.797
  PetaboxLoader3.resolve: 494.085 (2)
  load_resource: 612.766
*/