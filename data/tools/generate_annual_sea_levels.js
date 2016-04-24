// To run and generate annual_sea_levels.json:
//   `node generate_annual_sea_levels.js`
(function() {
  var fs = require('fs');
  var minMax = require('./../landingPageMap/minMaxData.json');

  var mockData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -157.86941528320312,
              21.290653925975707
            ],
            [
              -157.88864135742188,
              21.29193348495502
            ],
            [
              -157.91336059570312,
              21.294331112793388
            ],
            [
              -157.939453125,
              21.3008900859581
            ],
            [
              -157.949453125,
              21.3018900859581
            ],
            [
              -157.96867919921875,
              21.311125532962258
            ],
            [
              -157.9833984375,
              21.309846141087203
            ],
            [
              -158.0108642578125,
              21.30600789859977
            ],
            [
              -158.03558349609375,
              21.299610604945617
            ],
            [
              -158.05618286132812,
              21.295772095071854
            ],
            [
              -158.07952880859375,
              21.293213032797848
            ],
            [
              -158.0987548828125,
              21.29193348495502
            ],
            [
              -158.1099860000000,
              21.2956420859581
            ],
            [
              -158.11798095703122,
              21.3008900859581
            ],
            [
              -158.126220703125,
              21.3188016501568
            ],
            [
              -158.131220703125,
              21.3288016501568
            ],
            [
              -158.1330871582031,
              21.34310670643389
            ],
            [
              -158.1360871582031,
              21.35310670643389
            ],
            [
              -158.13858032226562,
              21.363570998122665
            ],
            [
              -158.14858032226562,
              21.373570998122665
            ],
            [
              -158.1536865234375,
              21.380196130286645
            ],
            [
              -158.16467285156247,
              21.39298340856728
            ],
            [
              -158.17703247070312,
              21.398098006892965
            ],
            [
              -158.18115234375,
              21.4134407283247
            ],
            [
              -158.1866455078125,
              21.430060191830307
            ],
            [
              -158.20037841796875,
              21.449234144893413
            ],
            [
              -158.2196044921875,
              21.462015380022805
            ],
            [
              -158.23196411132812,
              21.48118513100344
            ],
            [
              -158.23333740234375,
              21.50546319248144
            ],
            [
              -158.23333740234375,
              21.527182233339218
            ],
            [
              -158.2470703125,
              21.546343396454947
            ],
            [
              -158.26492309570312,
              21.560393308330752
            ],
            [
              -158.28140258789062,
              21.574441859009664
            ],
            [
              -158.26080322265625,
              21.5808271136885
            ],
            [
              -158.23745727539062,
              21.58338113675691
            ],
            [
              -158.214111328125,
              21.58465813140257
            ],
            [
              -158.19351196289062,
              21.58465813140257
            ],
            [
              -158.170166015625,
              21.585935114788498
            ],
            [
              -158.14956665039062,
              21.58465813140257
            ],
            [
              -158.126220703125,
              21.588489047779042
            ],
            [
              -158.11248779296875,
              21.601258036965888
            ],
            [
              -158.0987548828125,
              21.614025899484226
            ],
            [
              -158.08364868164062,
              21.625516012007278
            ],
            [
              -158.07128906249997,
              21.638281732382865
            ],
            [
              -158.06167602539062,
              21.65998086747517
            ],
            [
              -158.04656982421875,
              21.675295939487683
            ],
            [
              -158.02871704101562,
              21.69060938463827
            ],
            [
              -158.01361083984375,
              21.702093400319043
            ],
            [
              -157.99575805664062,
              21.70847301324598
            ],
            [
              -157.97515869140625,
              21.71357649998363
            ],
            [
              -157.95867919921875,
              21.70719711328147
            ],
            [
              -157.9463195800781,
              21.693161467264897
            ],
            [
              -157.93670654296875,
              21.6778482933475
            ],
            [
              -157.928466796875,
              21.663809787946214
            ],
            [
              -157.91610717773438,
              21.64976991610971
            ],
            [
              -157.91610717773438,
              21.630622435509505
            ],
            [
              -157.90512084960938,
              21.614025899484226
            ],
            [
              -157.89138793945312,
              21.596150576461437
            ],
            [
              -157.88040161132812,
              21.57955008526685
            ],
            [
              -157.87216186523438,
              21.560393308330752
            ],
            [
              -157.8529357910156,
              21.55911609985187
            ],
            [
              -157.840576171875,
              21.543788720834375
            ],
            [
              -157.82821655273438,
              21.524627220545295
            ],
            [
              -157.83233642578125,
              21.506740872957945
            ],
            [
              -157.84744262695312,
              21.493963563064455
            ],
            [
              -157.8364562988281,
              21.478629309978384
            ],
            [
              -157.82546997070312,
              21.45945922264566
            ],
            [
              -157.81036376953125,
              21.449234144893413
            ],
            [
              -157.79937744140625,
              21.430060191830307
            ],
            [
              -157.78137744140625,
              21.418564866043834
            ],
            [
              -157.77001782226562,
              21.431564866043834
            ],
            [
              -157.78701782226562,
              21.441564866043834
            ],
            [
              -157.7801513671875,
              21.45818112714608
            ],
            [
              -157.75817871093747,
              21.46329344189929
            ],
            [
              -157.73345947265625,
              21.460737306938082
            ],
            [
              -157.71560668945312,
              21.456903020439842
            ],
            [
              -157.730712890625,
              21.437730075416685
            ],
            [
              -157.73483276367188,
              21.419833053493488
            ],
            [
              -157.7265930175781,
              21.401933838235177
            ],
            [
              -157.70599365234375,
              21.38531117571444
            ],
            [
              -157.70736694335938,
              21.363570998122665
            ],
            [
              -157.69500732421875,
              21.34438580837332
            ],
            [
              -157.68264770507812,
              21.32775661298141
            ],
            [
              -157.66479492187497,
              21.32008096400822
            ],
            [
              -157.6483154296875,
              21.313684283277997
            ],
            [
              -157.64556884765625,
              21.294492569503646
            ],
            [
              -157.66067504882812,
              21.284255964050555
            ],
            [
              -157.67578125,
              21.275298349774065
            ],
            [
              -157.686767578125,
              21.261220997023237
            ],
            [
              -157.70599365234375,
              21.25354187363281
            ],
            [
              -157.7142333984375,
              21.2663401901541
            ],
            [
              -157.72109985351562,
              21.279137394108723
            ],
            [
              -157.74169921875,
              21.272738931236105
            ],
            [
              -157.76641845703125,
              21.2663401901541
            ],
            [
              -157.78427124023438,
              21.254821755335
            ],
            [
              -157.80487060546872,
              21.250982076868247
            ],
            [
              -157.82272338867188,
              21.257381485376463
            ],
            [
              -157.83233642578125,
              21.272738931236105
            ],
            [
              -157.85156249999997,
              21.284255964050555
            ],
            [
              -157.86529541015625,
              21.28553557870424
            ]
          ]
        }
      }
    ]
  };

  var coords = mockData.features[0].geometry.coordinates;
  var result = {
    set: [

    ]
  };

  // Returns a random integer between min (inclusive) and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var formattedPoints = coords.map(function(point) {

    

    return {
      lat: point[1],
      lon: point[0]//,
      // MSL: getRandomInt(1, 100)
    };
  });

  for (var year = 1950; year <= 2009; year++) {
    result.set.push({
      year: year,
      data: formattedPoints
    });
  }

  fs.writeFile("./annual_sea_levels.json", JSON.stringify(result), function(err) {
    if (err) {
      return console.log('Error writing to file:', err);
    }

    console.log('File saved successfully');
  });
})();