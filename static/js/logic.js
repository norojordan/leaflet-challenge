// Store our API endpoint as queryUrl.
var queryUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap;

function createMap(earthquakes) {
  // Create the base tile layers.
  var street = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  var topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

  var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );


  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 6,
    layers: [street, earthquakes],
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    Satellite: googleSat,
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes,
  };

  // Create a layer control. Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(myMap);
}

function getColor(depth) {
  switch (true) {
    case depth < 10:
      return "yellow";
    case depth < 30:
      return "orange";
    case depth < 50:
      return "limegreen";
    case depth < 70:
      return "green";
    case depth < 90:
      return "chocolate";
    default:
      return "red";
  }
}

//  // Perform a GET request to the query URL/ Check console.log
d3.json(queryUrl).then(function (data) {
  console.log(data);
});

function createMarkers(response) {
  //  Pull the "features" property from response.data.
  var quakes = response.features;

  // Initialize an array to hold bike markers.
  var quakeMarkers = [];

  // Loop through the features array.
  //for (var i = 0; i < quakes.length; i++) {
  //var quake = quakes[i];
  // Try Reed's method instead - works!

  for (quake of quakes) {
    // Function to determine color based on depth - third coordinate in list of coordinates.

    // For each earthquake, create a marker, and bind a popup with the station's name.
    var quakeMarker = L.circle(
      [quake.geometry.coordinates[1], quake.geometry.coordinates[0]],
      {
        fillOpacity: 0.75,
        color: "black",
        weight: 1.5,
        fillColor: getColor([quake.geometry.coordinates[2]]),
        radius: quake.properties.mag * 20000,
      }
    ).bindPopup(
      "<h3>Location: " +
        quake.properties.place +
        "<h3><h3>Magnitude: " +
        quake.properties.mag +
        "<h3><h3>Depth: " +
        quake.geometry.coordinates[2] +
        "<h3>Date:</b> " +
        new Date(quake.properties.time)
      
    );

    //Add the marker to the quakeMarkers array.
    quakeMarkers.push(quakeMarker);
  }

  // Create a layer group that's made from the quake markers array, and pass it to the createMap function.
  createMap(L.layerGroup(quakeMarkers));
}

// Perform an API call to the Earthquake API to get the station information. Call createMarkers when it completes.
d3.json(queryUrl).then(createMarkers).then(createLegend);

// Create a legend to display information about our map.
var legend = L.control({ position: "bottomright" });

//  When the layer control is added, insert a div with the class of "legend".

function createLegend() {
  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
    labels = ["Earthquake Depth Range"], 
    //depthranges = ['0-10', '10-30', '30-50', '50-70', '70-90', '90+'],
    depth = [0, 10, 30, 50, 70, 90];

    //for(d of depths){
    for (var i = 0; i < depth.length; i++) {
      labels.push(
        '<i style="background:' +
          getColor(depth[i] + 1) +
          '"></i>' +
          (depth[i] ? depth[i] + "<br>" : "+") 
      );
    }
    div.innerHTML = labels.join("<br>");
    return div;
  };
  // Add the legend info to the map.
  legend.addTo(myMap);
}
