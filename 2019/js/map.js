var myFeatureGroup;

var scrollDown = function() {
  var target = $('#news');
  $('html, body').animate(
    {
      scrollTop: target.offset().top
    },
    1000
  );
};

var repositionMap = function() {
  if ($(window).width() < 767) {
    setTimeout(function() {
      map.invalidateSize();
      map.fitBounds(myFeatureGroup.getBounds());
    }, 200);
  } else {
    setTimeout(function() {
      map.invalidateSize();
      map.fitBounds(myFeatureGroup.getBounds(), { paddingBottomRight: [355, 0] });
    }, 200);
  }
};

var createTemplate = function(feature) {
  console.log(feature);
  var bandTemplate = '';

  if (
    feature.properties.performer__1_name !== '' &&
    feature.properties.performer__1_link !== '' &&
    feature.properties.performer__1_link !== ' '
  ) {
    bandTemplate +=
      '<div class="show-bandname"><a target="_blank" href="' +
      feature.properties.performer__1_link +
      '">' +
      feature.properties.performer__1_name +
      '</a></div>';
  } else if (feature.properties.performer__1_name !== '') {
    bandTemplate += '<div class="show-bandname">' + feature.properties.performer__1_name + '</div>';
  }
  bandTemplate +=
    '<p class="show-description-long">' + feature.properties.performer__1_long_description + '</p>';
  bandTemplate +=
    '<p class="show-description-short">' +
    feature.properties.performer__1_short_description +
    '</p>';
  if (
    feature.properties.performer__2_name !== '' &&
    feature.properties.performer__2_link !== '' &&
    feature.properties.performer__2_link !== ' '
  ) {
    bandTemplate +=
      '<div class="show-bandname"><a target="_blank" href="' +
      feature.properties.performer__2_link +
      '">' +
      feature.properties.performer__2_name +
      '</a></div>';
  } else if (feature.properties.performer__2_name !== '') {
    bandTemplate += '<div class="show-bandname">' + feature.properties.performer__2_name + '</div>';
  }
  bandTemplate +=
    '<p class="show-description-long">' + feature.properties.performer__2_long_description + '</p>';
  bandTemplate +=
    '<p class="show-description-short">' +
    feature.properties.performer__2_short_description +
    '</p>';
  if (
    feature.properties.performer__3_name !== '' &&
    feature.properties.performer__3_link !== '' &&
    feature.properties.performer__3_link !== ' '
  ) {
    bandTemplate +=
      '<div class="show-bandname"><a target="_blank" href="' +
      feature.properties.performer__3_link +
      '">' +
      feature.properties.performer__3_name +
      '</a></div>';
  } else if (feature.properties.performer__3_name !== '') {
    bandTemplate += '<div class="show-bandname">' + feature.properties.performer__3_name + '</div>';
  }
  bandTemplate +=
    '<p class="show-description-long">' + feature.properties.performer__3_long_description + '</p>';
  bandTemplate +=
    '<p class="show-description-short">' +
    feature.properties.performer__3_short_description +
    '</p>';
  if (
    feature.properties.performer__4_name !== '' &&
    feature.properties.performer__4_link !== '' &&
    feature.properties.performer__4_link !== ' '
  ) {
    bandTemplate +=
      '<div class="show-bandname"><a target="_blank" href="' +
      feature.properties.performer__4_link +
      '">' +
      feature.properties.performer__4_name +
      '</a></div>';
  } else if (feature.properties.performer__4_name !== '') {
    bandTemplate += '<div class="show-bandname">' + feature.properties.performer__4_name + '</div>';
  }
  bandTemplate +=
    '<p class="show-description-long">' + feature.properties.performer__4_long_description + '</p>';
  bandTemplate +=
    '<p class="show-description-short">' +
    feature.properties.performer__4_short_description +
    '</p>';
  var popupTemplate =
    '<div class="show"><h1 class="show-location">' +
    feature.properties.address +
    '<h2 class="show-time">' +
    feature.properties.start_time +
    '–' +
    feature.properties.end_time +
    '</h2><div class>' +
    bandTemplate +
    '</div></div>';
  return popupTemplate;
};

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
};

$(document).ready(function() {
  var $heroImage = $('#hero-image');
  var $heroText = $('#hero-text');

  var resizeHeroImage = function() {
    var sizeHeroText = $heroText.height() + 30;
    $heroImage.css({ height: sizeHeroText }).show();
    // $('#map').height(window.innerHeight - $('#schedule-top').innerHeight() - 60);
  };

  $(window).resize(function() {
    resizeHeroImage();
  });

  resizeHeroImage();

  $('#close-sidebar').click(function() {
    $('body').removeClass('overlay-on');
    unhighlightFeature();
    map.invalidateSize();
  });

  $('#scroll-down').click(function() {
    $('body').toggleClass('schedule-toggle');
    repositionMap();
  });

  $('#map-overlay').click(function() {
    $('#map-overlay').hide();
    $('#map').addClass('expanded');
    $('#map-header').show();
    repositionMap();
  });

  $('#button-list').click(function() {
    $('body').removeClass('overlay-on');
    $('.header-item').removeClass('active');
    $(this).addClass('active');
    $('#map').hide();
    $('#map-sidebar').removeClass('active');
    $('#list').show();
    $('body').addClass('map-view');
    $('body').addClass('schedule-toggle');
    $('#map-overlay').hide();
  });

  var openMap = function() {
    $('.header-item').removeClass('active');
    $('#button-map').addClass('active');
    $('#list').hide();
    $('#map')
      .removeClass('expanded')
      .show();
    $('#map-sidebar').addClass('active');
    $('#map-header').hide();
    $('body').removeClass('map-view');
    repositionMap();
    $('body').addClass('schedule-toggle');
    $('#map-overlay').show();
    $('#map-sidebar').addClass('hide');
  };

  $('#button-map').click(function() {
    openMap();
  });

  $('#map-header').click(function() {
    openMap();
  });
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
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var highlightFeature = function(markerObject) {
  var feature = markerObject.feature;
  var marker = markerObject.marker;
  marker.setStyle({ fillColor: '#F3DB14' });
  if (feature.properties.color === 1) {
    $('#map-sidebar-content')
      .removeClass()
      .addClass('list-12');
  }
  if (feature.properties.color === 2) {
    $('#map-sidebar-content')
      .removeClass()
      .addClass('list-2');
  }
  if (feature.properties.color === 3) {
    $('#map-sidebar-content')
      .removeClass()
      .addClass('list-4');
  }
  $('#map-sidebar-content').html(createTemplate(markerObject.feature));
};

var highlightedThing;

var unhighlightFeature = function() {
  if (typeof highlightedThing != 'undefined') {
    highlightedThing.marker.setStyle({ fillColor: colorize(highlightedThing.feature) });
  }
};

/*
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
*/

map.on('zoomend', function() {
  $.each(markers, function(key, markerObject) {
    var currentZoom = map.getZoom();
    if (currentZoom > 16) {
      markerObject.marker.setRadius(15);
    } else if (currentZoom > 15) {
      markerObject.marker.setRadius(12);
    } else if (currentZoom > 14) {
      markerObject.marker.setRadius(9);
    } else {
      markerObject.marker.setRadius(7);
    }
  });
});

$('#filter-one').click(function() {
  filterMarkers('one');
});

$('#filter-two').click(function() {
  filterMarkers('all');
});

var colorize = function(feature) {
  if (feature.properties.color === 1) {
    return '#209A01';
  } else if (feature.properties.color === 2) {
    return '#F11910';
  } else if (feature.properties.color === 3) {
    return '#3775B1';
  } else {
    return 'black';
  }
};

$(document).ready(function() {
  var circleMarkerStyle = function(feature) {
    var circleColor = colorize(feature);
    var currentZoom = map.getZoom();
    var radius;
    if (currentZoom > 16) {
      radius = 15;
    } else if (currentZoom > 15) {
      radius = 12;
    } else if (currentZoom > 14) {
      radius = 9;
    } else {
      radius = 7;
    }
    return {
      radius: radius,
      fillColor: circleColor,
      color: 'transparent',
      opacity: 1,
      fillOpacity: 0.75,
      color: 'transparent',
      weight: 12
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

  var sql = 'SELECT * FROM porchfest';
  $.getJSON('https://porchfest.cartodb.com/api/v2/sql?format=GeoJSON&q=' + sql, function(data) {
    displayShows(data);
    myFeatureGroup = L.geoJson(data, {
      onEachFeature: pointStyle
    });
    plotMarkers();
    map.fitBounds(myFeatureGroup.getBounds());
    repositionMap();
  });
});
