var water_level_data = require('./water_level_data.json');
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

mappedData.map(function(data){
  var meanArr = [];
  var mean = 0;
  for (var i = 0; i < yearArray.length; i++){
    if (data.year === yearArray[i]){
      mean += data.seaLevel;
    }
    else {
      meanArr.push({
        x : yearArray[i],
        y : meanArr
      });
    }
  }
  return meanArr;
});
