// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var mapOptions = {
  minZoom: 2, 
  maxZoom: 18,
  zoomControl: false, 
  attributeControl: false,
}

var map = L.map('map', mapOptions).setView([8.9806, 38.757], 0);

// Add base layer

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  minZoom: 2,
  maxZoom: 18, 
  zoomControl: false, 
  attributionControl: false,
}).addTo(map);


// Adding Coffee Data

fetch('https://cdn.glitch.com/74f074b0-aac6-45cd-8ad6-7be45ed1840e%2FOrigin_pt.geojson?1537837972547')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })

  .then(function (data) {
    // Create the Leaflet layer for the data 
    var coffeeOrigins = L.geoJson(data, {
      
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      
      // Then we can style them as we would other features
      style: function (geoJsonFeature) {
        return {
          fillColor: '#11a381',
          radius: 6,
          fillOpacity: 0.7,
          stroke: false
      };
     }
    });
  
    
    coffeeOrigins.addTo(map);
    console.log(data)
  
  //style popups
  
  
  //add popups for Origins
    coffeeOrigins.bindPopup(function (layer) {
      
      return '<div class="origin-name">' + layer.feature.properties['origin'];
    });
});

var coffeeOrigins=L.geoJson();
var sliderControl = L.control.sliderControl({position: "bottomleft", layer: coffeeOrigins});

//add the slider to the map 
map.addControl(sliderControl);

//And initialize the slider
sliderControl.startSlider();
      
      