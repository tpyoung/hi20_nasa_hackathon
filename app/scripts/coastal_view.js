function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var lat = getParameterByName('lat');
var lon = getParameterByName('lon');
var name = getParameterByName('name');

var mslData = null;
$.getJSON('data/coastal/' + name + '.json')
  .done(function(data) {
    mslData = data;

    var latitudeDiv = document.querySelector('#lat');
    var longitudeDiv = document.querySelector('#long');
    var nameDiv = document.querySelector('#name');

    latitudeDiv.innerHTML = mslData.metadata.latitude;
    longitudeDiv.innerHTML = mslData.metadata.longitude;
    nameDiv.innerHTML = mslData.metadata.name;

    function max(data, cb) {
      return data.map(cb).reduce(function(prev, curr) {
        return curr > prev ? curr : prev;
      })
    }

    function min(data, cb) {
      return data.map(cb).reduce(function(prev, curr) {
        return curr < prev ? curr : prev;
      })
    }

    function getMousePos(div, evt) {
      return {
        x: evt.pageX - div.offsetLeft,
        y: evt.pageY - div.offsetTop
      }
    }

    var container = document.querySelector('#container')
    var water = document.querySelector('#water');
    var info = document.querySelector('#info');
    var mslText = document.querySelector('#mslText');
    var yearText = document.querySelector('#yearText');

    container.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(container, evt);

      var cellWidth = container.clientWidth / mslData.data.length;
      var cell = Math.floor(mousePos.x / cellWidth);

      var minimum = min(mslData.data, function(d) {
        return d.y
      });

      var maximum = max(mslData.data, function(d) {
        return d.y
      });

      var dataHeight = maximum - minimum;
      var cellHeight = (mslData.data[cell].y - minimum)/ dataHeight * container.clientHeight;
      water.style.height = cellHeight + 'px';
      info.style.height = (cellHeight + 142) + 'px';
      mslText.innerHTML = (parseFloat(mslData.data[cell].y) * 12).toFixed(2) + ' in.';
      yearText.innerHTML = mslData.data[cell].x;
    });
  });
