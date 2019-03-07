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

    if ((feature.properties.performer_1_name !== "") && (feature.properties.performer_1_link !== "")  && (feature.properties.performer_1_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer_1_link+'">'+feature.properties.performer_1_name+'</a></div>';
    }
    else if (feature.properties.performer_1_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer_1_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer_1_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer_1_short_description+'</p>';
    if ((feature.properties.performer_2_name !== "") && (feature.properties.performer_2_link !== "")  && (feature.properties.performer_2_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer_2_link+'">'+feature.properties.performer_2_name+'</a></div>';
    }
    else if (feature.properties.performer_2_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer_2_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer_2_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer_2_short_description+'</p>';
    if ((feature.properties.performer_3_name !== "") && (feature.properties.performer_3_link !== "")  && (feature.properties.performer_3_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer_3_link+'">'+feature.properties.performer_3_name+'</a></div>';
    }
    else if (feature.properties.performer_3_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer_3_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer_3_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer_3_short_description+'</p>';
    if ((feature.properties.performer_4_name !== "") && (feature.properties.performer_4_link !== "")  && (feature.properties.performer_4_link !== " ")) {
      bandTemplate += '<div class="show-bandname"><a target="_blank" href="'+feature.properties.performer_4_link+'">'+feature.properties.performer_4_name+'</a></div>';
    }
    else if (feature.properties.performer_4_name !== "") {
      bandTemplate += '<div class="show-bandname">'+feature.properties.performer_4_name+'</div>';
    }
    bandTemplate += '<p class="show-description-long">'+feature.properties.performer_4_long_description+'</p>';
    bandTemplate += '<p class="show-description-short">'+feature.properties.performer_4_short_description+'</p>';
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

var markers = [];

var map = L.map('map', {
  center: [39.9501, -75.2183],
  zoom: 15
});

map.scrollWheelZoom.disable();

var tileSource = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

if (L.Browser.retina) {
  var tileSource = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png';
}

var Stamen_TonerLite = L.tileLayer(tileSource, {
  attribution: 'Map tiles by <a href="https://web.archive.org/web/20190102040123/http://stamen.com/">Stamen Design</a>, <a href="https://web.archive.org/web/20190102040123/http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://web.archive.org/web/20190102040123/http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var highlightFeature = function(markerObject) {
  var feature = markerObject.feature;
  var marker = markerObject.marker;
  marker.setStyle({fillColor: '#F3DB14'});
  if (feature.properties.color === 1) {
      $('#map-sidebar-content').removeClass().addClass('list-12');
  }
  if (feature.properties.color === 2) {
      $('#map-sidebar-content').removeClass().addClass('list-2');
  }
  if (feature.properties.color === 3) {
      $('#map-sidebar-content').removeClass().addClass('list-4');
  }
  $('#map-sidebar-content').html(createTemplate(markerObject.feature));

}

var highlightedThing;

var unhighlightFeature = function() {
  if (typeof highlightedThing != 'undefined') {
    highlightedThing.marker.setStyle({fillColor: colorize(highlightedThing.feature)});
  }
}

var plotMarkers = function() {
  $.each(markers, function(key, markerObject) {
    var marker = markerObject.marker;
    marker.on({
      mouseover: function() {
        highlightFeature(markerObject);
        $('#map-sidebar').show().removeClass("hide");
        highlightedThing = markerObject;
      },
      mouseout: function() {
        unhighlightFeature();
      },
      click: function() {
        $('body').addClass('overlay-on');
        $('#map-sidebar').show().removeClass("hide");
        unhighlightFeature();
        highlightFeature(markerObject);
        highlightedThing = markerObject;
      }
    });
    map.addLayer(markerObject.marker);
  });
};

map.on('zoomend', function() {
  $.each(markers, function(key, markerObject) {
    var currentZoom = map.getZoom();
    if (currentZoom > 16) {
      markerObject.marker.setRadius(15);
    }
    else if (currentZoom > 15) {
      markerObject.marker.setRadius(12);
    }
    else if (currentZoom > 14) {
      markerObject.marker.setRadius(9);
    }
    else {
      markerObject.marker.setRadius(7);
    }
  });
});

$('#filter-one').click(function(){
  filterMarkers('one');
});

$('#filter-two').click(function(){
  filterMarkers('all');
});

var colorize = function(feature) {
  if (feature.properties.color === 1) {
    return "#008695";
  }
  else if (feature.properties.color === 2) {
    return "#4B4B8F";
  }
  else if (feature.properties.color === 3) {
    return "#F97B72";
  }
  else {
    return "black";
  }
};

$(document).ready(function() {

  var circleMarkerStyle = function(feature) {
    var circleColor = colorize(feature);
    var currentZoom = map.getZoom();
    var radius;
    if (currentZoom > 16) {
      radius = 15;
    }
    else if (currentZoom > 15) {
      radius = 12;
    }
    else if (currentZoom > 14) {
      radius = 9;
    }
    else {
      radius = 7;
    }
    return {
        radius: radius,
        fillColor: circleColor,
        color: "transparent",
        opacity: 1,
        fillOpacity: 0.75,
        color: "transparent",
        weight: 0,
    };
  };

  var pointStyle = function(feature, layer) {
      var popupTemplate = createTemplate(feature);
      var markerObject = {
        marker: L.circleMarker(layer._latlng, circleMarkerStyle(feature)),
        feature: feature
      };
      markers.push(markerObject);
  };

var sql = "SELECT * FROM porchfest2018";
  $.getJSON("https://web.archive.org/web/20190102040123/https://porchfest.cartodb.com/api/v2/sql?format=GeoJSON&q="+sql, function(data) {
    displayShows(data);
    myFeatureGroup = L.geoJson(data, {
      onEachFeature: pointStyle,
    });
    plotMarkers();
    map.fitBounds(myFeatureGroup.getBounds());
    repositionMap();
  });
});


/*
     FILE ARCHIVED ON 04:01:23 Jan 02, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:37:34 Mar 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 151.241 (3)
  esindex: 0.006
  captures_list: 170.19
  CDXLines.iter: 14.348 (3)
  PetaboxLoader3.datanode: 288.98 (5)
  exclusion.robots: 0.223
  exclusion.robots.policy: 0.21
  RedisCDXSource: 0.535
  PetaboxLoader3.resolve: 42.138 (2)
  load_resource: 363.82
*/