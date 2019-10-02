var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data) { 
   createFeatures(data.features);
});

function getColor(magnitude) {
      if (magnitude > 5) {
          return 'red'
      } else if (magnitude > 4) {
          return 'darkorange'
      } else if (magnitude > 3) {
          return 'orange'
      } else if (magnitude > 2) {
          return 'yellow'
      } else if (magnitude > 1) {
          return 'lightgreen'
      } else {
          return 'yellowgreen'
      }
}

function createFeatures(earthquakeLocations) {
  circleMarkers = []
  for (var i = 0; i < earthquakeLocations.length; i++) {
    circleMarkers.push(
      L.circle([earthquakeLocations[i].geometry.coordinates[1],earthquakeLocations[i].geometry.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: getColor(earthquakeLocations[i].properties.mag),
        fillColor: getColor(earthquakeLocations[i].properties.mag),
        radius: Math.pow(earthquakeLocations[i].properties.mag,3) * 1000
      }).bindPopup("<h3>" + earthquakeLocations[i].properties.place +
      "</h3><hr>Magnitude: " + earthquakeLocations[i].properties.mag +
      "<p>" + new Date(earthquakeLocations[i].properties.time) + "</p>")
    );
  }
  
  createMap(circleMarkers);
}

function createMap(earthquakeMarkers) {

  var graymap_background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" + "access_token=pk.eyJ1IjoibWRvbmF0aWVsbG8iLCJhIjoiY2swOW1oZXVvMGFidTNucjd6emt3cjJoeSJ9.TSVp-H6sfjf70Udt5Glz1A");

  var satellitemap_background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibWRvbmF0aWVsbG8iLCJhIjoiY2swOW1oZXVvMGFidTNucjd6emt3cjJoeSJ9.TSVp-H6sfjf70Udt5Glz1A");

// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  Satellite: satellitemap_background,
  Graymap: graymap_background
};

var earthquakeLocations = new L.LayerGroup(circleMarkers);

//   Create an overlayMaps object to hold the earthquakeLocations layer
var overlayMaps = {
     "Earthquakes": earthquakeLocations
};

// Create the map object with options
var map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [satellitemap_background, earthquakeLocations]
});

L.control
   .layers(baseMaps, overlayMaps, {
     collapsed: false
   })
   .addTo(map);

// Create a legend to display information about our map
var legend = L.control({position: "bottomright"});

// When the layer control is added, insert a div with the class of "legend"
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var grades = [0, 1, 2, 3, 4, 5];
  var colors = [
    "yellowgreen",
    "lightgreen",
    "yellow",
    "orange",
    "darkorange",
    "red"
  ];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

legend.addTo(map);
}