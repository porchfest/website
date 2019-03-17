/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

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
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
    return "#209A01";
  }
  else if (feature.properties.color === 2) {
    return "#F11910";
  }
  else if (feature.properties.color === 3) {
    return "#3775B1";
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
        weight: 12,
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

  var sql = "SELECT * FROM porchfest";
  $.getJSON("https://porchfest.cartodb.com/api/v2/sql?format=GeoJSON&q="+sql, function(data) {
    displayShows(data);
    myFeatureGroup = L.geoJson(data, {
      onEachFeature: pointStyle,
    });
    plotMarkers();
    map.fitBounds(myFeatureGroup.getBounds());
    repositionMap();
  });

});
