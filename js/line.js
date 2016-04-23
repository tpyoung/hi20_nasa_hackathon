d3.json("./data/sea_levels.json", function(error, sea_levels){
  if (error) throw error;

  var lineData = sea_levels.data.reduce(function(prev, curr) {
    prev.push( {
      x: curr.year,
      y: curr.MSL
    });
    return prev;
  }, []);

  var vis = d3.select('#visualisation'),
      WIDTH = 500,
      HEIGHT = 500,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
        return d.x;
      }), d3.max(lineData, function(d) {
        return d.x;
      })]),
      yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
        return d.y;
      }), d3.max(lineData, function(d) {
        return d.y;
      })]);

  var lineFunc = d3.svg.line()
    .x(function(d) {
      return xRange(d.x);
    })
    .y(function(d) {
      return yRange(d.y);
    })
    .interpolate('linear');


  vis.append('svg:path')
    .attr('d', lineFunc(lineData))
    .attr('stroke', 'blue')
    .attr('stroke-width', 1)
    .attr('fill', 'none')
});