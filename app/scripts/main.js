/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

  var cssIcon = L.divIcon({
    className: 'css-icon',
    html: '<div class="gps_ring"></div>',
    iconSize: [50,50],
    iconAnchor: [11,11]
  });
  var MIN_ZOOM = 0;
  var MAX_ZOOM = 18;
  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM
  }),
    // NOT WORKING. PROBABLY NOT AVAILABLE FOR FREE OR WRONG URL
    terrain = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM
  }),
    watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM
  });

  var map = L.map('map', {
    center: [21.5067, -157.8670],
    zoom: 10,
    layers: [ watercolor, toner,  ]
    // dragging: false
  });
  
  L.Icon.Default.imagePath = 'images/';

  function addMarkers(dataset){
    dataset.set[0].data
    .forEach(function(load){
      return L.marker([load.lat,load.lon], { title: 'LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL, opacity: 1, icon: cssIcon })
      .bindPopup('LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL)
      .addTo(map);
    });
  }
  var baseMaps = {
    "Watercolor": watercolor,
    "Black & White": toner,
    // "Terrain": terrain
  };

  $.getJSON('data/mock/test_annual_sea_levels.json')
    .done(addMarkers);

  // var topoLayer = new L.TopoJSON();
  // $.getJSON('data/topodata.json')
  //   .done(addTopoData);

  // function addTopoData(topoData){  
  //   topoLayer.addData(topoData);
  //   topoLayer.addTo(map);
  // }

  new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
  }).addTo(map);

  L.popup()
  .setLatLng([21.5067, -157.8670])
  .setContent("CLICK ON A PINGING BUBBLE FOR SOME INFO.")
  .openOn(map);

  L.control.layers(baseMaps).addTo(map);

}(window, document, L));
