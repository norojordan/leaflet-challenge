// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data)
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
      layer.bindPopup('<h3>Location: ' + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag +  "</h3>Date: " + new Date(feature.properties.time));
      
  }


  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Satellite": googleSat
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  
  // Function to determine the marker size by magnitude
  function markerSize(magnitude){
    return Math.sqrt(population) * 50;
  }
  
  // Function that will determine the marker color based on the earthquake's depth
function chooseColor(depth) {
    switch(depth){
      case depth > 90 :return "red";
      case depth > 70 :return "orangered";
      case depth > 50 :return "orange";
      case depth > 30 :return "gold";
      case depth > 10 :return "yellow";
      default: return "limegreen";
    }
  }

  // Fuction to create markers
  function circleMarker(feature, location){
    var markerOptions ={
        radius: markerSize(feature.properties.mag),
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 0.75,
        color: "black"
    }
    returnL.circle(location, markerOptions);  
  };



  // Create a legend to display information about our map.
var info = L.control({
    position: "bottomright"
  });
  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    return div;
  };
  // Add the info legend to the map.
  info.addTo(map);

}
