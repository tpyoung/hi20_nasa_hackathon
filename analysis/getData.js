var water_level_data = require('../data/kaneohe/kaneohe_sea_levels.json');
var yearArray = [];
var mappedData = water_level_data.data.map(function(monthData){
  if (yearArray.indexOf(monthData.year) === -1){
    yearArray.push(monthData.year);
  };
  return {
    "year" : monthData.year,
    "month" : monthData.month,
    "seaLevel" : Number(monthData.MSL)
  }
});

var result = mappedData.reduce(function(prev, curr) {
  var key = curr.year;
  var value = curr.seaLevel;

  if (Object.keys(prev).indexOf(key) > -1) {
    prev[key] += +value;
    return prev;
  }

  prev[key] = +value;
  return prev;
}, {});

var complete = Object.keys(result).reduce(function(prev, next) {
  var avg = result[next] /12
  // if (next === 1911){
  //   avg = result[next] / 7
  // }
  // else
  if (next === 2016){
    avg = result[next] / 3
  }
  // if (avg === 0){
  //   return;
  // }
  prev.push({
    x : next,
    y : avg
  })
  return prev
}, []);

console.log(complete);