var water_level_data = require('./water_level_data.json');

var yearArray = [];
var mappedData = water_level_data.data.map(function(monthData){
  if (yearArray.indexOf(monthData.year) === -1){
    yearArray.push(monthData.year);
  };
  return {
    "year" : monthData.year,
    "month" : monthData.month,
    "seaLevel" : monthData.MSL
  }
});

var dataArray = [];
for (var i = 0; i < yearArray.length; i++){
  var yearObj = {};
  var mean = null;
  while (mappedData.year === i){
    mean += mappedData.MSL;
  }
  yearObj = {
    "year" : yearArray[i],
    "meanSeaLevel" : mean
  }
  dataArray.push(yearObj);
};
console.log(dataArray);


