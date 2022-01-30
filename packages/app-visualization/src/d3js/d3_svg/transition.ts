import * as d3 from 'd3';

// d3.select('body')
//   .transition()
//   .style("background-color", "lightblue")
//   .duration(3000);

d3.select('body')
  .html('<h3>Simple transitions</h3>')

d3.selectAll('h3')
  .transition()
  .style('font-size', '28px')
  .delay(2000)
  .duration(2000);

// transition的生命周期hook
d3.select('body')
  .transition()
  .delay(2000)
  .on('start', function() {
    d3.select(this).style('background-color', 'green')
  })
  .style('background-color', 'red')
  .duration(2000);
