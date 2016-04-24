/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

  var map = L.map('map', {
    center: [21.5067, -157.8670],
    zoom: 10
  });

  L.Icon.Default.imagePath = 'images/';

  var msInterval = 5000;
  var currYearIndex = 0;
  var markers = [];

  function handleSeaLevelsData(dataset) {

    function addMarkers() {
      var set = dataset.set[currYearIndex];

      // Remove old markers
      markers.forEach(function(item) {
        map.removeLayer(item);
      });

      set.data.forEach(function(load) {
        var msl = load.MSL;
        var className = 'gps_ring';

        if (msl <= 10) {
          className += ' wave1';
        } else if (msl <= 20) {
          className += ' wave2';
        } else if (msl <= 30) {
          className += ' wave3';
        } else if (msl <= 40) {
          className += ' wave4';
        } else if (msl <= 50) {
          className += ' wave5';
        } else if (msl <= 60) {
          className += ' wave6';
        } else if (msl <= 70) {
          className += ' wave7';
        } else if (msl <= 80) {
          className += ' wave8';
        } else if (msl <= 90) {
          className += ' wave9';
        } else if (msl <= 100) {
          className += ' wave10';
        }

        var markerToAdd = L.marker(
          [load.lat, load.lon],
          {
            title: 'LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL,
            opacity: 1,
            icon: L.divIcon({
              className: 'css-icon',
              html: '<div class="' + className + '"></div>',
              iconSize: [50, 50],
              iconAnchor: [11, 11]
            })
          }
        );
        markers.push(markerToAdd);

        markerToAdd
        .bindPopup('LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL)
        .addTo(map);
      });

      currYearIndex++;

      if (currYearIndex > 2009) {
        currYearIndex = 0;
      }

      setTimeout(addMarkers, msInterval);
    }

    setTimeout(addMarkers, msInterval);
  }

  $.getJSON('data/mock/test_annual_sea_levels.json')
    .done(handleSeaLevelsData);

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

}(window, document, L));
