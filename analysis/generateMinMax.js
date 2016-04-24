'use strict'
const fs = require('fs');
const annualSeaLevels = require('./../data/mock/annual_sea_levels').set;
const minMax = require('./../data/landingPageMap/minMaxData');

for (let i = 0; i < minMax.length; i++) {

  for (let k = 0; k < annualSeaLevels.length; k++) {

    if (minMax[i].year === annualSeaLevels[k].year) {

      for (let f = 0; f < annualSeaLevels[k].data.length; f++) {

        let rand = Math.random() * (minMax[i].max - minMax[i].min + 1) + minMax[i].min; 
        annualSeaLevels[k].data[f].seaLevel = rand;
      }
    }
  }
}

fs.writeFile('./data/landingPageMap/landingMapData.json', JSON.stringify(annualSeaLevels), (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log('File has been written successfully!');
});