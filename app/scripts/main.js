/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

  var topoLayer = new L.TopoJSON();

  $.getJSON('data/mock/test_annual_sea_levels.json')
    .done(addMarkers);

  $.getJSON('data/topodata.json')
    .done(addTopoData);

  /* create leaflet map */
  var map = L.map('map', {
    center: [21.5067, -157.8670],
    zoom: 10
  });

  function addTopoData(topoData){  
    topoLayer.addData(topoData);
    topoLayer.addTo(map);
  }

  /* add default stamen tile layer */
  new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
  }).addTo(map);

  function addMarkers(dataset){
    dataset.set[0].data
    .forEach(function(load){
      return L.marker([load.lat,load.lon], { title: 'LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL, opacity: 0.5 })
      .bindPopup('LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL)
      .addTo(map);
    });
  }

}(window, document, L));
