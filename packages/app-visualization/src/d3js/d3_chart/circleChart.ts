import * as d3 from 'd3';

const config = {
  width: 400,
  height: 400,
  color: ['green', 'purple', 'yellow']
};

const data = [10, 20, 30];

const svg = d3.select('body')
  .append('svg')
  .attr('width', config.width)
  .attr('height', config.height);

const g = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function(d, i) {
    return 'translate(0, 0)'
  });

g.append('circle')
  .attr('cx', function(d, i) {
    return i * 75 + 50;
  })
  .attr('cy', function(d, i) {
    return 75;
  })
  .attr('r', function(d) {
    return d * 1.5;
  })
  .attr('fill', function(d, i) {
    return config.color[i];
  });

g.append('text')
  .attr('x', function(d, i) {
    return i * 75 + 25;
  })
  .attr('y', 80)
  .attr('stroke', 'teal')
  .attr('font-size', '10px')
  .attr('font-family', 'sans-serif')
  .text(d => d);


