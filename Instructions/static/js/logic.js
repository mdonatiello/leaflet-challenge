// Create the map object with options
var map = L.map("#map", {
    center: [40.73, -74.0059],
    zoom: 12,
//    layers: [lightmap, earthquakeLocations]
  });

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(#map);

var link = ""https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"";

function markerSize(magnitude) {
    return magnitude * 4;
};

function chooseColor(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'darkorange'
    } else if (magnitude > 3) {
        return 'orange'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'yellowgreen'
    } else {
        return 'lightgreen'
    }
};

// Perform an API call to the GeoJSON API to get the earthquake information. Call createMarkers when complete
d3.json(link, function(earthquakeLocations) {
  // Creating a geoJSON layer with the retrieved data
    L.geoJson(earthquakeLocations, {
      // Passing in our style object
      style: function(feature) {
        return {
          color: "white",
          fillColor: "gray",
          fillOpacity: 0.5,
          weight: 1.5
        };
      },

// Called on each feature
onEachFeature: function(feature, layer) {
  // Set mouse events to change map styling
  layer.on({
    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
    // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
    click: function(event) {
      map.fitBounds(event.target.getBounds());
    }
  });
   // Giving each feature a pop-up with information pertinent to it
   layer.bindPopup("<h3>" + earthquake.place + "<h3><h3>Magnitude: " + earthquake.mag + "<h3><h3>Coordinates: " + earthquake.coordinates + "<h3>");
}

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

      // style: mapStyle
    }).addTo(map);
    // createMarkers(earthquakeLocations.features);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

******** // For each station, create a marker and bind a popup with the station's name
    var earthquakesMarker = L.marker([earthquake.lat, earthquake.lon])
      .bindPopup("<h3>" + earthquake.place + "<h3><h3>Magnitude: " + earthquake.mag + "<h3><h3>Coordinates: " + earthquake.coordinates + "<h3>");
  ********



// Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);

function createMarkers(earthquakeLocations) {

function createMap(earthquakeLocations) {

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquakeLocations layer
  var overlayMaps = {
    "Earthquakes": earthquakeLocations
  };

// Create the map object with options
var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakeLocations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var earthquakes = response.data.earthquakes;
  
    // Initialize an array to hold bike markers
    var earthquakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < earthquakes.length; index++) {
      var earthquake = earthquakes[index];
  
    ******** // For each station, create a marker and bind a popup with the station's name
      var earthquakesMarker = L.marker([earthquake.lat, earthquake.lon])
        .bindPopup("<h3>" + earthquake.place + "<h3><h3>Magnitude: " + earthquake.mag + "<h3><h3>Coordinates: " + earthquake.coordinates + "<h3>");
    ********
  
      // Add the marker to the bikeMarkers array
      earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
  }
    
  // Perform an API call to the GeoJSON API to get the earthquak information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
  







// Function createMap = L.tileLayer("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")

//     var data_earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

