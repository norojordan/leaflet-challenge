// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create our map, giving it the streetmap and earthquakes layers to display on load.
// var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [street, earthquakes]
//   });



 // Create the base tile layers.
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


// Markers
  // Function to determine the marker size by magnitude. 
  function markerSize(mag){
    return Math.sqrt(mag) * 50;
  }

//   function getradius(mag){
//     if (mag > 4){
//         return 35;
//         else if (mag > = 3){}
//     }
//   }

// Function to determine color based on depth - third coordinate in list of coordinates.
 
 function getColor(depth) {
    switch(depth){
      case depth > 90 :return "red";
      case depth > 70 :return "orange";
      case depth > 50 :return "yellow";
      case depth > 30 :return "green";
      case depth > 10 :return "blue";
      default: return "violet";
    }
  } 


  function getstyle(feature){
      return{
          color: white,
          radius: markerSize(feature.properties.mag),
          fillColor: getColor([feature.geometry.coordinates[2]]),
          weight: 1.5
      }   
   }

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data)
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place, magnitude and depth of the earthquake.
  function onEachFeature(feature, layer) {
      layer.bindPopup('<h3>Location: ' + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag + "<h3>Depth:</b> " + feature.geometry.coordinates[2]);
      
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

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

// L.geoJson(data, {
//     pointToLayer: (feature, coord)=>{
//         return L.circleMarker(ccord);
//     }
//     style: getstyle,
//     function onEachFeature(feature, layer) {
//         layer.bindPopup('<h3>Location: ' + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag +  "</h3>Date: " + new Date(feature.properties.time));
        
//     }
//     onEachFeature: (feature, layer)=>
//         layer.bindPop('<h3> $')
//     }
// })


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

  

//   for(city of cities){
//     L.circle(city.location, {
//       fillOpacity: 0.75,
//       color: "black",
//       fillColor: "purple",
//       // Setting our circle's radius to equal the output of our markerSize() function:
//       // This will make our marker's size proportionate to its population.
//       radius: markerSize(city.population)
//     })

//   function createMarkers(response) {

//     // Pull the "stations" property from response.data.
//     var stations = response.data.stations;
  
//     // Initialize an array to hold bike markers.
//     var bikeMarkers = [];
  
    // Loop through the stations array.
//     for (var index = 0; index < data.length; index++) {
//       var station = stations[index];
  
//       // For each station, create a marker, and bind a popup with the station's name.
//       var bikeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
//       // Add the marker to the bikeMarkers array.
//       bikeMarkers.push(bikeMarker);
//     }
  
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(bikeMarkers));
//   }
  
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);



  // Create a legend to display information about our map.
  var legend = L.control({
    position: "bottomright"
  });
  // When the layer control is added, insert a div with the class of "legend".
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    for (var i = 0; i < depth.length; i++){
        div.innerHTML +=
        labels.push(
            'i style="background:' + getColor(depth[i]+1) + '"><i>' +
            (depth[i] ? depth[i] + "<br>": '+'));
            div.innerHTML = labels.join('<br>');
    }
    return div;
  
  // Add the legend info to the map.
  legend.addTo(myMap);
};




















 

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
