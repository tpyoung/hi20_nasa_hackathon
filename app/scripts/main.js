/*jslint browser: true*/
/*global L */

(function (window, document, L) {
	'use strict';

  var address = 'http://localhost:9000/coastal_view.html';
  var map = L.map('map', {
    center: [21.4767, -157.9970],
    zoom: 10,
    zoomControl: false,
    scrollWheelZoom: false
  });

  L.Icon.Default.imagePath = 'images/';

  $.getJSON('data/mock/filtered_annual_sea_levels.json')
    .done(function (dataset) {
      // Display the most recent year's sea levels
      var set = dataset.set[dataset.set.length - 1];

      set.data.forEach(function(load) {
        var msl = load.seaLevel;
        var className = 'gps_ring';

        if (msl <= 0.75) {
          className += ' wave1';
        } else if (msl <= 0.77) {
          className += ' wave2';
        } else if (msl <= 1.01) {
          className += ' wave3';
        } else if (msl <= 2.05) {
          className += ' wave4';
        } else if (msl <= 2.08) {
          className += ' wave5';
        } else {
          className += ' wave6';
        }

        return L.marker(
          [load.lat, load.lon],
          {
            opacity: 1,
            icon: L.divIcon({
              className: 'css-icon',
              html: '<div class="' + className + '"></div>',
              iconSize: [50, 50],
              iconAnchor: [11, 11]
            })
          }
        )
        .bindPopup('<div class="custom-popup"><span class="popup-key">LOCATION:&nbsp;&nbsp;</span>'
          + load.name + '<br><span class="popup-key">LAT:&nbsp;&nbsp;</span>'
          + load.lat + '<br><span class="popup-key">LNG:&nbsp;&nbsp;</span>'
          + load.lon + '<br><span class="popup-key">MSL:&nbsp;&nbsp;</span>'
          + load.seaLevel + '</div>')
        .addTo(map)
        .on('click', function(e) {
          window.location.href = address + '?lat=' + load.lat + '&lon=' + load.lon + '&name=' + load.key;
        })
        .on('mouseover', function(e) {
          this.togglePopup();
        })
        .on('mouseout', function(e) {
          this.closePopup();
        });
      });
    });

  new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 18,
  }).addTo(map);

}(window, document, L));
