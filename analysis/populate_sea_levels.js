'use strict';
const rawData = require('../data/honolulu/honolulu_sea_levels.json').data;

const mappedData = rawData.filter((yearMonthData) => {
  return +yearMonthData.year >= 1950 && +yearMonthData.year <= 2009;
})
.map((yearMonthData) => {
  return {
    "year" : yearMonthData.year,
    "min" : +yearMonthData.MLW,
    "max" : +yearMonthData.MHW
  }
});

let minMaxArr = [];
let year = 1950;
while (minMaxArr.length <= 59){
  let objTemplate = {
    year: year,
    min : 5,
    max : 0
  };
  minMaxArr.push(objTemplate);
  objTemplate.year = year++;
}
let count = 0;
for (var i = 0; i < mappedData.length; i++){

  if (mappedData[i].year == minMaxArr[count].year){

    if (mappedData[i].min < minMaxArr[count].min){
      minMaxArr[count].min = mappedData[i].min;
    }

    if (mappedData[i].max > minMaxArr[count].max){
      minMaxArr[count].max = mappedData[i].max;
    }
    count++;
    if (minMaxArr[count] === undefined){
      break;
    }
  }
}