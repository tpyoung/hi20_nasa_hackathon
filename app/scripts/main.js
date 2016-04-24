/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

  var map = L.map('map', {
    center: [21.5067, -157.8670],
    zoom: 10
  });

  L.Icon.Default.imagePath = 'images/';

  $.getJSON('data/mock/annual_sea_levels.json')
    .done(function (dataset) {
      // Display the most recent year's sea levels
      var set = dataset.set[dataset.set.length - 1];

      set.data.forEach(function(load) {
        var msl = load.seaLevel;
        var className = 'gps_ring';

        if (msl <= 0.5) {
          className += ' wave1';
        } else if (msl <= 1.0) {
          className += ' wave2';
        } else if (msl <= 1.5) {
          className += ' wave3';
        } else if (msl <= 2.0) {
          className += ' wave4';
        } else if (msl <= 2.2) {
          className += ' wave5';
        } else {
          className += ' wave6';
        }

        return L.marker(
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
        )
        .bindPopup('LAT: ' + load.lat + ' LNG: ' + load.lon + ' MSL: ' + load.MSL)
        .addTo(map);
      });
    });

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

}(window, document, L));
